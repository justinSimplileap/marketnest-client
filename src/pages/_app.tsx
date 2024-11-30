// import type { AppProps } from 'next/app';
// import { AppProvider } from '../context/AppContext';
// import '@/styles/globals.css';

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <AppProvider>
//       <Component {...pageProps} />
//     </AppProvider>
//   );
// }

// export default MyApp;

import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { AppProvider } from '../context/AppContext';
import '../styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactNode) => ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  const PageComponent = Component as NextPageWithLayout;
  const getLayout = PageComponent.getLayout || ((page) => page);

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
