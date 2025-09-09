import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Bed, Users, Star, Wifi, Car, Coffee, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ImageCarousel } from "@/components/ui/image-carousel";

// Import room images
import luxurySuite from "@/assets/luxury-suite.jpg";
import standardRoom from "@/assets/standard-room.jpg";
import familyVilla from "@/assets/family-villa.jpg";
import hotelRoom from "@/assets/hotel-room.jpg";

const rooms = [
  {
    id: 1,
    name: "Luxury Mountain View Suite",
    hotel: "Volcanoes Serena Hotel",
    price: "$350/night",
    rating: 4.9,
    images: [luxurySuite, hotelRoom],
    amenities: ["Mountain View", "King Bed", "WiFi", "Mini Bar", "Room Service"],
    capacity: "2 guests",
    description: "Spacious suite with stunning views of Virunga volcanoes"
  },
  {
    id: 2,
    name: "Standard Double Room",
    hotel: "Mountain Gorilla View Lodge",
    price: "$180/night",
    rating: 4.6,
    images: [standardRoom, hotelRoom],
    amenities: ["Garden View", "Double Bed", "WiFi", "Hot Shower"],
    capacity: "2 guests",
    description: "Comfortable room with modern amenities and garden views"
  },
  {
    id: 3,
    name: "Family Villa",
    hotel: "Five Volcanoes Boutique Hotel",
    price: "$450/night",
    rating: 4.8,
    images: [familyVilla, luxurySuite],
    amenities: ["Private Terrace", "2 Bedrooms", "Living Area", "Kitchen"],
    capacity: "4-6 guests",
    description: "Perfect for families with separate bedrooms and living space"
  }
];

const BookRooms = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");

  useEffect(() => {
    const roomId = searchParams.get('room');
    if (roomId) {
      setSelectedRoom(roomId);
    }
  }, [searchParams]);

  const handleRoomDetails = (roomId: number) => {
    navigate(`/rooms/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Book Your Perfect Room
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from our curated selection of hotels and lodges in Musanze
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full">
                  Search Rooms
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <Card 
              key={room.id} 
              className={`group hover:shadow-lg hover-scale transition-all duration-300 cursor-pointer ${
                selectedRoom === room.id.toString() ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleRoomDetails(room.id)}
            >
              <div className="relative">
                <ImageCarousel
                  images={room.images}
                  alt={room.name}
                  autoSlide={true}
                  slideInterval={20000}
                />
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {room.rating}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">{room.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{room.hotel}</p>
                  <p className="text-sm text-muted-foreground">{room.description}</p>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="h-4 w-4" />
                    <span>WiFi</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {room.price}
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!checkIn || !checkOut) {
                        alert("Please select check-in and check-out dates");
                        return;
                      }
                      console.log(`Booking room ${room.id} from ${checkIn} to ${checkOut} for ${guests} guests`);
                    }}
                    className="bg-gradient-hero text-white hover:shadow-lg transition-all duration-300"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookRooms;