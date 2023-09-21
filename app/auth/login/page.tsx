'use client';

import React, { useCallback } from 'react';
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
import { LOGIN_WITH_EMAIL } from '@/graphql/queries/login-with-email.query';
import { LoginWithEmail } from '@/types';
import { store } from '@/store';

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(6, {
    message: 'Password cannot be less than 6 symbols long',
  }),
});

const LoginPage = (): JSX.Element => {
  const [trigger] = useLazyQuery<LoginWithEmail>(LOGIN_WITH_EMAIL);

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
      store.setIsFullscreenLoaderVisible(true);

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
      } finally {
        store.setIsFullscreenLoaderVisible(false);
      }
    },
    [router, trigger],
  );

  return (
    <>
      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[400px] items-center p-[20px] border-[2px] rounded-xl mx-[20px]"
          initial={{ scale: 0.9 }}
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
                  <Input variant="login" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
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
                  <Input type="password" variant="login" {...field} />
                </FormControl>
                <div className="min-h-[20px]">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            className="align-middle mt-[10px]"
            type="submit"
            variant="login"
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
