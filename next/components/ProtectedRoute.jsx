import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { role } = response.data;
        if (allowedRoles.includes(role)) {
          setAuthorized(true);
        } else {
          router.push('/unauthorized');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuthorization();
  }, []);

  if (!authorized) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
