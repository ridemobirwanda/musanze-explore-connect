import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Languages, Award, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import guideImage from "@/assets/tour-guide.jpg";

const guides = [
  {
    id: 1,
    name: "Jean Baptiste Nzeyimana",
    company: "Rwanda Eco Tours",
    location: "Musanze, Rwanda",
    rating: 4.9,
    reviews: 156,
    experience: "8 years",
    languages: ["English", "French", "Kinyarwanda", "Swahili"],
    specialties: ["Gorilla Trekking", "Cultural Tours", "Nature Walks"],
    image: guideImage,
    phone: "+250 788 123 456",
    rate: 45
  },
  {
    id: 2,
    name: "Marie Claire Uwimana",
    company: "Volcanoes Adventure Co.",
    location: "Kinigi Village",
    rating: 4.8,
    reviews: 203,
    experience: "6 years",
    languages: ["English", "French", "Kinyarwanda"],
    specialties: ["Photography Tours", "Bird Watching", "Golden Monkeys"],
    image: guideImage,
    phone: "+250 788 654 321",
    rate: 40
  },
  {
    id: 3,
    name: "Patrick Habimana",
    company: "Mountain Gorilla Tours",
    location: "Musanze District",
    rating: 4.7,
    reviews: 128,
    experience: "10 years",
    languages: ["English", "German", "Kinyarwanda"],
    specialties: ["Hiking", "Cultural Immersion", "Community Tours"],
    image: guideImage,
    phone: "+250 788 987 654",
    rate: 50
  }
];

const GuidesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Expert <span className="text-primary">Guides</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced local guides who will make your Musanze adventure unforgettable
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {guides.map((guide) => (
            <Card key={guide.id} className="group hover:shadow-card transition-all duration-300 overflow-hidden bg-gradient-card border-0">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{guide.rating}</span>
                  <span className="text-xs text-muted-foreground">({guide.reviews})</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">
                    <Award className="h-3 w-3 mr-1" />
                    {guide.experience} exp
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {guide.name}
                </CardTitle>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary">{guide.company}</p>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{guide.location}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Languages className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-2xl font-bold text-primary">
                    ${guide.rate}
                    <span className="text-sm text-muted-foreground font-normal">/day</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="p-2"
                      onClick={() => window.open(`tel:${guide.phone}`, '_self')}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      className="bg-gradient-hero text-white shadow-soft hover:shadow-lg transition-all duration-300"
                      onClick={() => navigate(`/book/guides?guide=${encodeURIComponent(guide.name)}`)}
                    >
                      Book Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;