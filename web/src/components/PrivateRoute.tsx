import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Footer from './Footer';
import Header from './Header';
import ScrollButton from './ScrollButton';
import { getToken } from '../utils/keys';
interface PrivateRouteProps {
  children: ReactNode;
}
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useContext(UserContext);
  const token = getToken();

  return !token && !user ? (
    <Navigate to='/' />
  ) : (
    <div className='w-full min-h-screen'>
      <Header />
      <main className='max-w-[1350px] mx-auto flex flex-col justify-center gap-[30px] relative'>
        {children}
        <ScrollButton />
      </main>
      <Footer />
    </div>
  );
}
