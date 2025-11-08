import CategoriesSection from "@/components/features/web/home/CategoriesSection";
import FeaturedRecipes from "@/components/features/web/home/FeaturedRecipes";
import HeroSection from "@/components/features/web/home/HeroSection";
import NewsletterSection from "@/components/features/web/home/NewsletterSection";
import StatsSection from "@/components/features/web/home/StatsSection";

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
