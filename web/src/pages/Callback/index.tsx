import { useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { UserContext } from '../../context/userContext';
import useToast from '../../hooks/useToast';
import { getAccessToken, getUserData } from '../../services/api';

export default function LoginCallback() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { signIn, user } = useContext(UserContext);

  const query = useMemo(() => new URLSearchParams(search), [search]);
  const token = query.get('code');
  const { handleToast } = useToast();

  const getCredentials = async (token: string) => {
    try {
      const responseAccessToken = await getAccessToken(token);
      const { access_token } = responseAccessToken.data;
      const { data } = await getUserData(access_token);
      signIn(data, access_token);
      handleToast('success', 'Login realizado com sucesso!');
    } catch (error) {
      navigate('/');
      handleToast('error', 'Falha oa realizar login');
    }
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
