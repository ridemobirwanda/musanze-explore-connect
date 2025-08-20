import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  User, 
  Bot, 
  Globe, 
  Loader2,
  HelpCircle,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language?: string;
}

const VirtualGuide = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
    { code: "sw", name: "Kiswahili", flag: "🇰🇪" }
  ];

  const quickQuestions = {
    en: [
      "What's the price for gorilla trekking?",
      "Where can I eat in Musanze?",
      "What should I pack for hiking?",
      "How do I get to Twin Lakes?"
    ],
    fr: [
      "Quel est le prix du trekking des gorilles?",
      "Où puis-je manger à Musanze?",
      "Que dois-je emporter pour la randonnée?",
      "Comment puis-je aller aux Lacs Jumeaux?"
    ],
    rw: [
      "Ni angahe gukurikirana ingagi?",
      "Nshobora kurya he muri Musanze?",
      "Nkwiye kutwara iki mu rugendo?",
      "Nigute nshobora kujya mu Buyaga bw'impanga?"
    ],
    sw: [
      "Bei ya kufuatilia nyani wa misitu ni ngapi?",
      "Ninaweza kula wapi Musanze?",
      "Ninabeba nini kwa kupanda?",
      "Ninawezaje kwenda Maziwa ya Mapambo?"
    ]
  };

  const welcomeMessages = {
    en: "Hello! I'm your virtual guide for Musanze. Ask me anything about gorilla trekking, attractions, hotels, restaurants, or travel tips!",
    fr: "Bonjour! Je suis votre guide virtuel pour Musanze. Demandez-moi n'importe quoi sur le trekking des gorilles, attractions, hôtels, restaurants ou conseils de voyage!",
    rw: "Muraho! Ndi umuyobozi waanyu wa kure muri Musanze. Mumbaze icyo aribobyose ku gukurikirana ingagi, ahantu h'ubwenge, hoteri, resitora, cyangwa inama z'urugendo!",
    sw: "Hujambo! Mimi ni mwongozi wako wa kinadharia wa Musanze. Niulize chochote kuhusu kufuatilia nyani wa misitu, mahali pa kuvutia, hoteli, mikahawa, au vidokezo vya kusafiri!"
  };

  useEffect(() => {
    // Add welcome message when language changes
    const welcomeMessage: Message = {
      id: `welcome-${selectedLanguage}-${Date.now()}`,
      content: welcomeMessages[selectedLanguage as keyof typeof welcomeMessages],
      sender: 'bot',
      timestamp: new Date(),
      language: selectedLanguage
    };
    
    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageContent?: string) => {
    const content = messageContent || inputMessage.trim();
    if (!content) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('virtual-guide', {
        body: { 
          message: content, 
          language: selectedLanguage 
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        language: data.language
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Virtual 
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Guide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant answers about Musanze attractions, prices, and travel tips in your preferred language
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chat with Your Guide
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col space-y-4">
              {/* Messages Area */}
              <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>

                      {message.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  Quick questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions[selectedLanguage as keyof typeof quickQuestions]?.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Musanze..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Popular Topics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => sendMessage("Tell me about gorilla trekking prices and booking")}>
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">Prices & Booking</h4>
              <p className="text-sm text-muted-foreground">Permits, costs, reservations</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => sendMessage("What are the top attractions in Musanze?")}>
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">Top Attractions</h4>
              <p className="text-sm text-muted-foreground">Parks, lakes, caves, villages</p>
            </Card>
            
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => sendMessage("How many days should I plan for Musanze?")}>
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold">Trip Planning</h4>
              <p className="text-sm text-muted-foreground">Itineraries, timing, logistics</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualGuide;