'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLazyQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthBackground } from '@/components/AuthBackground';
import { checkForEmailExistence, checkForNicknameExistence } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/store';
import { CreateUserResponse, UserResponse } from '@/types';
import { CREATE_USER_MUTATION } from '@/graphql/mutations/create-user.mutation';
import { ProfileImageSelector } from '@/components/ProfileImageSelector';
import { USER_QUERY } from '@/graphql/queries/profile.query';

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine(async (e) => {
        return await checkForEmailExistence(e);
      }, 'This email is already in use, try another one'),
    userName: z
      .string()
      .max(50, {
        message: 'Your username is too long (should be less than 50 symbols)',
      })
      .refine(async (e) => {
        return await checkForNicknameExistence(e);
      }, 'This username is already in use, try another one'),
    firstName: z.string().max(50, {
      message: 'Your first name is too long (should be less than 50 symbols)',
    }),
    lastName: z.string().max(50, {
      message: 'Your last name is too long (should be less than 50 symbols)',
    }),
    bio: z.string().max(300, {
      message: 'Your bio is too long (should be less than 300 symbols)',
    }),
    gender: z.enum(['MALE', 'FEMALE']),
    password: z.string().min(6, {
      message: 'Password cannot be less than 6 symbols long',
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Make sure your passwords match',
    path: ['confirmPassword'],
  });

const RegisterPage = (): JSX.Element => {
  const [createUserTrigger] =
    useMutation<CreateUserResponse>(CREATE_USER_MUTATION);

  const [getUserProfile] = useLazyQuery<UserResponse>(USER_QUERY);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      userName: '',
      firstName: '',
      lastName: '',
      bio: '',
      password: '',
    },
  });

  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [localImageFile, setLocalImageFile] = useState<File>();

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsAuthLoading(true);

      const mappedValues = {
        bio: values.bio || null,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        userName: values.userName,
        gender: values.gender,
      };

      try {
        const { data, errors } = await createUserTrigger({
          variables: {
            createUserInput: mappedValues,
          },
        });

        if (
          errors ||
          !data ||
          !data?.createUser.accessToken ||
          !data?.createUser.refreshToken
        ) {
          throw new Error('Registration error');
        }

        store.setTokens({
          accessToken: data.createUser.accessToken,
          refreshToken: data.createUser.refreshToken,
        });

        if (localImageFile) {
          const formData = new FormData();

          formData.append('file', localImageFile);

          await axios.post(
            process.env.API_BASE_URL + '/files/upload-profile-image',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${data.createUser.accessToken}`,
              },
            },
          );
        }

        router.replace('/');

        const { data: profile } = await getUserProfile({
          context: {
            headers: {
              Authorization: `Bearer ${data.createUser.accessToken}`,
            },
          },
        });

        store.setProfile(profile ?? null);
      } catch (e) {
        console.error(e);
        setIsAuthLoading(false);
      }
    },
    [createUserTrigger, getUserProfile, localImageFile, router],
  );

  useEffect(() => {
    return () => form.clearErrors();
  }, [form]);

  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[40vw] items-center p-[20px] border-[2px] rounded-xl"
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          transition={{
            duration: 0.2,
            ease: 'easeIn',
          }}
        >
          <ProfileImageSelector
            setLocalImageFile={setLocalImageFile}
            localImageFile={localImageFile}
          />

          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userName"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">First name</FormLabel>
                <FormControl>
                  <Input variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Last name</FormLabel>
                <FormControl>
                  <Input variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Bio (optional)</FormLabel>
                <FormControl>
                  <Textarea variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Gender</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="MALE">MALE</SelectItem>
                    <SelectItem value="FEMALE">FEMALE</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            defaultValue=""
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            defaultValue=""
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" variant="auth" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="align-middle mt-[30px]"
            type="submit"
            variant="auth"
            isLoading={isAuthLoading}
          >
            Sign up
          </Button>
        </motion.form>
      </Form>

      <AuthBackground />
    </>
  );
};

export default RegisterPage;
