import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Languages, Volume2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const commonPhrases = [
  { en: "Hello", rw: "Muraho", fr: "Bonjour" },
  { en: "Thank you", rw: "Murakoze", fr: "Merci" },
  { en: "How much?", rw: "Ni angahe?", fr: "Combien?" },
  { en: "Where is...?", rw: "Hehe...?", fr: "Où est...?" },
  { en: "I need help", rw: "Nkeneye ubufasha", fr: "J'ai besoin d'aide" },
  { en: "Excuse me", rw: "Mbabarira", fr: "Excusez-moi" }
];

const TranslationHelper = () => {
  const [inputText, setInputText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("rw");
  const [translatedText, setTranslatedText] = useState("");
  const { toast } = useToast();

  const handleTranslate = () => {
    // Simulate translation (in real app, this would call a translation API)
    const phrase = commonPhrases.find(p => p[fromLang as keyof typeof p]?.toLowerCase() === inputText.toLowerCase());
    if (phrase) {
      setTranslatedText(phrase[toLang as keyof typeof phrase] || "Translation not available");
    } else {
      setTranslatedText("Translation service would be integrated here");
    }
    
    toast({
      title: "Translated!",
      description: "Text has been translated successfully.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <Languages className="inline-block mr-4 h-12 w-12 text-primary" />
            Translation <span className="text-primary">Helper</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Communicate easily with locals using our translation tool and common phrases
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Quick Translator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Select value={fromLang} onValueChange={setFromLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="rw">Kinyarwanda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Select value={toLang} onValueChange={setToLang}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="rw">Kinyarwanda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Enter text to translate..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="text-lg py-3"
                />
                <Button 
                  onClick={handleTranslate}
                  className="w-full bg-gradient-hero text-white shadow-soft hover:shadow-lg transition-all duration-300"
                  disabled={!inputText.trim()}
                >
                  Translate
                </Button>
              </div>

              {translatedText && (
                <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">{translatedText}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => speakText(translatedText)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(translatedText)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Common Phrases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {commonPhrases.map((phrase, index) => (
                  <div key={index} className="p-4 bg-secondary/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{phrase.en}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakText(phrase.en)}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span><Badge variant="outline">RW</Badge> {phrase.rw}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(phrase.rw)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span><Badge variant="outline">FR</Badge> {phrase.fr}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(phrase.fr)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TranslationHelper;