import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calculator, Users, Calendar, MapPin, DollarSign } from "lucide-react";

interface CostBreakdown {
  accommodation: number;
  activities: number;
  transport: number;
  food: number;
  permits: number;
  total: number;
}

const TravelCostCalculator = () => {
  const [days, setDays] = useState<number>(3);
  const [groupSize, setGroupSize] = useState<number>(2);
  const [accommodationType, setAccommodationType] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [transportType, setTransportType] = useState<string>("");
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);

  const accommodationPrices = {
    budget: 25, // per person per night
    midrange: 75,
    luxury: 200,
    homestay: 15
  };

  const activityPrices = {
    "gorilla-trekking": 700, // per person
    "golden-monkey": 100,
    "volcano-hiking": 75,
    "cave-exploration": 30,
    "cultural-village": 25,
    "twin-lakes": 20,
    "canoe-ride": 40
  };

  const transportPrices = {
    "private-car": 80, // per day
    "shared-taxi": 25,
    "boda-boda": 15,
    "public-transport": 5
  };

  const foodPricePerDay = {
    budget: 10,
    midrange: 25,
    luxury: 50
  };

  const activities = [
    { id: "gorilla-trekking", name: "Gorilla Trekking", price: 700 },
    { id: "golden-monkey", name: "Golden Monkey Tracking", price: 100 },
    { id: "volcano-hiking", name: "Volcano Hiking", price: 75 },
    { id: "cave-exploration", name: "Musanze Caves", price: 30 },
    { id: "cultural-village", name: "Cultural Village Visit", price: 25 },
    { id: "twin-lakes", name: "Twin Lakes Tour", price: 20 },
    { id: "canoe-ride", name: "Lake Canoe Ride", price: 40 }
  ];

  const handleActivityChange = (activityId: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities([...selectedActivities, activityId]);
    } else {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    }
  };

  const calculateCost = () => {
    if (!accommodationType || !transportType) {
      return;
    }

    // Accommodation cost
    const accommodationCost = accommodationPrices[accommodationType as keyof typeof accommodationPrices] * groupSize * days;

    // Activities cost
    const activitiesCost = selectedActivities.reduce((total, activityId) => {
      return total + (activityPrices[activityId as keyof typeof activityPrices] * groupSize);
    }, 0);

    // Transport cost
    const transportCost = transportPrices[transportType as keyof typeof transportPrices] * days;

    // Food cost (based on accommodation type)
    let foodCategory = accommodationType === 'luxury' ? 'luxury' : 
                      accommodationType === 'budget' || accommodationType === 'homestay' ? 'budget' : 'midrange';
    const foodCost = foodPricePerDay[foodCategory as keyof typeof foodPricePerDay] * groupSize * days;

    // Permits (gorilla trekking requires separate permit)
    const permitsCost = selectedActivities.includes('gorilla-trekking') ? 15 * groupSize : 0;

    const total = accommodationCost + activitiesCost + transportCost + foodCost + permitsCost;

    setCostBreakdown({
      accommodation: accommodationCost,
      activities: activitiesCost,
      transport: transportCost,
      food: foodCost,
      permits: permitsCost,
      total
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plan Your 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Budget</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get an estimated cost for your Musanze adventure and plan your perfect trip
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Travel Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="days" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Number of Days
                  </Label>
                  <Input
                    id="days"
                    type="number"
                    min="1"
                    max="14"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="groupSize" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Group Size
                  </Label>
                  <Input
                    id="groupSize"
                    type="number"
                    min="1"
                    max="20"
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              {/* Accommodation */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Accommodation Type
                </Label>
                <Select value={accommodationType} onValueChange={setAccommodationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget Lodge ($25/night/person)</SelectItem>
                    <SelectItem value="midrange">Mid-range Hotel ($75/night/person)</SelectItem>
                    <SelectItem value="luxury">Luxury Resort ($200/night/person)</SelectItem>
                    <SelectItem value="homestay">Homestay ($15/night/person)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transport */}
              <div className="space-y-2">
                <Label>Transportation</Label>
                <Select value={transportType} onValueChange={setTransportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transportation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private-car">Private Car ($80/day)</SelectItem>
                    <SelectItem value="shared-taxi">Shared Taxi ($25/day)</SelectItem>
                    <SelectItem value="boda-boda">Boda-boda ($15/day)</SelectItem>
                    <SelectItem value="public-transport">Public Transport ($5/day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Activities */}
              <div className="space-y-4">
                <Label>Activities & Attractions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        id={activity.id}
                        checked={selectedActivities.includes(activity.id)}
                        onCheckedChange={(checked) => handleActivityChange(activity.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={activity.id} className="font-medium cursor-pointer">
                          {activity.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">${activity.price}/person</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <Button onClick={calculateCost} className="w-full bg-gradient-hero text-white" size="lg">
                <DollarSign className="mr-2 h-5 w-5" />
                Calculate Total Cost
              </Button>

              {/* Results */}
              {costBreakdown && (
                <Card className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-primary">Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span>Accommodation ({days} nights):</span>
                        <span className="font-semibold">${costBreakdown.accommodation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activities:</span>
                        <span className="font-semibold">${costBreakdown.activities}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Transportation:</span>
                        <span className="font-semibold">${costBreakdown.transport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Food & Meals:</span>
                        <span className="font-semibold">${costBreakdown.food}</span>
                      </div>
                      {costBreakdown.permits > 0 && (
                        <div className="flex justify-between">
                          <span>Permits & Fees:</span>
                          <span className="font-semibold">${costBreakdown.permits}</span>
                        </div>
                      )}
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold text-primary">
                      <span>Total Estimated Cost:</span>
                      <span>${costBreakdown.total}</span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      *Prices are estimates in USD. Actual costs may vary based on season and availability.
                    </p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TravelCostCalculator;