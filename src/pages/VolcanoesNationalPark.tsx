import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Star, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import gorillaImage from "@/assets/gorilla-attraction.jpg";

const VolcanoesNationalPark = () => {
  const activities = [
    {
      name: "Mountain Gorilla Trekking",
      duration: "6-8 hours",
      difficulty: "Moderate to Hard",
      price: "$1,500",
      groupSize: "8 people max",
      description: "Track endangered mountain gorillas in their natural habitat with expert guides."
    },
    {
      name: "Golden Monkey Tracking",
      duration: "3-4 hours", 
      difficulty: "Easy to Moderate",
      price: "$100",
      groupSize: "8 people max",
      description: "Observe playful golden monkeys in the bamboo forests of the park."
    },
    {
      name: "Volcano Hiking",
      duration: "Full day",
      difficulty: "Hard",
      price: "$75",
      groupSize: "15 people max", 
      description: "Hike to the summit of dormant volcanoes for breathtaking views."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={gorillaImage}
          alt="Volcanoes National Park"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Volcanoes National Park
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Home to endangered mountain gorillas and golden monkeys in the heart of the Virunga Mountains
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About the Park</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Volcanoes National Park is Rwanda's premier wildlife destination, covering 160 square kilometers 
              of rainforest and bamboo. The park protects the steep slopes of this magnificent mountain range - 
              home of the endangered mountain gorilla and a rich mosaic of montane ecosystems.
            </p>
            <p className="text-muted-foreground text-lg">
              The park is part of the larger Virunga Conservation Area that spans three countries: Rwanda, 
              Uganda, and the Democratic Republic of Congo. It's famous worldwide for mountain gorilla tracking 
              and was the base for the pioneering work of Dr. Dian Fossey.
            </p>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Quick Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>160 km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Elevation:</span>
                  <span>2,400-4,507m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Established:</span>
                  <span>1925</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gorilla Groups:</span>
                  <span>12 habituated</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Activities & Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{activity.name}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {activity.groupSize}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      {activity.price}
                      <span className="text-sm text-muted-foreground font-normal">/person</span>
                    </div>
                    <Button className="bg-gradient-hero text-white">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Time to Visit */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Best Time to Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Dry Season (June - September, December - February)</h4>
                <p className="text-muted-foreground">
                  Ideal for gorilla trekking with clearer trails and better weather conditions. 
                  Higher chance of gorilla sightings but busier periods.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Wet Season (March - May, October - November)</h4>
                <p className="text-muted-foreground">
                  Fewer crowds and lush green landscapes. Trails can be muddy and challenging, 
                  but discounted rates are often available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VolcanoesNationalPark;