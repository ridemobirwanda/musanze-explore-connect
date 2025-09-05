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
  FileText, 
  Image as ImageIcon, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Content {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  type: string;
  status: string;
  featured_image: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

const AdminContent = () => {
  const { canAccess, loading: authLoading, user } = useAuth();
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    type: 'article',
    status: 'draft',
    featured_image: ''
  });

  if (!authLoading && !canAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, statusFilter]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = content;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredContent(filtered);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      type: 'article',
      status: 'draft',
      featured_image: ''
    });
    setEditingContent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const contentData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        type: formData.type,
        status: formData.status,
        featured_image: formData.featured_image,
        author_id: user?.id
      };

      let result;
      if (editingContent) {
        result = await supabase
          .from('content')
          .update(contentData)
          .eq('id', editingContent.id);
      } else {
        result = await supabase
          .from('content')
          .insert([contentData]);
      }

      if (result.error) throw result.error;

      toast({
        title: 'Success',
        description: editingContent ? 'Content updated successfully' : 'Content created successfully',
      });

      setIsDialogOpen(false);
      resetForm();
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: Content) => {
    setEditingContent(item);
    setFormData({
      title: item.title,
      content: item.content,
      excerpt: item.excerpt,
      type: item.type,
      status: item.status,
      featured_image: item.featured_image || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (contentId: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', contentId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Content deleted successfully',
      });

      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete content',
        variant: 'destructive',
      });
    }
  };

  const toggleStatus = async (contentId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('content')
        .update({ status: newStatus })
        .eq('id', contentId);

      if (error) throw error;

      setContent(prev => prev.map(item => 
        item.id === contentId ? { ...item, status: newStatus } : item
      ));

      toast({
        title: 'Success',
        description: `Content ${newStatus} successfully`,
      });
    } catch (error) {
      console.error('Error updating content status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update content status',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'draft':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'guide':
        return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'news':
        return 'bg-rose-100 text-rose-700 border-rose-200';
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
    total: content.length,
    published: content.filter(c => c.status === 'published').length,
    drafts: content.filter(c => c.status === 'draft').length,
    articles: content.filter(c => c.type === 'article').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Create and manage website content, articles, and guides</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingContent ? 'Edit Content' : 'Create New Content'}</DialogTitle>
              <DialogDescription>
                {editingContent ? 'Update content details' : 'Add new website content'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">Article</SelectItem>
                      <SelectItem value="guide">Travel Guide</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description or summary"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your content here..."
                  rows={8}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingContent ? 'Update Content' : 'Create Content'}
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
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.published}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <EyeOff className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.drafts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.articles}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content by title or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'published' ? <Eye className="mr-1 h-3 w-3" /> : <EyeOff className="mr-1 h-3 w-3" />}
                      {item.status}
                    </Badge>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  
                  {item.excerpt && (
                    <p className="text-muted-foreground">{item.excerpt}</p>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(item.created_at).toLocaleDateString()} | 
                    Updated: {new Date(item.updated_at).toLocaleDateString()}
                  </div>
                  
                  {item.featured_image && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ImageIcon className="h-4 w-4" />
                      <span>Has featured image</span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(item.id, item.status)}
                  >
                    {item.status === 'published' ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Publish
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {content.length === 0 ? 'No content created yet.' : 'No content found matching your search.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminContent;