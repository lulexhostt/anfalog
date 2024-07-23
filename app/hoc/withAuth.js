// app/hoc/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true); // Ensures component renders only on the client side
    }, []);

    useEffect(() => {
      const checkUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          router.push('/login');
        }
      };

      if (isClient) {
        checkUser();
      }
    }, [router, isClient]);

    if (!isClient) return null; // Render nothing on the server side

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
