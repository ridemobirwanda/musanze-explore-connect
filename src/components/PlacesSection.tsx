import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock } from "lucide-react";
import gorillaImage from "@/assets/gorilla-attraction.jpg";

const places = [
  {
    id: 1,
    name: "Volcanoes National Park",
    description: "Home to endangered mountain gorillas and golden monkeys",
    image: gorillaImage,
    rating: 4.9,
    duration: "Full Day",
    location: "Kinigi, Musanze",
    price: "$1,500"
  },
  {
    id: 2,
    name: "Dian Fossey Tomb",
    description: "Visit the final resting place of the famous primatologist",
    image: gorillaImage,
    rating: 4.7,
    duration: "Half Day",
    location: "Karisoke, Musanze",
    price: "$100"
  },
  {
    id: 3,
    name: "Twin Lakes Ruhondo & Burera",
    description: "Breathtaking crater lakes with stunning mountain views",
    image: gorillaImage,
    rating: 4.8,
    duration: "Half Day",
    location: "Musanze District",
    price: "$50"
  }
];

const PlacesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Places to <span className="text-primary">Explore</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the natural wonders and cultural treasures that make Musanze a world-class destination
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {places.map((place) => (
            <Card key={place.id} className="group hover:shadow-card transition-all duration-300 overflow-hidden bg-gradient-card border-0">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{place.rating}</span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {place.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {place.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{place.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {place.price}
                    <span className="text-sm text-muted-foreground font-normal">/person</span>
                  </div>
                  <Button className="bg-gradient-hero text-white shadow-soft hover:shadow-lg transition-all duration-300">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacesSection;