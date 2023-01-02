import { toast } from 'react-toastify';

export default function useToast() {
  const handleToast = (type: 'error' | 'success', message: string) => {
    switch (type) {
      case 'success':
        toast.success(message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        break;
      case 'error':
        toast.error(message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
    }
  };

  return {
    handleToast,
  };
}
