import HeroSection from "@/components/HeroSection";
import PlacesSection from "@/components/PlacesSection";
import HotelsSection from "@/components/HotelsSection";
import GuidesSection from "@/components/GuidesSection";
import TranslationHelper from "@/components/TranslationHelper";
import InteractiveMap from "@/components/InteractiveMap";
import ItineraryBuilder from "@/components/ItineraryBuilder";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PlacesSection />
      <InteractiveMap />
      <ItineraryBuilder />
      <HotelsSection />
      <GuidesSection />
      <TranslationHelper />
    </main>
  );
};

export default Index;