import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './components';
import ScrollToTop from './components/ScrollToTop';
import { UserProvider } from './context/userContext';
import { Home, Login, LoginCallback, PlaylistAll, SinglePlaylist, TopContent } from './pages';
import SpotifyProvider from './context/spotifyContext';

export function Router() {
  return (
    <UserProvider>
      <SpotifyProvider>
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
            path='/playlists/:id'
            element={
              <PrivateRoute>
                <SinglePlaylist />
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
      </SpotifyProvider>
    </UserProvider>
  );
}
