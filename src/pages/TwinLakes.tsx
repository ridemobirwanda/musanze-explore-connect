import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Camera, Waves } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import gorillaImage from "@/assets/gorilla-attraction.jpg";

const TwinLakes = () => {
  const navigate = useNavigate();
  const activities = [
    {
      name: "Boat Cruise",
      duration: "2-3 hours",
      price: "$25",
      description: "Scenic boat ride across the pristine crater lakes with mountain views."
    },
    {
      name: "Kayaking Adventure",
      duration: "1-2 hours",
      price: "$20",
      description: "Paddle through calm waters surrounded by terraced hills and wildlife."
    },
    {
      name: "Photography Tour",
      duration: "Half day",
      price: "$40",
      description: "Capture stunning landscapes with professional photography guidance."
    },
    {
      name: "Bird Watching",
      duration: "3-4 hours",
      price: "$30",
      description: "Spot endemic bird species in the wetlands around the lakes."
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
          alt="Twin Lakes Burera and Ruhondo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Twin Lakes Burera & Ruhondo
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Breathtaking crater lakes nestled between rolling hills and volcanic peaks
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About the Twin Lakes</h2>
            <p className="text-muted-foreground text-lg mb-6">
              The Twin Lakes of Burera and Ruhondo are among Rwanda's most scenic destinations, 
              formed by volcanic activity thousands of years ago. These pristine crater lakes are 
              surrounded by steep hills covered in terraced farmland, creating one of the most 
              photographed landscapes in East Africa.
            </p>
            <p className="text-muted-foreground text-lg">
              The lakes are connected by a narrow channel and offer excellent opportunities for 
              water sports, bird watching, and cultural interactions with local fishing communities. 
              The area provides stunning views of the Virunga volcanoes on clear days.
            </p>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Lake Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lake Burera:</span>
                  <span>55 km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lake Ruhondo:</span>
                  <span>34 km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Depth:</span>
                  <span>~69m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Elevation:</span>
                  <span>1,862m</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Lake Activities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{activity.name}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <Clock className="h-3 w-3" />
                    {activity.duration}
                  </Badge>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      {activity.price}
                      <span className="text-sm text-muted-foreground font-normal">/person</span>
                    </div>
                    <Button 
                      className="bg-gradient-hero text-white"
                      onClick={() => navigate('/booking')}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photography Paradise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Capture stunning reflections, terraced hillsides, and volcanic peaks in one of 
                Rwanda's most photogenic locations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                Water Sports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enjoy peaceful kayaking, boat cruises, and swimming in the crystal-clear 
                volcanic crater lakes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Cultural Encounters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Meet local fishing communities and learn about traditional lake-based 
                livelihoods and customs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visiting Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Visiting Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                <p className="text-muted-foreground mb-4">
                  Year-round destination with best conditions during dry seasons (June-September, December-February) 
                  for clearer skies and better photography.
                </p>
                <h4 className="font-semibold mb-2">What to Bring</h4>
                <p className="text-muted-foreground">
                  Bring sunscreen, hat, camera, comfortable walking shoes, and light jacket for early morning visits.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Getting There</h4>
                <p className="text-muted-foreground mb-4">
                  30-minute drive from Musanze town center. Accessible by car or motorcycle taxi (boda-boda).
                </p>
                <h4 className="font-semibold mb-2">Duration</h4>
                <p className="text-muted-foreground">
                  Plan 2-4 hours for a basic visit, full day for activities and extensive photography.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwinLakes;