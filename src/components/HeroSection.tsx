import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/musanze-hero.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToPlaces = () => {
    const placesSection = document.getElementById('places-section');
    if (placesSection) {
      placesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Discover
          <span className="block bg-gradient-accent bg-clip-text text-transparent">
            Musanze
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          Gateway to Rwanda's majestic volcanoes, home to mountain gorillas, and unforgettable adventures
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-hero text-white shadow-hero hover:shadow-lg transition-all duration-300 px-8 py-6 text-lg font-semibold"
            onClick={scrollToPlaces}
          >
            Explore Places
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 px-8 py-6 text-lg font-semibold"
            onClick={() => navigate('/book/tours')}
          >
            Book Your Tour
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;