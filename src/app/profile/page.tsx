"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  MapPin, 
  Shield, 
  Bell, 
  Key, 
  Settings, 
  Activity,
  Award,
  Clock,
  ExternalLink
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PROBLEMS } from "@/lib/mock-data";

export default function ProfilePage() {
  const profileAvatar = PlaceHolderImages.find(img => img.id === 'profile-avatar');
  const userPulses = PROBLEMS.slice(0, 2); // Mock: user's submitted pulses

  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@problempulse.io",
    location: "Stockholm, Sweden",
    bio: "Global risk analyst focused on environmental impact and sustainable infrastructure."
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar / Brief Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl overflow-hidden bg-card">
              <div className="h-24 bg-gradient-to-r from-primary to-accent" />
              <CardContent className="pt-0 relative">
                <div className="flex flex-col items-center -translate-y-12">
                  <Avatar className="h-24 w-24 border-4 border-card shadow-lg mb-4">
                    <AvatarImage src={profileAvatar?.imageUrl} alt={formData.name} data-ai-hint={profileAvatar?.imageHint} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      AJ
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold font-headline">{formData.name}</h2>
                  <p className="text-muted-foreground font-medium text-sm">Senior Risk Analyst</p>
                  
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-bold">
                      PRO
                    </Badge>
                    <Badge variant="outline" className="font-bold">
                      Verified
                    </Badge>
                  </div>
                </div>

                <Separator className="my-2" />
                
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    {formData.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {formData.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Security Level: Alpha
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" /> Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Accuracy Score</span>
                  <span className="text-sm font-bold">98.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Total Impact</span>
                  <span className="text-sm font-bold">4.2M Lives</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Verified Reports</span>
                  <span className="text-sm font-bold">142</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="font-bold">Account Settings</CardTitle>
                <CardDescription className="font-medium">Manage your public profile and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider">Full Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-muted/30 h-11 border-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider">Email Address</Label>
                    <Input value={formData.email} readOnly className="bg-muted/10 h-11 border-muted cursor-not-allowed opacity-70" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-wider">Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="bg-muted/30 h-11 border-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-wider">Bio</Label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-muted bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="ghost" className="font-bold">Cancel</Button>
                <Button className="bg-primary font-bold shadow-lg shadow-primary/20">Save Changes</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xl font-bold font-headline flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> Recent Activity
              </h3>
              
              {userPulses.map((pulse) => (
                <Card key={pulse.id} className="border-none shadow-md bg-card hover:shadow-lg transition-all group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-[10px] font-bold uppercase">{pulse.status}</Badge>
                          <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                            <Clock className="h-3 w-3" /> 2 days ago
                          </span>
                        </div>
                        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{pulse.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{pulse.description}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full font-bold h-12 border-muted hover:bg-muted/50">
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
