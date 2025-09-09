import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Users, MapPin, Star, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const tours = [
  {
    id: 1,
    name: "Gorilla Trekking Experience",
    duration: "Full Day (6-8 hours)",
    difficulty: "Moderate to Challenging",
    price: "$1,500/person",
    maxGroup: 8,
    rating: 4.9,
    image: "/placeholder.svg",
    description: "Once-in-a-lifetime opportunity to observe mountain gorillas in their natural habitat",
    includes: ["Park Permits", "Expert Guide", "Lunch", "Transport", "Equipment"],
    highlights: ["Mountain Gorilla Encounter", "Virunga Forest Trek", "Photography Opportunities"],
    category: "Wildlife"
  },
  {
    id: 2,
    name: "Golden Monkey Tracking",
    duration: "Half Day (4-5 hours)",
    difficulty: "Easy to Moderate",
    price: "$100/person",
    maxGroup: 12,
    rating: 4.7,
    image: "/placeholder.svg",
    description: "Track the endangered golden monkeys through bamboo forests",
    includes: ["Park Entry", "Guide", "Light Refreshments", "Transport"],
    highlights: ["Golden Monkey Sighting", "Bamboo Forest Walk", "Bird Watching"],
    category: "Wildlife"
  },
  {
    id: 3,
    name: "Volcano Hiking Adventure",
    duration: "Full Day (8-10 hours)",
    difficulty: "Challenging",
    price: "$200/person",
    maxGroup: 10,
    rating: 4.8,
    image: "/placeholder.svg",
    description: "Hike to the summit of Bisoke or Karisimbi volcano for spectacular views",
    includes: ["Guide", "Packed Lunch", "Equipment", "Transport", "First Aid Kit"],
    highlights: ["Crater Lake Views", "Alpine Vegetation", "Panoramic Vistas"],
    category: "Adventure"
  },
  {
    id: 4,
    name: "Cultural Village Experience",
    duration: "Half Day (3-4 hours)",
    difficulty: "Easy",
    price: "$50/person",
    maxGroup: 15,
    rating: 4.6,
    image: "/placeholder.svg",
    description: "Immerse yourself in traditional Rwandan culture at Iby'iwacu village",
    includes: ["Village Entry", "Cultural Activities", "Traditional Lunch", "Guide"],
    highlights: ["Traditional Dancing", "Craft Making", "Local Cuisine", "Storytelling"],
    category: "Cultural"
  },
  {
    id: 5,
    name: "Twin Lakes Scenic Tour",
    duration: "Full Day (6-7 hours)",
    difficulty: "Easy",
    price: "$120/person",
    maxGroup: 12,
    rating: 4.5,
    image: "/placeholder.svg",
    description: "Explore the beautiful Burera and Ruhondo lakes with stunning mountain backdrops",
    includes: ["Transport", "Boat Trip", "Lunch", "Guide", "Entrance Fees"],
    highlights: ["Lake Boat Cruise", "Mountain Views", "Bird Watching", "Local Communities"],
    category: "Nature"
  },
  {
    id: 6,
    name: "Musanze Caves Exploration",
    duration: "Half Day (3-4 hours)",
    difficulty: "Moderate",
    price: "$40/person",
    maxGroup: 15,
    rating: 4.4,
    image: "/placeholder.svg",
    description: "Underground adventure through ancient lava tube caves",
    includes: ["Cave Entry", "Safety Equipment", "Guide", "Flashlights"],
    highlights: ["Underground Chambers", "Geological Formations", "Historical Significance"],
    category: "Adventure"
  }
];

const BookTours = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [tourDate, setTourDate] = useState<Date>();
  const [participants, setParticipants] = useState("1");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const tourId = searchParams.get('tour');
    const category = searchParams.get('category');
    if (tourId) {
      setSelectedTour(tourId);
    }
    if (category) {
      setCategoryFilter(category);
    }
  }, [searchParams]);

  const handleBookTour = (tourId: number) => {
    if (!tourDate) {
      alert("Please select a tour date");
      return;
    }
    console.log(`Booking tour ${tourId} on ${tourDate} for ${participants} participants`);
    // Handle booking logic here
  };

  const filteredTours = categoryFilter === "all" 
    ? tours 
    : tours.filter(tour => tour.category.toLowerCase() === categoryFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Book Amazing Tours
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the best of Musanze with our carefully curated tour experiences
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Your Perfect Tour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Tour Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !tourDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tourDate ? format(tourDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={tourDate}
                      onSelect={setTourDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Participants</Label>
                <Select value={participants} onValueChange={setParticipants}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5+">5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  Search Tours
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Tours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTours.map((tour) => (
            <Card 
              key={tour.id} 
              className={`group hover:shadow-lg transition-all duration-300 ${
                selectedTour === tour.id.toString() ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={tour.image} 
                  alt={tour.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {tour.rating}
                </Badge>
                <Badge 
                  className="absolute top-2 left-2 bg-primary text-white"
                >
                  {tour.category}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{tour.description}</p>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Max {tour.maxGroup} people</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{tour.difficulty}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {tour.highlights.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tour.highlights.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {tour.price}
                  </div>
                  <Button 
                    onClick={() => handleBookTour(tour.id)}
                    className="bg-gradient-hero text-white hover:shadow-lg transition-all duration-300"
                  >
                    Book Tour
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookTours;