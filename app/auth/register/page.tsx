'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
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
import { checkForEmailExistence, checkForUsernameExistence } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/store';
import { CreateUserResponse } from '@/types';
import { CREATE_USER_MUTATION } from '@/graphql/mutations/create-user.mutation';

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
        return await checkForUsernameExistence(e);
      }, 'This username is already in use, try another one'),
    fullName: z
      .string()
      .max(100, {
        message: 'Your full name is too long (should be less than 100 symbols)',
      })
      .refine((e) => e.split(' ').length > 1, {
        message:
          'Please enter your full name (two or more words separated by one space)',
      }),
    bio: z.string().max(300, {
      message: 'Your bio is too long (should be less than 300 symbols)',
    }),
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
  const [trigger] = useMutation<CreateUserResponse>(CREATE_USER_MUTATION);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      userName: '',
      fullName: '',
      bio: '',
      password: '',
    },
  });

  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsAuthLoading(true);

      const mappedValues = {
        bio: values.bio || null,
        email: values.email,
        fullName: values.fullName,
        password: values.password,
        profileLink: null,
        userName: values.userName,
      };

      try {
        const { data, errors } = await trigger({
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
          accessToken: data?.createUser.accessToken,
          refreshToken: data?.createUser.refreshToken,
        });

        router.replace('/feed');
      } catch (e) {
        console.error(e);
        setIsAuthLoading(false);
      }
    },
    [router, trigger],
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
          <FormField
            control={form.control}
            name="email"
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

          {/* TODO: Place file input here */}

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Full name</FormLabel>
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
