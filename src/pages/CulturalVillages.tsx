import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Music, Home } from "lucide-react";
import { Link } from "react-router-dom";
import tourGuideImage from "@/assets/tour-guide.jpg";

const CulturalVillages = () => {
  const villages = [
    {
      name: "Iby'iwacu Cultural Village",
      location: "Near Volcanoes National Park",
      specialty: "Traditional Rwandan culture",
      activities: ["Traditional dance", "Craft making", "Local cuisine", "Storytelling"],
      duration: "Half day",
      price: "$45",
      description: "Experience authentic Rwandan culture through dance, crafts, and traditional lifestyle."
    },
    {
      name: "Gorilla Guardians Village",
      location: "Kinigi",
      specialty: "Conservation & community",
      activities: ["Cultural performances", "Basket weaving", "Archery", "Community stories"],
      duration: "3-4 hours",
      price: "$35",
      description: "Learn about gorilla conservation while experiencing local culture and traditions."
    },
    {
      name: "Twin Lakes Community",
      location: "Burera District",
      specialty: "Fishing & farming culture",
      activities: ["Traditional fishing", "Farming experience", "Local cooking", "Canoe making"],
      duration: "Full day",
      price: "$60",
      description: "Immerse yourself in lakeside community life and traditional livelihoods."
    }
  ];

  const experiences = [
    {
      icon: Music,
      title: "Traditional Performances",
      description: "Witness authentic Intore dance performances and learn traditional songs passed down through generations."
    },
    {
      icon: Home,
      title: "Village Life",
      description: "Experience daily life in traditional Rwandan homes and learn about local customs and practices."
    },
    {
      icon: Users,
      title: "Community Projects",
      description: "Participate in community development projects and see how tourism supports local livelihoods."
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
          src={tourGuideImage}
          alt="Cultural Villages"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Cultural Villages
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Immerse yourself in authentic Rwandan culture and traditions
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Community Tourism</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Rwanda's cultural villages offer visitors authentic experiences that go beyond 
              traditional tourism. These community-based initiatives provide meaningful 
              interactions with local people while supporting sustainable development and 
              cultural preservation.
            </p>
            <p className="text-muted-foreground text-lg mb-6">
              Each village specializes in different aspects of Rwandan culture, from traditional 
              crafts and dance to modern conservation efforts and agricultural practices. 
              Visitors gain insights into daily life, participate in cultural activities, 
              and contribute directly to community development.
            </p>
            <p className="text-muted-foreground text-lg">
              These experiences are designed to be mutually beneficial - tourists gain authentic 
              cultural insights while communities receive income to support education, 
              healthcare, and conservation projects.
            </p>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Villages:</span>
                  <span>15+ active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Families:</span>
                  <span>500+ supported</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects:</span>
                  <span>25+ funded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages:</span>
                  <span>3 supported</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Villages */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Cultural Villages</h2>
          <div className="space-y-6">
            {villages.map((village, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-6 p-6">
                  <div className="lg:col-span-2">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2">{village.name}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{village.location}</span>
                      </div>
                      <CardDescription className="text-base">
                        {village.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Activities Include:</h4>
                      <div className="flex flex-wrap gap-2">
                        {village.activities.map((activity, actIndex) => (
                          <Badge key={actIndex} variant="secondary">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between">
                    <div className="space-y-3">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Clock className="h-3 w-3" />
                        {village.duration}
                      </Badge>
                      <Badge variant="outline" className="w-fit">
                        {village.specialty}
                      </Badge>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="text-2xl font-bold text-primary">
                        {village.price}
                        <span className="text-sm text-muted-foreground font-normal">/person</span>
                      </div>
                      <Button className="w-full bg-gradient-hero text-white">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cultural Experiences */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {experiences.map((experience, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <experience.icon className="h-6 w-6 text-primary" />
                    {experience.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cultural Activities */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Traditional Crafts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Basket Weaving</h4>
                <p className="text-muted-foreground text-sm">
                  Learn the intricate art of Agaseke basket weaving, a traditional craft 
                  that tells stories through patterns and colors.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Pottery Making</h4>
                <p className="text-muted-foreground text-sm">
                  Try your hand at traditional pottery techniques passed down through 
                  generations of Rwandan artisans.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Wood Carving</h4>
                <p className="text-muted-foreground text-sm">
                  Create traditional wooden sculptures and learn about the cultural 
                  significance of different designs.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cultural Performances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Intore Dance</h4>
                <p className="text-muted-foreground text-sm">
                  Watch and participate in traditional warrior dances that celebrate 
                  Rwanda's history and cultural pride.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Traditional Music</h4>
                <p className="text-muted-foreground text-sm">
                  Experience the sounds of traditional instruments like the Inanga (zither) 
                  and learn folk songs.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Storytelling</h4>
                <p className="text-muted-foreground text-sm">
                  Listen to ancient folktales and legends that have been preserved 
                  through oral tradition for centuries.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visitor Information */}
        <Card>
          <CardHeader>
            <CardTitle>Planning Your Visit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                <p className="text-muted-foreground mb-4">
                  Cultural villages are open year-round. Special festivals and ceremonies 
                  occur during harvest season (June-August) and New Year celebrations.
                </p>
                
                <h4 className="font-semibold mb-2">What's Included</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Guided cultural experiences</li>
                  <li>• Traditional meal or refreshments</li>
                  <li>• Cultural performances</li>
                  <li>• Craft-making activities</li>
                  <li>• Community interaction time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Cultural Etiquette</h4>
                <ul className="text-muted-foreground space-y-1 mb-4">
                  <li>• Dress modestly and respectfully</li>
                  <li>• Ask permission before photographing people</li>
                  <li>• Participate actively but respectfully</li>
                  <li>• Listen to your guide's instructions</li>
                  <li>• Support local artisans by purchasing crafts</li>
                </ul>
                
                <h4 className="font-semibold mb-2">Languages</h4>
                <p className="text-muted-foreground">
                  Experiences available in Kinyarwanda, English, and French. 
                  Translators provided as needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CulturalVillages;