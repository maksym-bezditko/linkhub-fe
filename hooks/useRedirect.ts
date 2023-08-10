import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export const useRedirect = (triggerOnAuthed = true, to = '/'): void => {
  const { data: session } = useSession();

  useEffect(() => {
    if (triggerOnAuthed ? session : !session) {
      redirect(to);
    }
  }, [session, to, triggerOnAuthed]);
};
