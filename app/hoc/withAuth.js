// app/hoc/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          router.push('/login');
        }
      };

      checkUser();
    }, [router]);

    if (typeof window === 'undefined') return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
