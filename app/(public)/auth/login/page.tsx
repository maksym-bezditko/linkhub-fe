'use client';

import React, { useCallback, useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
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
import { LOGIN_WITH_EMAIL_QUERY } from '@/graphql/queries/login-with-email.query';
import { LoginWithEmailResponse } from '@/types';
import { store } from '@/store';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginPage = (): JSX.Element => {
  const [trigger] = useLazyQuery<LoginWithEmailResponse>(
    LOGIN_WITH_EMAIL_QUERY,
  );

  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setIsAuthLoading(true);

      try {
        const { data, error } = await trigger({
          variables: {
            loginWithEmailInput: values,
          },
        });

        if (
          error ||
          !data ||
          !data?.loginWithEmail.accessToken ||
          !data?.loginWithEmail.refreshToken
        ) {
          throw new Error(error?.message || 'Authentication error');
        }

        store.setTokens({
          accessToken: data?.loginWithEmail.accessToken,
          refreshToken: data?.loginWithEmail.refreshToken,
        });

        router.replace('/feed');
      } catch (e) {
        console.error(e);
        form.setError('root.signIn', {
          type: 'custom',
          message: 'Wrong credentials',
        });
        setIsAuthLoading(false);
      }
    },
    [form, router, trigger],
  );

  useEffect(() => {
    return () => form.clearErrors();
  }, [form]);

  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[400px] items-center p-[20px] border-[2px] rounded-xl"
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

          <div className="w-full min-h-[20px]">
            {form.formState.errors.root?.signIn?.message && (
              <p className="w-full text-sm font-medium text-red-500 dark:text-red-900 text-center">
                {form.formState.errors.root.signIn.message}
              </p>
            )}
          </div>

          <Button
            className="align-middle mt-[10px]"
            type="submit"
            variant="auth"
            isLoading={isAuthLoading}
          >
            Sign in
          </Button>
        </motion.form>
      </Form>

      <AuthBackground />
    </>
  );
};

export default LoginPage;
