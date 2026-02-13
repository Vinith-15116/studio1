"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Shield, 
  Award,
  Clock,
  ExternalLink,
  Activity,
  Loader2
} from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase, updateDocumentNonBlocking } from "@/firebase";
import { doc, collection, query, where, limit } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const profileAvatar = PlaceHolderImages.find(img => img.id === 'profile-avatar');

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, "users", user.uid);
  }, [firestore, user?.uid]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc(userDocRef);

  const userPulsesQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, "problems"),
      where("createdBy", "==", user.uid),
      limit(5)
    );
  }, [firestore, user?.uid]);

  const { data: userPulses, isLoading: isPulsesLoading } = useCollection(userPulsesQuery);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    bio: ""
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        location: profileData.location || "",
        bio: profileData.bio || ""
      });
    }
  }, [profileData]);

  const handleSave = () => {
    if (!userDocRef) return;
    
    updateDocumentNonBlocking(userDocRef, {
      ...formData,
      updatedAt: new Date().toISOString()
    });
    
    toast({
      title: "Profile Updated",
      description: "Your information has been synced across the Pulse network.",
    });
  };

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <Shield className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">Please sign in to view your profile and pulses.</p>
          <Button asChild>
            <a href="/login">Sign In</a>
          </Button>
        </main>
      </div>
    );
  }

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
                      {formData.name?.substring(0, 2).toUpperCase() || "AJ"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold font-headline">{formData.name || "Risk Analyst"}</h2>
                  <p className="text-muted-foreground font-medium text-sm">Verified Pulse Contributor</p>
                  
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-bold">
                      ELITE
                    </Badge>
                    <Badge variant="outline" className="font-bold">
                      Node Vetted
                    </Badge>
                  </div>
                </div>

                <Separator className="my-2" />
                
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {formData.location || "Global Node"}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Security level: Auth 2.0
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" /> Contributions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Verified Pulses</span>
                  <span className="text-sm font-bold">{userPulses?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Global Impact</span>
                  <span className="text-sm font-bold">High</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl bg-card">
              <CardHeader>
                <CardTitle className="font-bold">Node Settings</CardTitle>
                <CardDescription className="font-medium">Update your identification and bio for the global intelligence network.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider">Full Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-muted/30 h-11 border-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-wider">Email (Locked)</Label>
                    <Input value={user?.email || ""} readOnly className="bg-muted/10 h-11 border-muted cursor-not-allowed opacity-70" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-wider">Primary Node Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="bg-muted/30 h-11 border-muted" />
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-wider">Professional Bio</Label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-muted bg-muted/30 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button variant="ghost" className="font-bold">Discard</Button>
                <Button onClick={handleSave} className="bg-primary font-bold shadow-lg shadow-primary/20">Sync Profile</Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <h3 className="text-xl font-bold font-headline flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> My Recent Pulses
              </h3>
              
              {isPulsesLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : userPulses && userPulses.length > 0 ? (
                userPulses.map((pulse) => (
                  <Card key={pulse.id} className="border-none shadow-md bg-card hover:shadow-lg transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-[10px] font-bold uppercase">{pulse.status}</Badge>
                            <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                              <Clock className="h-3 w-3" /> Reported {new Date(pulse.createdAt).toLocaleDateString()}
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
                ))
              ) : (
                <Card className="border-none shadow-md bg-card p-10 text-center">
                  <p className="text-muted-foreground font-medium italic">You haven't submitted any pulse reports yet.</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
