import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Car, Coffee, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hotelImage from "@/assets/hotel-room.jpg";

const hotels = [
  {
    id: 1,
    name: "Virunga Lodge",
    location: "Kinigi, Musanze",
    rating: 4.8,
    reviews: 324,
    price: 450,
    image: hotelImage,
    amenities: ["Free WiFi", "Restaurant", "Spa", "Mountain View"],
    type: "Luxury Lodge"
  },
  {
    id: 2,
    name: "Mountain Gorilla View Lodge",
    location: "Volcanoes National Park",
    rating: 4.7,
    reviews: 256,
    price: 380,
    image: hotelImage,
    amenities: ["Free WiFi", "Bar", "Garden", "Parking"],
    type: "Eco Lodge"
  },
  {
    id: 3,
    name: "Le Bambou Gorilla Lodge",
    location: "Kinigi Village",
    rating: 4.6,
    reviews: 189,
    price: 220,
    image: hotelImage,
    amenities: ["Free WiFi", "Restaurant", "Tour Desk", "Laundry"],
    type: "Boutique Hotel"
  }
];

const HotelsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Stay in <span className="text-primary">Comfort</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully selected accommodations that offer the perfect blend of comfort and adventure
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="group hover:shadow-card transition-all duration-300 overflow-hidden bg-gradient-card border-0">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">
                    {hotel.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{hotel.rating}</span>
                  <span className="text-xs text-muted-foreground">({hotel.reviews})</span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {hotel.name}
                </CardTitle>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 4).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${hotel.price}
                    <span className="text-sm text-muted-foreground font-normal">/night</span>
                  </div>
                  <Button 
                    className="bg-gradient-hero text-white shadow-soft hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate('/booking?type=hotel&name=' + encodeURIComponent(hotel.name))}
                  >
                    Book Room
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

export default HotelsSection;