import { type ReactNode } from 'react';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import { FavoritesProvider } from './context/FavoritesProvider';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './context/NotificationProvider';
import { DiscountProvider } from './context/DiscountProvider';

type AppProps = {
  children: ReactNode;
};

const App = ({ children }: AppProps) => (
  <FavoritesProvider>
    <NotificationProvider>
      <DiscountProvider>
        <div className="min-h-screen flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            style: { borderRadius: '1rem', fontSize: '1rem' },
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
        </div>
      </DiscountProvider>
    </NotificationProvider>
  </FavoritesProvider>
);

export default App;
