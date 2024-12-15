import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { AppProvider } from '../context/AppContext';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/router';
import '../styles/globals.css';

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithLayout;
  const getLayout = PageComponent.getLayout || ((page) => page);

  // const router = useRouter();

  // useEffect(() => {
  //   // Get token and jpid from localStorage
  //   const token = localStorage.getItem('token');
  //   const jpid = localStorage.getItem('jpid');

  //   // Check if token or jpid are missing
  //   if (!token || !jpid) {
  //     // Redirect to login page if token or jpid is missing
  //     router.push('/login');
  //   }
  // }, [router]);

  return (
    <AppProvider>
      <CartProvider>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </CartProvider>
    </AppProvider>
  );
}

export default MyApp;
