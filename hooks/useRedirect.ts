import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { autorun } from 'mobx';
import { store } from '@/store';

export const useRedirect = (triggerOnAuthed = true, to = '/'): void => {
  const router = useRouter();

  useEffect(
    () =>
      autorun(() => {
        const isAuthenticated = store.isAuthenticated;

        console.log(isAuthenticated);

        if (triggerOnAuthed ? isAuthenticated : !isAuthenticated) {
          router.replace(to);
        }
      }),
    [router, to, triggerOnAuthed],
  );
};
