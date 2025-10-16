import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  UserCheck, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Star,
  Languages,
  DollarSign,
  Clock
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Guide {
  id: string;
  name: string;
  bio: string;
  specialization: string;
  languages: string[];
  experience_years: number;
  rating: number;
  hourly_rate: number;
  phone: string;
  email: string;
  image_url: string;
  available: boolean;
  created_at: string;
}

const AdminGuides = () => {
  const { canAccess, loading: authLoading } = useAuth();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialization: '',
    languages: 'English',
    experience_years: '0',
    rating: '5.0',
    hourly_rate: '',
    phone: '',
    email: '',
    image_url: '',
    available: true
  });

  if (!authLoading && !canAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    filterGuides();
  }, [guides, searchTerm]);

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch guides',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterGuides = () => {
    let filtered = guides;

    if (searchTerm) {
      filtered = filtered.filter(guide =>
        guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGuides(filtered);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      bio: '',
      specialization: '',
      languages: 'English',
      experience_years: '0',
      rating: '5.0',
      hourly_rate: '',
      phone: '',
      email: '',
      image_url: '',
      available: true
    });
    setEditingGuide(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const guideData = {
        name: formData.name,
        bio: formData.bio,
        specialization: formData.specialization,
        languages: formData.languages.split(',').map(l => l.trim()),
        experience_years: parseInt(formData.experience_years),
        rating: parseFloat(formData.rating),
        hourly_rate: parseFloat(formData.hourly_rate),
        phone: formData.phone,
        email: formData.email,
        image_url: formData.image_url,
        available: formData.available
      };

      let result;
      if (editingGuide) {
        result = await supabase
          .from('guides')
          .update(guideData)
          .eq('id', editingGuide.id);
      } else {
        result = await supabase
          .from('guides')
          .insert([guideData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: editingGuide ? 'Guide updated successfully' : 'Guide created successfully',
      });

      setIsDialogOpen(false);
      resetForm();
      fetchGuides();
    } catch (error) {
      console.error('Error saving guide:', error);
      toast({
        title: 'Error',
        description: 'Failed to save guide',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (guide: Guide) => {
    setEditingGuide(guide);
    setFormData({
      name: guide.name,
      bio: guide.bio,
      specialization: guide.specialization,
      languages: guide.languages?.join(', ') || 'English',
      experience_years: guide.experience_years.toString(),
      rating: guide.rating.toString(),
      hourly_rate: guide.hourly_rate.toString(),
      phone: guide.phone || '',
      email: guide.email || '',
      image_url: guide.image_url || '',
      available: guide.available
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (guideId: string) => {
    if (!confirm('Are you sure you want to delete this guide?')) return;

    try {
      const { error } = await supabase
        .from('guides')
        .delete()
        .eq('id', guideId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Guide deleted successfully',
      });

      fetchGuides();
    } catch (error) {
      console.error('Error deleting guide:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete guide',
        variant: 'destructive',
      });
    }
  };

  const toggleAvailability = async (guideId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('guides')
        .update({ available: !currentStatus })
        .eq('id', guideId);

      if (error) throw error;

      setGuides(prev => prev.map(guide => 
        guide.id === guideId ? { ...guide, available: !currentStatus } : guide
      ));

      toast({
        title: 'Success',
        description: `Guide marked as ${!currentStatus ? 'available' : 'unavailable'}`,
      });
    } catch (error) {
      console.error('Error updating guide availability:', error);
      toast({
        title: 'Error',
        description: 'Failed to update guide availability',
        variant: 'destructive',
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = {
    total: guides.length,
    available: guides.filter(g => g.available).length,
    avgRate: guides.length > 0 ? guides.reduce((sum, g) => sum + g.hourly_rate, 0) / guides.length : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Guide Management</h1>
          <p className="text-muted-foreground">Manage tour guides and their profiles</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Guide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingGuide ? 'Edit Guide' : 'Add New Guide'}</DialogTitle>
              <DialogDescription>
                {editingGuide ? 'Update guide information' : 'Add a new tour guide to your team'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g., Wildlife Expert"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience_years">Experience (years)</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    step="0.01"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="languages">Languages (comma-separated)</Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="English, French, Kinyarwanda"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">Profile Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label htmlFor="available">Available for bookings</Label>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingGuide ? 'Update Guide' : 'Add Guide'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guides</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.available}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Guides</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Guides Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map((guide) => (
          <Card key={guide.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={guide.image_url} alt={guide.name} />
                  <AvatarFallback>{getInitials(guide.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{guide.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{guide.specialization}</p>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(guide)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(guide.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                    <Badge variant={guide.available ? "default" : "secondary"}>
                      {guide.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {guide.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2">{guide.bio}</p>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{guide.experience_years} years experience</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">${guide.hourly_rate}/hour</span>
                </div>
                
                {guide.languages && guide.languages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map((lang, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => toggleAvailability(guide.id, guide.available)}
                >
                  {guide.available ? 'Mark Unavailable' : 'Mark Available'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {guides.length === 0 ? 'No guides added yet.' : 'No guides found matching your search.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminGuides;
