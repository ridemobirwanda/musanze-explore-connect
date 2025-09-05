import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  event_type: string;
  price: number;
  image_url: string;
  created_at: string;
  created_by: string;
}

const AdminEvents = () => {
  const { canAccess, loading: authLoading, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    event_type: 'cultural',
    price: '',
    image_url: ''
  });

  if (!authLoading && !canAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch events',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.event_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      event_date: '',
      event_type: 'cultural',
      price: '',
      image_url: ''
    });
    setEditingEvent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        event_date: formData.event_date,
        event_type: formData.event_type,
        price: formData.price ? parseFloat(formData.price) : null,
        image_url: formData.image_url,
        created_by: user?.id
      };

      let result;
      if (editingEvent) {
        result = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);
      } else {
        result = await supabase
          .from('events')
          .insert([eventData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: editingEvent ? 'Event updated successfully' : 'Event created successfully',
      });

      setIsDialogOpen(false);
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: 'Error',
        description: 'Failed to save event',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.event_date.split('T')[0],
      event_type: event.event_type,
      price: event.price?.toString() || '',
      image_url: event.image_url || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });

      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive',
      });
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'cultural':
        return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'nature':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'adventure':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    total: events.length,
    cultural: events.filter(e => e.event_type === 'cultural').length,
    nature: events.filter(e => e.event_type === 'nature').length,
    adventure: events.filter(e => e.event_type === 'adventure').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-muted-foreground">Create and manage tourism events and activities</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Update event details' : 'Add a new tourism event or activity'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="event_type">Event Type</Label>
                  <Select
                    value={formData.event_type}
                    onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="nature">Nature</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_date">Event Date</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cultural Events</CardTitle>
            <Badge className="bg-violet-100 text-violet-700 border-violet-200 text-xs">Cultural</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-600">{stats.cultural}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nature Events</CardTitle>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Nature</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.nature}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adventure Events</CardTitle>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">Adventure</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.adventure}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events by title, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            {event.image_url && (
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={event.image_url} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getEventTypeColor(event.event_type)}>
                      {event.event_type}
                    </Badge>
                    {event.price && (
                      <span className="text-lg font-bold text-primary">
                        ${event.price}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(event.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              {event.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {event.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.event_date).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {events.length === 0 ? 'No events created yet.' : 'No events found matching your search.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminEvents;