'use client';

import React, { useCallback } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
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
import { Header } from '@/components/Header';
import { AuthBackground } from '@/components/AuthBackground';

const formSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string().min(6, {
    message: 'Password cannot be less than 6 symbols long',
  }),
});

const LoginPage = (): JSX.Element => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    signIn('credentials', {
      ...values,
      callbackUrl: '/feed',
      redirect: true,
    });
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] fixed top-0 flex justify-center items-center">
      <Header isAuthHeader />

      <Form {...form}>
        <motion.form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[400px] items-center p-[20px] border-[2px] rounded-xl mx-[20px]"
          initial={{ scale: 0.7 }}
          whileInView={{ scale: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeIn',
          }}
        >
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username or email</FormLabel>
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
    </div>
  );
};

export default LoginPage;
