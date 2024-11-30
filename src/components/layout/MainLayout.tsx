import Topbar from '../topbar/Topbar';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="min-h-screen">
    <Topbar />
    <main className="">{children}</main>
  </div>
);

export default MainLayout;
