
import Layout from '@/components/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import CategorySection from '@/components/home/CategorySection';
import FeaturedSection from '@/components/home/FeaturedSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <CategorySection />
      <FeaturedSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
