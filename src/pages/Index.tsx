import HeroSection from "@/components/HeroSection";
import PlacesSection from "@/components/PlacesSection";
import HotelsSection from "@/components/HotelsSection";
import GuidesSection from "@/components/GuidesSection";
import TranslationHelper from "@/components/TranslationHelper";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PlacesSection />
      <HotelsSection />
      <GuidesSection />
      <TranslationHelper />
    </main>
  );
};

export default Index;