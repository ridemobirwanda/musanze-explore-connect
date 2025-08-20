import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Users, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState<string>("gorilla-trekking");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);

  const services = [
    {
      id: "gorilla-trekking",
      name: "Mountain Gorilla Trekking",
      price: 1500,
      duration: "Full day",
      category: "Adventure",
      description: "Once-in-a-lifetime encounter with mountain gorillas"
    },
    {
      id: "golden-monkeys",
      name: "Golden Monkey Tracking",
      price: 100,
      duration: "Half day",
      category: "Adventure",
      description: "Track playful golden monkeys in bamboo forests"
    },
    {
      id: "twin-lakes",
      name: "Twin Lakes Tour",
      price: 50,
      duration: "Half day",
      category: "Sightseeing",
      description: "Scenic boat cruise and photography tour"
    },
    {
      id: "cultural-village",
      name: "Cultural Village Experience",
      price: 45,
      duration: "Half day",
      category: "Culture",
      description: "Authentic Rwandan cultural immersion"
    },
    {
      id: "musanze-caves",
      name: "Musanze Caves Exploration",
      price: 25,
      duration: "2-3 hours",
      category: "Adventure",
      description: "Guided exploration of ancient volcanic caves"
    }
  ];

  const hotels = [
    {
      id: "virunga-lodge",
      name: "Virunga Lodge",
      price: 450,
      category: "Luxury",
      rating: 4.8
    },
    {
      id: "gorilla-view-lodge",
      name: "Mountain Gorilla View Lodge", 
      price: 380,
      category: "Premium",
      rating: 4.7
    },
    {
      id: "bambou-lodge",
      name: "Le Bambou Gorilla Lodge",
      price: 220,
      category: "Mid-range",
      rating: 4.6
    }
  ];

  const transport = [
    {
      id: "private-car",
      name: "Private Car with Driver", 
      price: 80,
      duration: "per day"
    },
    {
      id: "shared-transport",
      name: "Shared Group Transport",
      price: 25,
      duration: "per person"
    },
    {
      id: "boda-boda",
      name: "Motorcycle Taxi (Boda-Boda)",
      price: 15,
      duration: "per trip"
    }
  ];

  const selectedServiceData = services.find(s => s.id === selectedService);
  const totalCost = selectedServiceData ? selectedServiceData.price * guests : 0;

  const steps = [
    { number: 1, title: "Select Service", description: "Choose your activity" },
    { number: 2, title: "Details", description: "Date, guests & preferences" },
    { number: 3, title: "Contact Info", description: "Your details" },
    { number: 4, title: "Payment", description: "Confirm & pay" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Book Your <span className="text-primary">Adventure</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reserve your spot for an unforgettable experience in Musanze
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step.number}
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Experience</CardTitle>
                  <CardDescription>Choose the activity you'd like to book</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{service.name}</h4>
                            <Badge variant="secondary">{service.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                          <p className="text-sm text-muted-foreground">{service.duration}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold text-primary">${service.price}</p>
                          <p className="text-sm text-muted-foreground">per person</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={() => setCurrentStep(2)} className="w-full">
                    Continue to Details
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Date & Guests */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>When would you like to visit?</CardTitle>
                  <CardDescription>Select your preferred date and number of guests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Guests</Label>
                      <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5,6,7,8].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Special Requirements (Optional)</Label>
                    <Textarea 
                      placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1">
                      Continue to Contact Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>We'll need these details to confirm your booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+250 xxx xxx xxx" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country of Residence</Label>
                    <Input id="country" placeholder="United States" />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(4)} className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Secure payment processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{selectedServiceData?.name}</span>
                        <span>${selectedServiceData?.price} × {guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                      </div>
                      <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                        <span>Total:</span>
                        <span>${totalCost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select defaultValue="card">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      Back
                    </Button>
                    <Button className="flex-1 bg-gradient-hero text-white">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Booking (${totalCost})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary & Additional Services */}
          <div className="space-y-6">
            {/* Current Selection */}
            {selectedServiceData && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">{selectedServiceData.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedServiceData.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {guests} {guests === 1 ? 'guest' : 'guests'}
                      </span>
                      <span>{selectedServiceData.duration}</span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Cost:</span>
                        <span className="text-xl font-bold text-primary">${totalCost}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
                <CardDescription>Enhance your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Accommodation</h4>
                  <div className="space-y-2">
                    {hotels.slice(0, 2).map(hotel => (
                      <div key={hotel.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{hotel.name}</p>
                          <p className="text-xs text-muted-foreground">{hotel.category}</p>
                        </div>
                        <Button variant="outline" size="sm">Add ${hotel.price}</Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Transport</h4>
                  <div className="space-y-2">
                    {transport.slice(0, 2).map(trans => (
                      <div key={trans.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{trans.name}</p>
                          <p className="text-xs text-muted-foreground">{trans.duration}</p>
                        </div>
                        <Button variant="outline" size="sm">Add ${trans.price}</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+250 xxx xxx xxx</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>info@visitmusanze.com</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;