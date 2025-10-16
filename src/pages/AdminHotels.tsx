import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Building2, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Star,
  DollarSign,
  Users,
  Bed
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  star_rating: number;
  amenities: string[];
  image_url: string;
  phone: string;
  email: string;
  website: string;
  created_at: string;
}

interface HotelRoom {
  id: string;
  hotel_id: string;
  room_type: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  amenities: string[];
  image_url: string;
  available: boolean;
  created_at: string;
}

const AdminHotels = () => {
  const { canAccess, loading: authLoading } = useAuth();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isHotelDialogOpen, setIsHotelDialogOpen] = useState(false);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [editingRoom, setEditingRoom] = useState<HotelRoom | null>(null);
  const [selectedHotelForRoom, setSelectedHotelForRoom] = useState<string>('');
  
  const [hotelFormData, setHotelFormData] = useState({
    name: '',
    description: '',
    location: '',
    star_rating: '3',
    amenities: '',
    image_url: '',
    phone: '',
    email: '',
    website: ''
  });

  const [roomFormData, setRoomFormData] = useState({
    hotel_id: '',
    room_type: '',
    description: '',
    price_per_night: '',
    max_guests: '2',
    amenities: '',
    image_url: '',
    available: true
  });

  if (!authLoading && !canAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchHotels();
    fetchRooms();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [hotels, searchTerm]);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch hotels',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('hotel_rooms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const filterHotels = () => {
    let filtered = hotels;

    if (searchTerm) {
      filtered = filtered.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredHotels(filtered);
  };

  const resetHotelForm = () => {
    setHotelFormData({
      name: '',
      description: '',
      location: '',
      star_rating: '3',
      amenities: '',
      image_url: '',
      phone: '',
      email: '',
      website: ''
    });
    setEditingHotel(null);
  };

  const resetRoomForm = () => {
    setRoomFormData({
      hotel_id: selectedHotelForRoom,
      room_type: '',
      description: '',
      price_per_night: '',
      max_guests: '2',
      amenities: '',
      image_url: '',
      available: true
    });
    setEditingRoom(null);
  };

  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const hotelData = {
        name: hotelFormData.name,
        description: hotelFormData.description,
        location: hotelFormData.location,
        star_rating: parseInt(hotelFormData.star_rating),
        amenities: hotelFormData.amenities.split(',').map(a => a.trim()).filter(a => a),
        image_url: hotelFormData.image_url,
        phone: hotelFormData.phone,
        email: hotelFormData.email,
        website: hotelFormData.website
      };

      let result;
      if (editingHotel) {
        result = await supabase
          .from('hotels')
          .update(hotelData)
          .eq('id', editingHotel.id);
      } else {
        result = await supabase
          .from('hotels')
          .insert([hotelData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: editingHotel ? 'Hotel updated successfully' : 'Hotel created successfully',
      });

      setIsHotelDialogOpen(false);
      resetHotelForm();
      fetchHotels();
    } catch (error) {
      console.error('Error saving hotel:', error);
      toast({
        title: 'Error',
        description: 'Failed to save hotel',
        variant: 'destructive',
      });
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const roomData = {
        hotel_id: roomFormData.hotel_id,
        room_type: roomFormData.room_type,
        description: roomFormData.description,
        price_per_night: parseFloat(roomFormData.price_per_night),
        max_guests: parseInt(roomFormData.max_guests),
        amenities: roomFormData.amenities.split(',').map(a => a.trim()).filter(a => a),
        image_url: roomFormData.image_url,
        available: roomFormData.available
      };

      let result;
      if (editingRoom) {
        result = await supabase
          .from('hotel_rooms')
          .update(roomData)
          .eq('id', editingRoom.id);
      } else {
        result = await supabase
          .from('hotel_rooms')
          .insert([roomData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: editingRoom ? 'Room updated successfully' : 'Room created successfully',
      });

      setIsRoomDialogOpen(false);
      resetRoomForm();
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
      toast({
        title: 'Error',
        description: 'Failed to save room',
        variant: 'destructive',
      });
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setHotelFormData({
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      star_rating: hotel.star_rating.toString(),
      amenities: hotel.amenities?.join(', ') || '',
      image_url: hotel.image_url || '',
      phone: hotel.phone || '',
      email: hotel.email || '',
      website: hotel.website || ''
    });
    setIsHotelDialogOpen(true);
  };

  const handleEditRoom = (room: HotelRoom) => {
    setEditingRoom(room);
    setRoomFormData({
      hotel_id: room.hotel_id,
      room_type: room.room_type,
      description: room.description,
      price_per_night: room.price_per_night.toString(),
      max_guests: room.max_guests.toString(),
      amenities: room.amenities?.join(', ') || '',
      image_url: room.image_url || '',
      available: room.available
    });
    setIsRoomDialogOpen(true);
  };

  const handleDeleteHotel = async (hotelId: string) => {
    if (!confirm('Are you sure? This will also delete all rooms in this hotel.')) return;

    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', hotelId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Hotel deleted successfully',
      });

      fetchHotels();
      fetchRooms();
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete hotel',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;

    try {
      const { error } = await supabase
        .from('hotel_rooms')
        .delete()
        .eq('id', roomId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Room deleted successfully',
      });

      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete room',
        variant: 'destructive',
      });
    }
  };

  const getHotelRooms = (hotelId: string) => {
    return rooms.filter(room => room.hotel_id === hotelId);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    totalHotels: hotels.length,
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => r.available).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hotel Management</h1>
          <p className="text-muted-foreground">Manage hotels and their room inventory</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isHotelDialogOpen} onOpenChange={setIsHotelDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetHotelForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add Hotel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</DialogTitle>
                <DialogDescription>
                  {editingHotel ? 'Update hotel information' : 'Add a new hotel property'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleHotelSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hotel_name">Hotel Name</Label>
                    <Input
                      id="hotel_name"
                      value={hotelFormData.name}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={hotelFormData.location}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={hotelFormData.description}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="star_rating">Star Rating</Label>
                    <Input
                      id="star_rating"
                      type="number"
                      min="1"
                      max="5"
                      value={hotelFormData.star_rating}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, star_rating: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={hotelFormData.phone}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={hotelFormData.email}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, email: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={hotelFormData.website}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, website: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hotel_image_url">Image URL</Label>
                    <Input
                      id="hotel_image_url"
                      value={hotelFormData.image_url}
                      onChange={(e) => setHotelFormData({ ...hotelFormData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                  <Textarea
                    id="amenities"
                    value={hotelFormData.amenities}
                    onChange={(e) => setHotelFormData({ ...hotelFormData, amenities: e.target.value })}
                    placeholder="WiFi, Pool, Restaurant, Parking"
                    rows={2}
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsHotelDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingHotel ? 'Update Hotel' : 'Add Hotel'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hotels</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHotels}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
            <Bed className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalRooms}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Hotels</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Hotels List */}
      <div className="space-y-6">
        {filteredHotels.map((hotel) => {
          const hotelRooms = getHotelRooms(hotel.id);
          
          return (
            <Card key={hotel.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 flex-1">
                    {hotel.image_url && (
                      <img 
                        src={hotel.image_url} 
                        alt={hotel.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{hotel.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          {[...Array(hotel.star_rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <Badge variant="secondary">{hotelRooms.length} rooms</Badge>
                      </div>
                      
                      {hotel.description && (
                        <p className="text-sm text-muted-foreground mb-2">{hotel.description}</p>
                      )}
                      
                      <p className="text-sm text-muted-foreground">📍 {hotel.location}</p>
                      
                      {hotel.amenities && hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hotel.amenities.map((amenity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditHotel(hotel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteHotel(hotel.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Rooms</h4>
                  <Dialog open={isRoomDialogOpen && selectedHotelForRoom === hotel.id} 
                          onOpenChange={(open) => {
                            setIsRoomDialogOpen(open);
                            if (!open) setSelectedHotelForRoom('');
                          }}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedHotelForRoom(hotel.id);
                          setRoomFormData({ ...roomFormData, hotel_id: hotel.id });
                        }}
                      >
                        <Plus className="mr-2 h-3 w-3" />
                        Add Room
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
                        <DialogDescription>
                          {editingRoom ? 'Update room details' : `Add a new room to ${hotel.name}`}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleRoomSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="room_type">Room Type</Label>
                            <Input
                              id="room_type"
                              value={roomFormData.room_type}
                              onChange={(e) => setRoomFormData({ ...roomFormData, room_type: e.target.value })}
                              placeholder="e.g., Deluxe Suite"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="price_per_night">Price per Night (USD)</Label>
                            <Input
                              id="price_per_night"
                              type="number"
                              step="0.01"
                              value={roomFormData.price_per_night}
                              onChange={(e) => setRoomFormData({ ...roomFormData, price_per_night: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="room_description">Description</Label>
                          <Textarea
                            id="room_description"
                            value={roomFormData.description}
                            onChange={(e) => setRoomFormData({ ...roomFormData, description: e.target.value })}
                            rows={2}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="max_guests">Max Guests</Label>
                            <Input
                              id="max_guests"
                              type="number"
                              value={roomFormData.max_guests}
                              onChange={(e) => setRoomFormData({ ...roomFormData, max_guests: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="room_image_url">Image URL</Label>
                            <Input
                              id="room_image_url"
                              value={roomFormData.image_url}
                              onChange={(e) => setRoomFormData({ ...roomFormData, image_url: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="room_amenities">Room Amenities (comma-separated)</Label>
                          <Input
                            id="room_amenities"
                            value={roomFormData.amenities}
                            onChange={(e) => setRoomFormData({ ...roomFormData, amenities: e.target.value })}
                            placeholder="TV, Mini Bar, Balcony"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="room_available"
                            checked={roomFormData.available}
                            onCheckedChange={(checked) => setRoomFormData({ ...roomFormData, available: checked })}
                          />
                          <Label htmlFor="room_available">Available for booking</Label>
                        </div>
                        
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setIsRoomDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            {editingRoom ? 'Update Room' : 'Add Room'}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {hotelRooms.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {hotelRooms.map((room) => (
                      <Card key={room.id} className="bg-muted/30">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-semibold">{room.room_type}</h5>
                              <p className="text-lg font-bold text-primary">${room.price_per_night}/night</p>
                            </div>
                            
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleEditRoom(room)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteRoom(room.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {room.description && (
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{room.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>Max {room.max_guests}</span>
                            </div>
                            <Badge variant={room.available ? "default" : "secondary"} className="text-xs">
                              {room.available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </div>
                          
                          {room.amenities && room.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {room.amenities.slice(0, 2).map((amenity, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {room.amenities.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{room.amenities.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    No rooms added yet. Click "Add Room" to create one.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredHotels.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {hotels.length === 0 ? 'No hotels added yet.' : 'No hotels found matching your search.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminHotels;
