import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Footer from './Footer';
import Header from './Header';
import ScrollButton from './ScrollButton';
interface PrivateRouteProps {
  children: ReactNode;
}
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token_user')
    ? JSON.parse(localStorage.getItem('token_user')!)
    : null;

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
