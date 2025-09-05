import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  DollarSign, 
  CreditCard, 
  Search, 
  Filter,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Download
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Payment {
  id: string;
  customer_name: string;
  customer_email: string;
  service_name: string;
  booking_date: string;
  total_cost: number;
  status: string;
  stripe_payment_intent_id: string;
  created_at: string;
}

const AdminPayments = () => {
  const { canAccess, loading: authLoading } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  if (!authLoading && !canAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, statusFilter, dateFilter]);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .not('stripe_payment_intent_id', 'is', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch payment data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.stripe_payment_intent_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          filterDate.setTime(0);
      }
      
      if (dateFilter !== 'all') {
        filtered = filtered.filter(payment => 
          new Date(payment.created_at) >= filterDate
        );
      }
    }

    setFilteredPayments(filtered);
  };

  const exportPayments = () => {
    if (filteredPayments.length === 0) {
      toast({
        title: 'No Data',
        description: 'No payments to export',
        variant: 'destructive',
      });
      return;
    }

    const csvHeader = 'Date,Customer Name,Email,Service,Amount,Status,Payment ID\n';
    const csvData = filteredPayments.map(payment => 
      `${new Date(payment.created_at).toLocaleDateString()},${payment.customer_name},"${payment.customer_email}","${payment.service_name}",${payment.total_cost},${payment.status},${payment.stripe_payment_intent_id}`
    ).join('\n');
    
    const csvContent = csvHeader + csvData;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: 'Payment report exported successfully',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
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
    totalPayments: filteredPayments.length,
    totalRevenue: filteredPayments
      .filter(p => p.status === 'confirmed')
      .reduce((sum, p) => sum + Number(p.total_cost), 0),
    pendingAmount: filteredPayments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + Number(p.total_cost), 0),
    averagePayment: filteredPayments.length > 0 
      ? filteredPayments.reduce((sum, p) => sum + Number(p.total_cost), 0) / filteredPayments.length
      : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-muted-foreground">Monitor and manage payment transactions</p>
        </div>
        
        <Button onClick={exportPayments} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayments}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">${stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">${stats.pendingAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${stats.averagePayment.toFixed(0)}</div>
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
                  placeholder="Search by customer, service, or payment ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions ({filteredPayments.length})</CardTitle>
          <CardDescription>All payment transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{payment.customer_name}</h3>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">{payment.status}</span>
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{payment.customer_email}</p>
                    <p className="text-sm text-muted-foreground">
                      Payment ID: {payment.stripe_payment_intent_id}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${Number(payment.total_cost).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded">
                  <div>
                    <p className="font-medium">Service: <span className="font-normal">{payment.service_name}</span></p>
                    <p className="font-medium">Booking Date: <span className="font-normal">{new Date(payment.booking_date).toLocaleDateString()}</span></p>
                  </div>
                  <div>
                    <p className="font-medium">Payment Date: <span className="font-normal">{new Date(payment.created_at).toLocaleDateString()}</span></p>
                    <p className="font-medium">Status: <span className="font-normal capitalize">{payment.status}</span></p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPayments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p>No payment transactions found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;