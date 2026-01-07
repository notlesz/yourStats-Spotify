import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/actions/spotify';

interface SpotifyUser {
  id: string;
  display_name: string;
  images: { url: string }[];
  email: string;
  product: string;
  followers: { total: number };
}

import { useUserStore } from '@/store/useUserStore';
import { useEffect } from 'react';

export default function useSpotifyProfile() {
  const setUser = useUserStore((state) => state.actions.setUser);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['spotify-user'],
    queryFn: () => getUserProfile(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return { user, isLoading, error };
}
