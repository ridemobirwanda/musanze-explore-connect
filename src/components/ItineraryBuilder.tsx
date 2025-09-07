import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, Users, Star, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ItineraryBuilder = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string>("3-day");
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  const interests = [
    { id: "nature", label: "Nature & Wildlife", icon: "🦍" },
    { id: "culture", label: "Culture & Heritage", icon: "🎭" },
    { id: "adventure", label: "Adventure Sports", icon: "🏔️" },
    { id: "photography", label: "Photography", icon: "📸" },
    { id: "relaxation", label: "Relaxation", icon: "🧘" }
  ];

  const durations = [
    { id: "1-day", label: "1 Day Trip", description: "Perfect for a quick exploration" },
    { id: "3-day", label: "3 Day Adventure", description: "Ideal for experiencing highlights" },
    { id: "7-day", label: "7 Day Experience", description: "Complete immersion in Musanze" }
  ];

  const sampleItineraries = {
    "1-day": {
      title: "Musanze Highlights Day Trip",
      totalCost: 85,
      activities: [
        {
          time: "8:00 AM",
          activity: "Musanze Caves Exploration",
          duration: "2 hours",
          cost: 15,
          description: "Discover ancient volcanic caves with historical significance"
        },
        {
          time: "11:00 AM",
          activity: "Twin Lakes Scenic Drive",
          duration: "2 hours",
          cost: 25,
          description: "Breathtaking views of crater lakes and photography opportunities"
        },
        {
          time: "2:00 PM",
          activity: "Cultural Village Visit",
          duration: "3 hours",
          cost: 45,
          description: "Experience traditional Rwandan culture and crafts"
        }
      ]
    },
    "3-day": {
      title: "Musanze Adventure Package",
      totalCost: 620,
      activities: [
        {
          day: "Day 1",
          activity: "Gorilla Trekking Experience",
          duration: "Full day",
          cost: 500,
          description: "Life-changing encounter with mountain gorillas"
        },
        {
          day: "Day 2",
          activity: "Twin Lakes & Cultural Village",
          duration: "Full day",
          cost: 70,
          description: "Lake activities and cultural immersion"
        },
        {
          day: "Day 3",
          activity: "Musanze Caves & Local Markets",
          duration: "Half day",
          cost: 50,
          description: "Cave exploration and shopping for local crafts"
        }
      ]
    },
    "7-day": {
      title: "Complete Musanze Experience",
      totalCost: 1250,
      activities: [
        {
          day: "Day 1-2",
          activity: "Gorilla Trekking & Golden Monkeys",
          duration: "2 days",
          cost: 600,
          description: "Two primate tracking experiences in Volcanoes National Park"
        },
        {
          day: "Day 3-4",
          activity: "Twin Lakes Adventure",
          duration: "2 days",
          cost: 200,
          description: "Kayaking, boat cruises, and lakeside cultural experiences"
        },
        {
          day: "Day 5-6",
          activity: "Cultural Immersion",
          duration: "2 days",
          cost: 300,
          description: "Multiple village visits and traditional craft workshops"
        },
        {
          day: "Day 7",
          activity: "Volcano Hiking & Departure",
          duration: "1 day",
          cost: 150,
          description: "Summit hike and farewell cultural performance"
        }
      ]
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const generateItinerary = () => {
    const itinerary = sampleItineraries[selectedDuration as keyof typeof sampleItineraries];
    setGeneratedItinerary(itinerary);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Plan Your <span className="text-primary">Perfect Trip</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your interests and we'll create a customized itinerary just for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Itinerary Builder */}
          <div className="space-y-6">
            {/* Interests Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  What interests you?
                </CardTitle>
                <CardDescription>
                  Select all activities that appeal to you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={() => handleInterestToggle(interest.id)}
                    />
                    <label 
                      htmlFor={interest.id}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                    >
                      <span className="text-lg">{interest.icon}</span>
                      {interest.label}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Duration Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  How long is your trip?
                </CardTitle>
                <CardDescription>
                  Choose your preferred trip duration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {durations.map((duration) => (
                  <div
                    key={duration.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedDuration === duration.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedDuration(duration.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{duration.label}</h4>
                        <p className="text-sm text-muted-foreground">{duration.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedDuration === duration.id
                          ? 'border-primary bg-primary'
                          : 'border-border'
                      }`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button 
              onClick={generateItinerary}
              className="w-full bg-gradient-hero text-white text-lg py-6"
              disabled={selectedInterests.length === 0}
            >
              Generate My Itinerary
            </Button>
          </div>

          {/* Generated Itinerary */}
          <div>
            {generatedItinerary ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{generatedItinerary.title}</CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${generatedItinerary.totalCost} total
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Per person
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {generatedItinerary.activities.map((activity: any, index: number) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{activity.activity}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {activity.time || activity.day}
                            </span>
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                        <Badge variant="outline">
                          ${activity.cost}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{activity.description}</p>
                    </div>
                  ))}
                  
                  <div className="pt-6 border-t">
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-gradient-hero text-white"
                        onClick={() => navigate('/booking')}
                      >
                        Book This Itinerary
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setGeneratedItinerary(null);
                        }}
                      >
                        Customize
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-6 text-muted-foreground/50" />
                  <h3 className="text-xl font-semibold mb-4">Ready to Plan?</h3>
                  <p className="text-muted-foreground">
                    Select your interests and trip duration, then click "Generate My Itinerary" 
                    to see a personalized travel plan created just for you.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Sample Itinerary Previews */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Popular Itinerary Templates</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(sampleItineraries).map(([key, itinerary]) => (
              <Card key={key} className="hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{itinerary.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">${itinerary.totalCost}</Badge>
                    <Badge variant="outline">{key}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {itinerary.activities.slice(0, 2).map((activity, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{activity.activity}</span>
                        <span className="text-muted-foreground ml-2">${activity.cost}</span>
                      </div>
                    ))}
                    {itinerary.activities.length > 2 && (
                      <p className="text-sm text-muted-foreground">
                        +{itinerary.activities.length - 2} more activities
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedDuration(key);
                      setGeneratedItinerary(itinerary);
                    }}
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryBuilder;