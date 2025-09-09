import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Star, Users, MapPin, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const guides = [
  {
    id: 1,
    name: "Jean Baptiste Uwimana",
    specialty: "Gorilla Trekking Expert",
    experience: "8 years",
    languages: ["English", "French", "Kinyarwanda"],
    rating: 4.9,
    price: "$80/day",
    image: "/placeholder.svg",
    description: "Certified gorilla trekking guide with extensive knowledge of Virunga ecosystem",
    expertise: ["Gorilla Behavior", "Photography Tips", "Wildlife Tracking"],
    availability: "Available"
  },
  {
    id: 2,
    name: "Marie Claire Mukamana",
    specialty: "Cultural Tourism Guide",
    experience: "5 years",
    languages: ["English", "French", "Kinyarwanda", "Swahili"],
    rating: 4.8,
    price: "$60/day",
    image: "/placeholder.svg",
    description: "Local cultural expert specializing in traditional crafts and community visits",
    expertise: ["Cultural Heritage", "Traditional Crafts", "Local History"],
    availability: "Available"
  },
  {
    id: 3,
    name: "Paul Nshimiyimana",
    specialty: "Adventure & Hiking Guide",
    experience: "10 years",
    languages: ["English", "French", "Kinyarwanda"],
    rating: 4.9,
    price: "$70/day",
    image: "/placeholder.svg",
    description: "Professional mountain guide for volcano hiking and cave exploration",
    expertise: ["Mountain Climbing", "Cave Exploration", "Safety Protocols"],
    availability: "Available"
  }
];

const BookGuides = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [tourDate, setTourDate] = useState<Date>();
  const [tourType, setTourType] = useState("");
  const [groupSize, setGroupSize] = useState("1");

  useEffect(() => {
    const guideId = searchParams.get('guide');
    const tour = searchParams.get('tour');
    if (guideId) {
      setSelectedGuide(guideId);
    }
    if (tour) {
      setTourType(tour);
    }
  }, [searchParams]);

  const handleBookGuide = (guideId: number) => {
    if (!tourDate || !tourType) {
      alert("Please select tour date and type");
      return;
    }
    console.log(`Booking guide ${guideId} for ${tourType} on ${tourDate} for ${groupSize} people`);
    // Handle booking logic here
  };

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
              Book Your Expert Guide
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from our experienced local guides for your Musanze adventure
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tour Details</CardTitle>
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
                <Label>Tour Type</Label>
                <Select value={tourType} onValueChange={setTourType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tour type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gorilla-trekking">Gorilla Trekking</SelectItem>
                    <SelectItem value="golden-monkey">Golden Monkey Tour</SelectItem>
                    <SelectItem value="volcano-hike">Volcano Hiking</SelectItem>
                    <SelectItem value="cultural-tour">Cultural Village Tour</SelectItem>
                    <SelectItem value="cave-exploration">Cave Exploration</SelectItem>
                    <SelectItem value="twin-lakes">Twin Lakes Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Group Size</Label>
                <Select value={groupSize} onValueChange={setGroupSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3-5">3-5 People</SelectItem>
                    <SelectItem value="6-8">6-8 People</SelectItem>
                    <SelectItem value="9+">9+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  Find Guides
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {guides.map((guide) => (
            <Card 
              key={guide.id} 
              className={`group hover:shadow-lg transition-all duration-300 ${
                selectedGuide === guide.id.toString() ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="relative">
                <img 
                  src={guide.image} 
                  alt={guide.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {guide.rating}
                </Badge>
                <Badge 
                  className="absolute top-2 left-2" 
                  variant={guide.availability === "Available" ? "default" : "secondary"}
                >
                  {guide.availability}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">{guide.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{guide.specialty}</p>
                  <p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
                  <p className="text-xs text-muted-foreground">{guide.experience} experience</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {guide.languages.map((lang, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {guide.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {guide.price}
                  </div>
                  <Button 
                    onClick={() => handleBookGuide(guide.id)}
                    className="bg-gradient-hero text-white hover:shadow-lg transition-all duration-300"
                  >
                    Book Guide
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

export default BookGuides;