import Banner from '@/components/home/Banner';
import MainLayout from '../components/layout/MainLayout';
import { ReactElement } from 'react';
import CategorySection from '@/components/home/CategorySection';
import BestDealsSection from '@/components/home/BestDealsSection';
import Services from '@/components/home/Services';
import Footer from '@/components/home/Footer';

const Home = () => (
  <div className="">
    <Banner />
    <CategorySection />
    <BestDealsSection />
    <Services />
    <Footer />
  </div>
);

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Home;
