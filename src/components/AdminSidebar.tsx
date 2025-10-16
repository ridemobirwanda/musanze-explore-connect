import { 
  BarChart3, 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Settings, 
  Home,
  BookOpen,
  Map,
  Shield,
  Compass,
  UserCheck,
  Building2
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const adminItems = [
  { title: 'Dashboard', url: '/admin', icon: BarChart3 },
  { title: 'Bookings', url: '/admin/bookings', icon: Calendar },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Tours', url: '/admin/tours', icon: Compass },
  { title: 'Guides', url: '/admin/guides', icon: UserCheck },
  { title: 'Hotels', url: '/admin/hotels', icon: Building2 },
  { title: 'Events', url: '/admin/events', icon: Calendar },
  { title: 'Content', url: '/admin/content', icon: FileText },
  { title: 'Payments', url: '/admin/payments', icon: CreditCard },
];

const quickLinks = [
  { title: 'Website', url: '/', icon: Home },
  { title: 'Virtual Guide', url: '/#virtual-guide', icon: BookOpen },
  { title: 'Travel Calculator', url: '/#travel-calculator', icon: Map },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50';

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar>
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        {/* Logo/Brand */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Musanze Tourism</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Links */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}