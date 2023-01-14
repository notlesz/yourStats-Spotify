import { useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../components';
import { UserContext } from '../../context/userContext';
import { getAccessToken } from '../../services/api';

export default function LoginCallback() {
  const { search } = useLocation();
  const { signIn } = useContext(UserContext);

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const token = query.get('code');

  const getCredentials = async (token: string) => {
    const { data } = await getAccessToken(token);
    signIn(data);
  };

  useEffect(() => {
    if (token) getCredentials(token);
  }, [token]);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Loading />
    </div>
  );
}
