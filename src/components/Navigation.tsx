import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin, Phone, Mail, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { canAccess } = useAuth();

  const exploreLinks = [
    { href: "/", label: "Home" },
    { href: "/volcanoes-national-park", label: "Volcanoes Park" },
    { href: "/twin-lakes", label: "Twin Lakes" },
    { href: "/musanze-caves", label: "Musanze Caves" },
    { href: "/cultural-villages", label: "Cultural Villages" },
  ];

  const bookingLinks = [
    { href: "/book/rooms", label: "Book Rooms" },
    { href: "/book/guides", label: "Book Guides" },
    { href: "/book/tours", label: "Book Tours" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            Visit Musanze
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Explore Dropdown */}
          <div className="relative group">
            <span className="text-sm font-medium transition-colors hover:text-primary cursor-pointer text-muted-foreground">
              Explore
            </span>
            <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-4 py-2 text-sm transition-colors hover:text-primary hover:bg-secondary/50 ${
                      isActive(link.href) ? "text-primary bg-secondary/30" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Book Dropdown */}
          <div className="relative group">
            <span className="text-sm font-medium transition-colors hover:text-primary cursor-pointer text-muted-foreground">
              Book
            </span>
            <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {bookingLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-4 py-2 text-sm transition-colors hover:text-primary hover:bg-secondary/50 ${
                      isActive(link.href) ? "text-primary bg-secondary/30" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Links */}
          <Link
            to="/booking"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/booking") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Plan Trip
          </Link>
          
          <a
            href="tel:+250788123456"
            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
          >
            Help
          </a>
        </nav>

        {/* Contact Info & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Admin Access */}
          {canAccess && (
            <Link to="/admin" className="hidden md:flex">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}
          
          <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+250 788 123 456</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>info@visitmusanze.rw</span>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Explore Section */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Explore</h4>
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ml-2 ${
                        isActive(link.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Book Section */}
                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Book</h4>
                  {bookingLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ml-2 ${
                        isActive(link.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Other Options */}
                <div className="border-t pt-4 space-y-2">
                  <Link
                    to="/booking"
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive("/booking") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Plan Trip
                  </Link>
                  <a
                    href="tel:+250788123456"
                    className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground block"
                  >
                    Help & Support
                  </a>
                </div>
                
                {/* Admin Access for Mobile */}
                {canAccess && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground flex items-center gap-2 border-t pt-4"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+250 788 123 456</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>info@visitmusanze.rw</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;