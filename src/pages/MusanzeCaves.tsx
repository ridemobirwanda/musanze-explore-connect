import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Shield, Mountain, Users } from "lucide-react";
import { Link } from "react-router-dom";
import gorillaImage from "@/assets/gorilla-attraction.jpg";

const MusanzeCaves = () => {
  const tourOptions = [
    {
      name: "Standard Cave Tour",
      duration: "1.5 hours",
      price: "$15",
      description: "Explore the main cave chambers with basic lighting and safety equipment."
    },
    {
      name: "Extended Adventure Tour",
      duration: "3 hours",
      price: "$30",
      description: "Deep cave exploration including narrow passages and underground chambers."
    },
    {
      name: "Cultural Heritage Tour",
      duration: "2 hours",
      price: "$25",
      description: "Learn about cave history, geology, and cultural significance with expert guides."
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
          alt="Musanze Caves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Musanze Caves
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Ancient volcanic caves with rich history and stunning underground formations
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About Musanze Caves</h2>
            <p className="text-muted-foreground text-lg mb-6">
              The Musanze Caves are a fascinating network of underground passages formed by 
              volcanic activity over 65 million years ago. These natural caves stretch for 
              approximately 2 kilometers and have served as shelter, hideouts, and sacred 
              spaces throughout Rwanda's history.
            </p>
            <p className="text-muted-foreground text-lg mb-6">
              During the pre-colonial period, the caves were used by local kings as hideouts 
              during wars. In more recent history, they provided shelter during various conflicts. 
              Today, they offer visitors a unique underground adventure and insights into 
              Rwanda's geological and cultural heritage.
            </p>
            <p className="text-muted-foreground text-lg">
              The caves feature impressive stalactites, stalagmites, and various rock formations. 
              Visitors can explore different chambers, each with its own unique characteristics 
              and historical significance.
            </p>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="h-5 w-5" />
                  Cave Facts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Length:</span>
                  <span>~2 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Depth:</span>
                  <span>Up to 40m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Formation:</span>
                  <span>65M years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span>15-18°C</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Safety First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All tours include safety equipment: helmets, flashlights, and guided supervision. 
                  Wear comfortable, non-slip shoes and bring a light jacket.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tour Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Cave Tour Options</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourOptions.map((tour, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{tour.name}</CardTitle>
                  <CardDescription>{tour.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                    <Clock className="h-3 w-3" />
                    {tour.duration}
                  </Badge>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      {tour.price}
                      <span className="text-sm text-muted-foreground font-normal">/person</span>
                    </div>
                    <Button className="bg-gradient-hero text-white">
                      Book Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cave Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Cave Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>The King's Chamber</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The largest chamber where ancient Rwandan kings once held court and took 
                  refuge during conflicts. Features impressive rock formations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bat Colony</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Home to several species of bats. Observe these fascinating creatures 
                  in their natural habitat while learning about their ecological importance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Underground River</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A small underground stream flows through parts of the cave system, 
                  creating unique acoustics and supporting cave-adapted wildlife.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stalactite Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Marvel at centuries-old stalactite and stalagmite formations that 
                  create natural sculptures in the cave's depths.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Artifacts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover remnants of ancient pottery and tools left by previous 
                  inhabitants, telling the story of Rwanda's rich cultural heritage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Echo Chamber</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A natural acoustic wonder where sounds reverberate in unique patterns, 
                  historically used for communication and ceremonies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Visitor Information */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">What to Expect</h4>
                <ul className="text-muted-foreground space-y-1 mb-4">
                  <li>• Professional guide and safety equipment provided</li>
                  <li>• Moderate physical activity required</li>
                  <li>• Cool temperatures (15-18°C) inside caves</li>
                  <li>• Some narrow passages and uneven surfaces</li>
                </ul>
                
                <h4 className="font-semibold mb-2">Age Requirements</h4>
                <p className="text-muted-foreground">
                  Standard tours suitable for ages 8+. Extended tours recommended for ages 12+ 
                  due to physical demands.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What to Bring</h4>
                <ul className="text-muted-foreground space-y-1 mb-4">
                  <li>• Comfortable, non-slip walking shoes</li>
                  <li>• Light jacket or sweater</li>
                  <li>• Camera (flash photography allowed)</li>
                  <li>• Water bottle</li>
                  <li>• Small backpack for personal items</li>
                </ul>

                <h4 className="font-semibold mb-2">Opening Hours</h4>
                <p className="text-muted-foreground">
                  Daily: 8:00 AM - 5:00 PM<br />
                  Tours depart every hour during operating hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MusanzeCaves;