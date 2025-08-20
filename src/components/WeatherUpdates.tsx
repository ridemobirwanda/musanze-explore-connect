import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Mountain,
  RefreshCw
} from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  description: string;
  icon: string;
}

interface TrailCondition {
  name: string;
  status: "excellent" | "good" | "fair" | "poor";
  description: string;
  lastUpdated: string;
}

const WeatherUpdates = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Mock weather data (in production, you'd fetch from a weather API)
  const mockWeatherData: WeatherData = {
    temperature: 18,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    visibility: 8,
    description: "Perfect conditions for trekking",
    icon: "partly-cloudy"
  };

  const trailConditions: TrailCondition[] = [
    {
      name: "Volcanoes National Park Trails",
      status: "excellent",
      description: "Dry trails, perfect visibility. Gorilla trekking conditions optimal.",
      lastUpdated: "2 hours ago"
    },
    {
      name: "Musanze Caves Access",
      status: "good",
      description: "Slightly muddy entrance, but safe for exploration. Bring proper footwear.",
      lastUpdated: "4 hours ago"
    },
    {
      name: "Twin Lakes Road",
      status: "good",
      description: "Road conditions good. Some construction near Burera bridge.",
      lastUpdated: "1 hour ago"
    },
    {
      name: "Dian Fossey Trail",
      status: "fair",
      description: "Recent rain made trail slippery. Recommend experienced hikers only.",
      lastUpdated: "3 hours ago"
    }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-500";
      case "good":
        return "bg-blue-500";
      case "fair":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-4 w-4" />;
      case "fair":
      case "poor":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const loadWeatherData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeather(mockWeatherData);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const getTrekkingAdvice = () => {
    if (!weather) return null;

    const { temperature, condition, humidity } = weather;
    
    if (temperature < 15) {
      return {
        type: "warning",
        message: "Cool temperatures expected. Pack warm layers and waterproof gear."
      };
    } else if (humidity > 80) {
      return {
        type: "info",
        message: "High humidity. Stay hydrated and take frequent breaks."
      };
    } else if (condition.toLowerCase().includes("rain")) {
      return {
        type: "warning",
        message: "Rain expected. Trails may be slippery. Consider postponing outdoor activities."
      };
    } else {
      return {
        type: "success",
        message: "Excellent conditions for outdoor activities and trekking!"
      };
    }
  };

  const advice = getTrekkingAdvice();

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Weather & 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Trail Conditions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about current weather and trail conditions for safe and enjoyable adventures
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  Current Weather - Musanze
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={loadWeatherData}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {weather ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getWeatherIcon(weather.condition)}
                      <div>
                        <p className="text-3xl font-bold">{weather.temperature}°C</p>
                        <p className="text-muted-foreground">{weather.condition}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Last updated</p>
                      <p>{lastUpdated}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-semibold">{weather.humidity}%</p>
                    </div>
                    <div className="text-center">
                      <Wind className="h-6 w-6 text-gray-500 mx-auto mb-1" />
                      <p className="text-sm text-muted-foreground">Wind</p>
                      <p className="font-semibold">{weather.windSpeed} km/h</p>
                    </div>
                    <div className="text-center">
                      <Eye className="h-6 w-6 text-green-500 mx-auto mb-1" />
                      <p className="text-sm text-muted-foreground">Visibility</p>
                      <p className="font-semibold">{weather.visibility} km</p>
                    </div>
                  </div>

                  {/* Trekking Advice */}
                  {advice && (
                    <Alert className={`${
                      advice.type === 'success' ? 'border-green-500 bg-green-50' :
                      advice.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <Navigation className="h-4 w-4" />
                      <AlertDescription className="font-medium">
                        {advice.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p>Loading weather data...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trail Conditions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-5 w-5 text-primary" />
                Trail & Road Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trailConditions.map((trail, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{trail.name}</h4>
                    <Badge 
                      className={`${getStatusColor(trail.status)} text-white flex items-center gap-1`}
                    >
                      {getStatusIcon(trail.status)}
                      {trail.status.charAt(0).toUpperCase() + trail.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{trail.description}</p>
                  <p className="text-xs text-muted-foreground">Updated {trail.lastUpdated}</p>
                </div>
              ))}
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Always check with local guides for the most current trail conditions. 
                  Weather can change rapidly in mountainous areas.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Trekking Safety Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">What to Pack:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Waterproof jacket and pants</li>
                  <li>• Sturdy hiking boots</li>
                  <li>• Extra layers for temperature changes</li>
                  <li>• First aid kit and emergency whistle</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Best Times:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Dry season: June to September, December to February</li>
                  <li>• Early morning starts recommended</li>
                  <li>• Avoid trekking during heavy rains</li>
                  <li>• Check permit availability in advance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeatherUpdates;