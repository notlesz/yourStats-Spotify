import { ReactNode, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { UserContext, UserProvider } from './context/userContext';
import { Home, Login, LoginCallback } from './pages';
import PlaylistAll from './pages/PlaylistAll';
import TopContent from './pages/TopContent';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token_user');
  return !token && !user ? (
    <Navigate to='/' />
  ) : (
    <div className='w-full min-h-screen'>
      <div className='max-w-[1350px] mx-auto my-0 flex flex-col justify-center gap-[30px]'>
        <Header />
        {children}
      </div>
    </div>
  );
};

export function Router() {
  return (
    <UserProvider>
      <ScrollToTop />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        hideProgressBar={false}
        closeOnClick
        theme='dark'
        limit={2}
      />
      <Routes>
        <Route path='/login_callback' element={<LoginCallback />} />
        <Route path='/' element={<Login />} />
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/playlists/all'
          element={
            <PrivateRoute>
              <PlaylistAll />
            </PrivateRoute>
          }
        />
        <Route
          path='/top/:type'
          element={
            <PrivateRoute>
              <TopContent />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}
