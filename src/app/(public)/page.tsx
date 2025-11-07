import CategoriesSection from '@/components/web/home/CategoriesSection';
import FeaturedRecipes from '@/components/web/home/FeaturedRecipes';
import HeroSection from '@/components/web/home/HeroSection';
import NewsletterSection from '@/components/web/home/NewsletterSection';
import StatsSection from '@/components/web/home/StatsSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedRecipes />
      <CategoriesSection />
      <StatsSection />
      <NewsletterSection />
    </div>
  );
}
