"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Send, Loader2, AlertCircle } from "lucide-react";
import { generateRiskPrioritizationRecommendation } from "@/ai/flows/generate-risk-prioritization-recommendation";
import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function InnovatePage() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{ status: string; explanation: string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    tags: "",
  });

  const handleAIAnalyze = async () => {
    if (!formData.title || !formData.description) return;
    
    setLoading(true);
    try {
      const result = await generateRiskPrioritizationRecommendation({
        title: formData.title,
        description: formData.description,
        location: formData.location || "Global",
        category: formData.category || "General",
        tags: formData.tags.split(",").map(t => t.trim()),
      });
      setRecommendation({
        status: result.prioritizationStatus,
        explanation: result.explanation,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline mb-4">Innovation Portal</h1>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">
            Submit new risk indicators and let our AI engine prioritize them using global context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 border-none shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="font-bold">Risk Submission</CardTitle>
              <CardDescription className="font-medium">Provide detailed context for the detected risk.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-wider">Title</Label>
                <Input 
                  placeholder="e.g. Critical Water Shortage in Cape Town" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-muted/30 h-11 border-muted"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-wider">Description</Label>
                <Textarea 
                  placeholder="Describe the nature of the risk, affected populations, and current trends..."
                  className="min-h-[150px] bg-muted/30 border-muted"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-wider">Category</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val})}>
                    <SelectTrigger className="bg-muted/30 h-11 border-muted">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.filter(c => c !== "All").map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-wider">Location</Label>
                  <Input 
                    placeholder="City, Country, or Region"
                    className="bg-muted/30 h-11 border-muted"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-wider">Tags (comma separated)</Label>
                <Input 
                  placeholder="#Water, #Climate, #Urban" 
                  className="bg-muted/30 h-11 border-muted"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={handleAIAnalyze} 
                  disabled={loading || !formData.title || !formData.description}
                  className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg shadow-accent/20"
                >
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                  AI Analyze Risk
                </Button>
                <Button variant="default" className="flex-1 h-12 bg-primary font-bold">
                  <Send className="mr-2 h-5 w-5" />
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                  <Sparkles className="h-4 w-4" /> AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendation ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Recommended Status</span>
                      <Badge className={cn(
                        "w-fit text-sm font-bold px-3 py-1",
                        recommendation.status === "CRITICAL" ? "bg-red-500" : 
                        recommendation.status === "WARNING" ? "bg-orange-500" : "bg-blue-500"
                      )}>
                        {recommendation.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Expert Reasoning</span>
                      <p className="text-sm font-medium italic leading-relaxed text-foreground/80">
                        "{recommendation.explanation}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <AlertCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground font-medium italic">
                      Fill out the form and click "AI Analyze Risk" to get a prioritization recommendation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card overflow-hidden">
              <div className="h-2 bg-primary" />
              <CardContent className="p-6">
                <h4 className="font-bold text-sm mb-4">Submission Guidelines</h4>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-xs font-medium text-muted-foreground">
                    <span className="text-primary font-bold">01.</span> Use factual, evidence-based descriptions.
                  </li>
                  <li className="flex gap-2 text-xs font-medium text-muted-foreground">
                    <span className="text-primary font-bold">02.</span> Include specific data points where possible.
                  </li>
                  <li className="flex gap-2 text-xs font-medium text-muted-foreground">
                    <span className="text-primary font-bold">03.</span> Tagging helps our global network connect related pulses.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
