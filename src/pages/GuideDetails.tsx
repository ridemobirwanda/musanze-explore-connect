import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin, Languages, Award, Calendar } from 'lucide-react';
import { ImageCarousel } from '@/components/ui/image-carousel';
import guideJean from '@/assets/guide-jean.jpg';
import guideMarie from '@/assets/guide-marie.jpg';
import guidePaul from '@/assets/guide-paul.jpg';

const guides = [
  {
    id: 1,
    name: "Jean Mukamana",
    specialty: "Wildlife & Gorilla Trekking",
    experience: "12 years",
    languages: ["English", "French", "Kinyarwanda", "Swahili"],
    rating: 4.9,
    price: 150,
    images: [guideJean, guideMarie, guidePaul],
    description: "Jean is a passionate wildlife expert with over a decade of experience leading gorilla trekking expeditions. His deep knowledge of the local ecosystem and gorilla families ensures an unforgettable experience.",
    expertise: ["Gorilla tracking", "Wildlife photography", "Conservation education"],
    availability: "Available",
    certifications: ["National Park Certified Guide", "First Aid Certified", "Wildlife Conservation Specialist"],
    tourTypes: ["Gorilla Trekking", "Golden Monkey Tracking", "Wildlife Photography Tours"],
    reviews: [
      { rating: 5, comment: "Jean made our gorilla trek absolutely incredible!", author: "Sarah M." },
      { rating: 5, comment: "Very knowledgeable and friendly guide.", author: "John D." }
    ]
  },
  {
    id: 2,
    name: "Marie Uwimana",
    specialty: "Cultural Tours & Heritage",
    experience: "8 years",
    languages: ["English", "French", "Kinyarwanda"],
    rating: 4.8,
    price: 120,
    images: [guideMarie, guidePaul, guideJean],
    description: "Marie brings Rwanda's rich cultural heritage to life through engaging storytelling and authentic village experiences. Her warm personality makes every tour memorable.",
    expertise: ["Cultural immersion", "Traditional crafts", "Local history"],
    availability: "Available",
    certifications: ["Cultural Heritage Guide", "Tourism Board Certified", "Language Specialist"],
    tourTypes: ["Cultural Village Tours", "Traditional Dance Experiences", "Craft Workshops"],
    reviews: [
      { rating: 5, comment: "Marie's knowledge of local culture is amazing!", author: "Emma L." },
      { rating: 5, comment: "Best cultural tour guide we've ever had.", author: "David R." }
    ]
  },
  {
    id: 3,
    name: "Paul Habimana",
    specialty: "Adventure & Hiking",
    experience: "10 years",
    languages: ["English", "Kinyarwanda", "French"],
    rating: 4.9,
    price: 140,
    images: [guidePaul, guideJean, guideMarie],
    description: "Paul is an experienced mountaineer who knows every trail in the Virunga Mountains. His expertise ensures safe and exciting hiking adventures for all skill levels.",
    expertise: ["Mountain climbing", "Trail navigation", "Outdoor safety"],
    availability: "Available",
    certifications: ["Mountain Guide Certified", "Wilderness First Responder", "Outdoor Safety Instructor"],
    tourTypes: ["Volcano Hiking", "Mountain Climbing", "Nature Trails"],
    reviews: [
      { rating: 5, comment: "Paul is an excellent and safe mountain guide!", author: "Michael B." },
      { rating: 5, comment: "Made our volcano hike challenging but achievable.", author: "Lisa K." }
    ]
  }
];

const GuideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = guides.find(g => g.id === Number(id));

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Guide Not Found</CardTitle>
            <CardDescription>The guide you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/book/guides')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
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
              <ImageCarousel images={guide.images} alt={guide.name} />
            </Card>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-4xl font-bold">{guide.name}</h1>
                  <p className="text-xl text-muted-foreground mt-1">{guide.specialty}</p>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  ${guide.price}/day
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{guide.rating}</span>
                </div>
                <Badge variant="outline">{guide.availability}</Badge>
                <Badge variant="outline">{guide.experience}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mt-4">{guide.description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary">{lang}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Areas of Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.expertise.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guide.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Tour Types Offered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {guide.tourTypes.map((type, index) => (
                    <Badge key={index} variant="outline">{type}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {guide.reviews.map((review, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">- {review.author}</span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate(`/book/guides?guide=${guide.id}`)}
            >
              Book {guide.name} - ${guide.price}/day
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
