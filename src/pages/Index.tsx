import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/HeroSection";
import PlacesSection from "@/components/PlacesSection";
import HotelsSection from "@/components/HotelsSection";
import GuidesSection from "@/components/GuidesSection";
import TranslationHelper from "@/components/TranslationHelper";
import InteractiveMap from "@/components/InteractiveMap";
import ItineraryBuilder from "@/components/ItineraryBuilder";
import TravelCostCalculator from "@/components/TravelCostCalculator";
import WeatherUpdates from "@/components/WeatherUpdates";
import VirtualGuide from "@/components/VirtualGuide";
import EventsCalendar from "@/components/EventsCalendar";
import { Mountain, Waves, Layers, Users, MapPin, Calendar, Phone } from "lucide-react";

const quickLinks = [
  {
    title: "Volcanoes National Park",
    description: "Gorilla trekking & golden monkeys",
    icon: Mountain,
    href: "/volcanoes-national-park",
    color: "bg-green-500",
    badge: "Most Popular"
  },
  {
    title: "Twin Lakes",
    description: "Burera & Ruhondo scenic beauty",
    icon: Waves,
    href: "/twin-lakes",
    color: "bg-blue-500",
    badge: "Scenic"
  },
  {
    title: "Musanze Caves",
    description: "Underground adventure exploration",
    icon: Layers,
    href: "/musanze-caves",
    color: "bg-orange-500",
    badge: "Adventure"
  },
  {
    title: "Cultural Villages",
    description: "Iby'iwacu community tourism",
    icon: Users,
    href: "/cultural-villages",
    color: "bg-purple-500",
    badge: "Cultural"
  }
];

const Index = () => {
  return (
    <>
      <HeroSection />
      
      {/* Quick Access Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Musanze's 
              <span className="bg-gradient-accent bg-clip-text text-transparent"> Top Destinations</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From gorilla trekking to scenic lakes, discover the natural wonders and cultural richness of Rwanda's gateway to adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link key={link.href} to={link.href}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-4">
                        <div className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                          {link.badge}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/booking">
              <Button size="lg" className="bg-gradient-hero text-white shadow-hero hover:shadow-lg transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Plan Your Adventure
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PlacesSection />
      <InteractiveMap />
      <ItineraryBuilder />
      <TravelCostCalculator />
      <WeatherUpdates />
      <VirtualGuide />
      <EventsCalendar />
      <HotelsSection />
      <GuidesSection />
      <TranslationHelper />

      {/* Footer */}
      <footer className="bg-secondary/30 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                  Visit Musanze
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your gateway to Rwanda's most spectacular adventures. Discover gorillas, explore caves, and immerse yourself in local culture.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    to={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+250 788 123 456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Musanze, Northern Province, Rwanda</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Visit Musanze. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;