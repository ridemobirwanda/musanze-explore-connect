import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Music, 
  Users, 
  Mountain, 
  Heart, 
  Trophy,
  Star,
  ArrowRight
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'cultural' | 'sports' | 'music' | 'festival' | 'community';
  description: string;
  price: string;
  featured: boolean;
  image?: string;
}

const EventsCalendar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const events: Event[] = [
    {
      id: "1",
      title: "Gorilla Naming Ceremony (Kwita Izina)",
      date: "2024-09-07",
      time: "09:00 AM",
      location: "Volcanoes National Park",
      category: "festival",
      description: "Annual celebration where baby gorillas are given names. Features traditional performances, conservation talks, and cultural displays.",
      price: "Free",
      featured: true
    },
    {
      id: "2",
      title: "Umuganda Community Service",
      date: "2024-03-30",
      time: "08:00 AM",
      location: "Throughout Musanze",
      category: "community",
      description: "Monthly community service day. Join locals in cleaning activities and community development projects.",
      price: "Free",
      featured: false
    },
    {
      id: "3",
      title: "Traditional Dance Performance",
      date: "2024-04-15",
      time: "06:00 PM",
      location: "Iby'iwacu Cultural Village",
      category: "cultural",
      description: "Authentic Rwandan traditional dances including Intore warriors dance and Umushagiriro harvest dance.",
      price: "$15",
      featured: true
    },
    {
      id: "4",
      title: "Volcano Marathon",
      date: "2024-05-18",
      time: "06:00 AM",
      location: "Starting from Musanze Town",
      category: "sports",
      description: "International marathon through scenic volcano landscapes. Full marathon, half marathon, and 10K options available.",
      price: "$50-80",
      featured: true
    },
    {
      id: "5",
      title: "Coffee Harvest Festival",
      date: "2024-04-10",
      time: "10:00 AM",
      location: "Local Coffee Farms",
      category: "festival",
      description: "Experience coffee picking, processing, and tasting. Learn about Rwanda's coffee culture and meet local farmers.",
      price: "$25",
      featured: false
    },
    {
      id: "6",
      title: "Musanze Jazz Night",
      date: "2024-04-20",
      time: "07:00 PM",
      location: "Hotel Muhabura",
      category: "music",
      description: "Monthly jazz evening featuring local and regional artists. Dinner and drinks available.",
      price: "$30",
      featured: false
    },
    {
      id: "7",
      title: "Mountain Gorilla Research Symposium",
      date: "2024-05-05",
      time: "09:00 AM",
      location: "Volcanoes National Park HQ",
      category: "community",
      description: "Annual symposium on gorilla conservation research. Presentations by Dian Fossey Fund researchers.",
      price: "$40",
      featured: false
    },
    {
      id: "8",
      title: "Youth Football Championship",
      date: "2024-04-25",
      time: "02:00 PM",
      location: "Musanze Stadium",
      category: "sports",
      description: "Regional youth football tournament. Support local teams and enjoy the community atmosphere.",
      price: "$5",
      featured: false
    }
  ];

  const categories = [
    { id: "all", name: "All Events", icon: Calendar },
    { id: "cultural", name: "Cultural", icon: Users },
    { id: "festival", name: "Festivals", icon: Star },
    { id: "sports", name: "Sports", icon: Trophy },
    { id: "music", name: "Music", icon: Music },
    { id: "community", name: "Community", icon: Heart }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const featuredEvents = events.filter(event => event.featured);
  const upcomingEvents = events.slice(0, 4);

  const getCategoryColor = (category: string) => {
    const colors = {
      cultural: "bg-purple-500",
      sports: "bg-blue-500",
      music: "bg-pink-500",
      festival: "bg-green-500",
      community: "bg-orange-500"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      cultural: Users,
      sports: Trophy,
      music: Music,
      festival: Star,
      community: Heart
    };
    const IconComponent = icons[category as keyof typeof icons] || Calendar;
    return <IconComponent className="h-4 w-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Events & 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Festivals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover cultural celebrations, community events, and exciting activities happening in Musanze
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedCategory === "all" ? "featured" : "all"} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="featured">Featured Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="all">All Events</TabsTrigger>
            </TabsList>

            {/* Featured Events */}
            <TabsContent value="featured" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={`${getCategoryColor(event.category)} text-white flex items-center gap-1`}>
                          {getCategoryIcon(event.category)}
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-primary">{event.price}</span>
                        <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                          Learn More
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Upcoming Events */}
            <TabsContent value="upcoming" className="space-y-6">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`${getCategoryColor(event.category)} text-white flex items-center gap-1`}>
                              {getCategoryIcon(event.category)}
                              {event.category}
                            </Badge>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary mb-2">{event.price}</p>
                          <Button size="sm">Book Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* All Events */}
            <TabsContent value="all" className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <IconComponent className="h-4 w-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={`${getCategoryColor(event.category)} text-white flex items-center gap-1`}>
                          {getCategoryIcon(event.category)}
                          {event.category}
                        </Badge>
                        {event.featured && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(event.date)} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{event.price}</span>
                        <Button size="sm">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Community Notice */}
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6 text-center">
              <Mountain className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
              <p className="text-muted-foreground mb-4">
                Follow our social media or subscribe to our newsletter to get notified about new events and festivals in Musanze.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline">Subscribe to Newsletter</Button>
                <Button>Follow Us</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;