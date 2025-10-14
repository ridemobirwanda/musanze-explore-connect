import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Bed, Wifi, Coffee, Star, Car } from 'lucide-react';
import { ImageCarousel } from '@/components/ui/image-carousel';
import luxurySuite from '@/assets/luxury-suite.jpg';
import standardRoom from '@/assets/standard-room.jpg';
import familyVilla from '@/assets/family-villa.jpg';

const rooms = [
  {
    id: 1,
    name: "Luxury Suite",
    price: 300,
    capacity: 2,
    images: [luxurySuite, standardRoom, familyVilla],
    description: "Experience ultimate comfort in our spacious luxury suite with stunning mountain views, premium amenities, and exceptional service.",
    amenities: ["King-size bed", "Private balcony", "Mountain view", "Mini bar", "Coffee maker", "Free WiFi", "Room service", "Air conditioning"],
    features: ["50 sqm", "Ensuite bathroom", "Work desk", "Safe deposit box", "Smart TV"],
    rating: 4.9,
    type: "Suite",
    bedType: "1 King Bed",
    maxGuests: 2
  },
  {
    id: 2,
    name: "Standard Room",
    price: 150,
    capacity: 2,
    images: [standardRoom, luxurySuite, familyVilla],
    description: "Comfortable and well-appointed standard room perfect for couples or solo travelers seeking quality accommodation.",
    amenities: ["Queen-size bed", "Garden view", "Free WiFi", "Coffee maker", "Air conditioning", "Flat-screen TV"],
    features: ["30 sqm", "Ensuite bathroom", "Writing desk", "Safe", "Daily housekeeping"],
    rating: 4.7,
    type: "Standard",
    bedType: "1 Queen Bed",
    maxGuests: 2
  },
  {
    id: 3,
    name: "Family Villa",
    price: 500,
    capacity: 6,
    images: [familyVilla, luxurySuite, standardRoom],
    description: "Spacious family villa with multiple bedrooms, living area, and private garden - perfect for families or groups.",
    amenities: ["3 Bedrooms", "Living room", "Kitchenette", "Private garden", "BBQ area", "Free WiFi", "Laundry service", "Free parking"],
    features: ["120 sqm", "2 Bathrooms", "Dining area", "Terrace", "Children's play area"],
    rating: 4.8,
    type: "Villa",
    bedType: "1 King + 2 Queen Beds",
    maxGuests: 6
  }
];

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === Number(id));

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Room Not Found</CardTitle>
            <CardDescription>The room you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/book/rooms')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Rooms
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Section */}
          <div>
            <Card className="overflow-hidden">
              <ImageCarousel images={room.images} alt={room.name} />
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-4xl font-bold">{room.name}</h1>
                  <p className="text-xl text-muted-foreground mt-1">{room.type}</p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  ${room.price}/night
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{room.rating}</span>
                </div>
                <Badge variant="outline">
                  <Users className="mr-1 h-4 w-4" />
                  Up to {room.maxGuests} guests
                </Badge>
                <Badge variant="outline">
                  <Bed className="mr-1 h-4 w-4" />
                  {room.bedType}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground mt-4">{room.description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Room Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => {
                    let icon;
                    if (amenity.includes('WiFi')) icon = <Wifi className="h-4 w-4 text-primary" />;
                    else if (amenity.includes('Coffee') || amenity.includes('bar')) icon = <Coffee className="h-4 w-4 text-primary" />;
                    else if (amenity.includes('parking')) icon = <Car className="h-4 w-4 text-primary" />;
                    else if (amenity.includes('bed') || amenity.includes('Bed')) icon = <Bed className="h-4 w-4 text-primary" />;
                    else icon = <Star className="h-4 w-4 text-primary" />;

                    return (
                      <div key={index} className="flex items-center gap-2">
                        {icon}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Free cancellation up to 48 hours before check-in. After that, the first night will be charged.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Check-in/Check-out</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span className="font-semibold">2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span className="font-semibold">11:00 AM</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate(`/book/rooms?room=${room.id}`)}
            >
              Book Now - ${room.price}/night
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
