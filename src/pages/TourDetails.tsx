import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Users, MapPin, Clock, Star } from 'lucide-react';
import { ImageCarousel } from '@/components/ui/image-carousel';
import gorillaClose from '@/assets/gorilla-close.jpg';
import goldenMonkey from '@/assets/golden-monkey.jpg';
import volcanoHike from '@/assets/volcano-hike.jpg';
import culturalVillage from '@/assets/cultural-village.jpg';
import twinLakes from '@/assets/twin-lakes.jpg';
import caveExploration from '@/assets/cave-exploration.jpg';

const tours = [
  {
    id: 1,
    name: "Gorilla Trekking Experience",
    duration: "Full Day",
    price: 1500,
    images: [gorillaClose, goldenMonkey, volcanoHike],
    description: "An unforgettable journey to encounter mountain gorillas in their natural habitat within Volcanoes National Park.",
    category: "wildlife",
    highlights: ["Mountain Gorilla viewing", "Expert guide", "Park permits included"],
    difficulty: "Moderate",
    groupSize: "Max 8 people",
    startTime: "6:00 AM",
    includes: ["Professional guide", "Park entrance fees", "Gorilla permits", "Packed lunch", "Transport"],
    whatToBring: ["Comfortable hiking boots", "Rain jacket", "Camera", "Water bottle", "Sun protection"]
  },
  {
    id: 2,
    name: "Golden Monkey Tracking",
    duration: "Half Day",
    price: 800,
    images: [goldenMonkey, volcanoHike, gorillaClose],
    description: "Track the rare and endangered golden monkeys through bamboo forests in Volcanoes National Park.",
    category: "wildlife",
    highlights: ["Golden monkey viewing", "Bamboo forest trek", "Photography opportunities"],
    difficulty: "Easy to Moderate",
    groupSize: "Max 10 people",
    startTime: "7:00 AM",
    includes: ["Professional guide", "Park entrance fees", "Tracking permits", "Light refreshments", "Transport"],
    whatToBring: ["Comfortable shoes", "Camera", "Binoculars", "Light jacket", "Water"]
  },
  {
    id: 3,
    name: "Volcano Hiking Adventure",
    duration: "Full Day",
    price: 1200,
    images: [volcanoHike, gorillaClose, goldenMonkey],
    description: "Challenge yourself with a hike up Mount Bisoke or Mount Karisimbi for breathtaking views.",
    category: "adventure",
    highlights: ["Summit views", "Crater lake visit", "Mountain scenery"],
    difficulty: "Challenging",
    groupSize: "Max 12 people",
    startTime: "5:30 AM",
    includes: ["Experienced guide", "Park fees", "Porters available", "Packed meals", "Transport"],
    whatToBring: ["Hiking boots", "Warm clothing", "Rain gear", "Walking stick", "Energy snacks"]
  },
  {
    id: 4,
    name: "Cultural Village Tour",
    duration: "Half Day",
    price: 400,
    images: [culturalVillage, twinLakes, caveExploration],
    description: "Immerse yourself in local culture with visits to traditional villages and cultural performances.",
    category: "cultural",
    highlights: ["Traditional dance", "Craft workshops", "Local cuisine tasting"],
    difficulty: "Easy",
    groupSize: "Max 15 people",
    startTime: "9:00 AM",
    includes: ["Cultural guide", "Village entrance", "Traditional lunch", "Craft demonstration", "Transport"],
    whatToBring: ["Comfortable shoes", "Camera", "Sun hat", "Respectful clothing"]
  },
  {
    id: 5,
    name: "Twin Lakes Exploration",
    duration: "Full Day",
    price: 600,
    images: [twinLakes, culturalVillage, caveExploration],
    description: "Discover the stunning Twin Lakes of Burera and Ruhondo with kayaking and local community visits.",
    category: "nature",
    highlights: ["Lake kayaking", "Island visits", "Bird watching"],
    difficulty: "Easy to Moderate",
    groupSize: "Max 8 people",
    startTime: "8:00 AM",
    includes: ["Guide", "Kayak equipment", "Life jackets", "Lunch", "Transport"],
    whatToBring: ["Swimwear", "Towel", "Sunscreen", "Camera", "Light clothing"]
  },
  {
    id: 6,
    name: "Musanze Caves Adventure",
    duration: "3 Hours",
    price: 350,
    images: [caveExploration, twinLakes, culturalVillage],
    description: "Explore the fascinating underground world of Musanze Caves with a guided tour.",
    category: "adventure",
    highlights: ["Cave formations", "Historical insights", "Underground passages"],
    difficulty: "Easy",
    groupSize: "Max 12 people",
    startTime: "10:00 AM",
    includes: ["Cave guide", "Safety equipment", "Helmets and flashlights", "Entrance fee"],
    whatToBring: ["Closed shoes", "Light jacket", "Camera with flash", "Water"]
  }
];

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === Number(id));

  if (!tour) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Tour Not Found</CardTitle>
            <CardDescription>The tour you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/book/tours')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tours
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div>
            <Card className="overflow-hidden">
              <ImageCarousel images={tour.images} alt={tour.name} />
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-4xl font-bold">{tour.name}</h1>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  ${tour.price}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{tour.category}</Badge>
                <Badge variant="outline">{tour.difficulty}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{tour.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{tour.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-semibold">{tour.groupSize}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Time</p>
                      <p className="font-semibold">{tour.startTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <p className="font-semibold">{tour.difficulty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tour Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What to Bring</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tour.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate(`/book/tours?tour=${tour.id}`)}
            >
              Book This Tour - ${tour.price}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
