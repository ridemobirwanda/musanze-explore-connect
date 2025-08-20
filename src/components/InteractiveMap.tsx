import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Filter, Hotel, Camera, Mountain, Users } from "lucide-react";

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const filters = [
    { id: "all", label: "All", icon: MapPin },
    { id: "adventure", label: "Adventure", icon: Mountain },
    { id: "culture", label: "Culture", icon: Users },
    { id: "lodging", label: "Hotels", icon: Hotel },
    { id: "photography", label: "Photography", icon: Camera }
  ];

  const locations = [
    {
      id: 1,
      name: "Volcanoes National Park",
      type: "adventure",
      category: "National Park",
      description: "Home to mountain gorillas and spectacular volcanic landscapes",
      coordinates: { lat: -1.4733, lng: 29.5214 },
      price: "$1,500",
      duration: "Full day",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Twin Lakes Burera & Ruhondo",
      type: "photography",
      category: "Natural Wonder",
      description: "Stunning crater lakes with breathtaking mountain reflections",
      coordinates: { lat: -1.4167, lng: 29.5833 },
      price: "$50",
      duration: "Half day",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Musanze Caves",
      type: "adventure",
      category: "Historical Site",
      description: "Ancient volcanic caves with rich cultural history",
      coordinates: { lat: -1.4994, lng: 29.6336 },
      price: "$15",
      duration: "2 hours",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Iby'iwacu Cultural Village",
      type: "culture",
      category: "Cultural Site",
      description: "Experience authentic Rwandan culture and traditions",
      coordinates: { lat: -1.4583, lng: 29.5000 },
      price: "$45",
      duration: "Half day",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Virunga Lodge",
      type: "lodging",
      category: "Luxury Lodge",
      description: "Premium accommodation with stunning volcano views",
      coordinates: { lat: -1.4500, lng: 29.5500 },
      price: "$450",
      duration: "per night",
      image: "/api/placeholder/300/200"
    }
  ];

  const filteredLocations = selectedFilter === "all" 
    ? locations 
    : locations.filter(loc => loc.type === selectedFilter);

  const MapPlaceholder = () => (
    <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Map Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-muted-foreground/20" />
          ))}
        </div>
      </div>
      
      {/* Location Pins */}
      <div className="absolute inset-0">
        {filteredLocations.map((location, index) => {
          const xPos = 15 + (index * 15) % 70;
          const yPos = 20 + ((index * 23) % 60);
          
          return (
            <div
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                selectedLocation?.id === location.id ? 'scale-125 z-10' : 'hover:scale-110'
              }`}
              style={{ left: `${xPos}%`, top: `${yPos}%` }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className={`w-4 h-4 rounded-full shadow-lg ${
                location.type === 'adventure' ? 'bg-red-500' :
                location.type === 'culture' ? 'bg-yellow-500' :
                location.type === 'lodging' ? 'bg-blue-500' :
                location.type === 'photography' ? 'bg-green-500' :
                'bg-primary'
              }`} />
              <div className="text-xs font-medium text-center mt-1 text-foreground bg-background/80 px-1 rounded whitespace-nowrap">
                {location.name.split(' ')[0]}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Center Message */}
      <div className="text-center text-muted-foreground z-0">
        <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">Interactive Map of Musanze</p>
        <p className="text-sm">Click on pins to explore attractions</p>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore <span className="text-primary">Musanze</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover all attractions, hotels, and experiences on our interactive map
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.id}
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <MapPlaceholder />
              </CardContent>
            </Card>
            
            {/* Map Legend */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Map Legend</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span>Adventure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span>Culture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Hotels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Photography</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div>
            {selectedLocation ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedLocation.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {selectedLocation.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{selectedLocation.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{selectedLocation.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold text-primary">{selectedLocation.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-hero text-white">
                      Book Now
                    </Button>
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a Location</h3>
                  <p className="text-muted-foreground">
                    Click on any pin on the map to see detailed information about that location.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Attractions:</span>
                  <span className="font-semibold">{locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Adventure Sites:</span>
                  <span className="font-semibold">{locations.filter(l => l.type === 'adventure').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cultural Sites:</span>
                  <span className="font-semibold">{locations.filter(l => l.type === 'culture').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accommodations:</span>
                  <span className="font-semibold">{locations.filter(l => l.type === 'lodging').length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;