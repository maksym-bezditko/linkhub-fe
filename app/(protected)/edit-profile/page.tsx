'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { observer } from 'mobx-react';
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
import { UpdateUserResponse, Image as ImageType } from '@/types';
import { ProfileImageSelector } from '@/components/ProfileImageSelector';
import { UPDATE_USER_MUTATION } from '@/graphql/mutations/update-user.mutation';

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine(async (e) => {
        return await checkForEmailExistence(e);
      }, 'This email is already in use, try another one')
      .or(z.literal('')),
    userName: z
      .string()
      .max(50, {
        message: 'Your username is too long (should be less than 50 symbols)',
      })
      .refine(async (e) => {
        return await checkForNicknameExistence(e);
      }, 'This username is already in use, try another one')
      .or(z.literal('')),
    firstName: z
      .string()
      .max(50, {
        message: 'Your first name is too long (should be less than 50 symbols)',
      })
      .or(z.literal('')),
    lastName: z
      .string()
      .max(50, {
        message: 'Your last name is too long (should be less than 50 symbols)',
      })
      .or(z.literal('')),
    bio: z.string().max(300, {
      message: 'Your bio is too long (should be less than 300 symbols)',
    }),
    sex: z.enum(['MALE', 'FEMALE']).nullable(),
    password: z
      .string()
      .min(6, {
        message: 'Password cannot be less than 6 symbols long',
      })
      .or(z.literal('')),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword || data.password === '',
    {
      message: 'Make sure your passwords match',
      path: ['confirmPassword'],
    },
  );

const EditProfilePage = (): JSX.Element => {
  const [updateUserTrigger] =
    useMutation<UpdateUserResponse>(UPDATE_USER_MUTATION);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      userName: '',
      firstName: '',
      lastName: '',
      bio: '',
      password: '',
      sex: null,
    },
  });

  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [previousProfileImage, setPreviousProfileImage] =
    useState<ImageType | null>(null);
  const [currentProfileImage, setCurrentProfileImage] =
    useState<ImageType | null>(null);
  const [localImageFile, setLocalImageFile] = useState<File>();

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsAuthLoading(true);

      const mappedValues = {
        bio: values.bio || null,
        email: values.email || null,
        firstName: values.firstName || null,
        lastName: values.lastName || null,
        password: values.password || null,
        nickname: values.userName || null,
        sex: values.sex || null,
      };

      try {
        const { data, errors } = await updateUserTrigger({
          variables: {
            updateUserInput: mappedValues,
          },
          context: {
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          },
        });

        if (errors || !data || !data?.updateUser.succeeded) {
          throw new Error('Update error');
        }

        if (localImageFile) {
          const formData = new FormData();

          formData.append('file', localImageFile);

          try {
            await axios.post(
              process.env.API_BASE_URL + '/files/upload-profile-image',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${store.accessToken}`,
                },
              },
            );
          } catch (e) {
            console.error(e);
          }
        } else if (previousProfileImage?.name !== currentProfileImage?.name) {
          try {
            await axios.delete(
              process.env.API_BASE_URL + '/files/profile-image',
              {
                headers: {
                  Authorization: `Bearer ${store.accessToken}`,
                },
              },
            );
          } catch (e) {
            console.error(e);
          }
        }

        router.replace('/profile');
      } catch (e) {
        console.error(e);
        setIsAuthLoading(false);
      }
    },
    [
      currentProfileImage,
      localImageFile,
      previousProfileImage,
      router,
      updateUserTrigger,
    ],
  );

  useEffect(() => {
    return () => form.clearErrors();
  }, [form]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<ImageType>(
          process.env.API_BASE_URL + '/files/retrieve-profile-image',
          {
            headers: {
              Authorization: `Bearer ${store.accessToken}`,
            },
          },
        );

        setCurrentProfileImage(res.data);
        setPreviousProfileImage(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

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
            previousImage={currentProfileImage}
            setPreviousImage={setCurrentProfileImage}
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
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Gender</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? ''}
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
            Update
          </Button>
        </motion.form>
      </Form>

      <AuthBackground />
    </>
  );
};

export default observer(EditProfilePage);
