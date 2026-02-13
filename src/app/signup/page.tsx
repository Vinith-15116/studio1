
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth, useUser, initiateEmailSignUp, setDocumentNonBlocking, useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !isUserLoading) {
      // Create user document if it doesn't exist
      if (firestore && user.uid) {
        const userRef = doc(firestore, "users", user.uid);
        setDocumentNonBlocking(userRef, {
          id: user.uid,
          name: name || user.displayName || "Anonymous User",
          email: user.email,
          role: "Analyst",
          isAdmin: false,
          location: "Global Node",
          createdAt: new Date().toISOString(),
        }, { merge: true });
      }
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router, firestore, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords mismatch",
        description: "Please ensure your passwords match.",
      });
      return;
    }

    try {
      initiateEmailSignUp(auth, email, password);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Activity className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight font-headline">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground font-medium mt-1">
            Join the Pulse and start monitoring global risks today.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold text-xs uppercase tracking-wider">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 border-muted bg-muted/30 focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-xs uppercase tracking-wider">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-muted bg-muted/30 focus:bg-white transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-bold text-xs uppercase tracking-wider">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-muted bg-muted/30 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="font-bold text-xs uppercase tracking-wider">Confirm</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 border-muted bg-muted/30 focus:bg-white transition-all"
                />
              </div>
            </div>
            
            <div className="py-2 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
              <p className="text-[11px] text-muted-foreground font-medium">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-primary to-primary/80 font-bold shadow-lg shadow-primary/20"
              disabled={isUserLoading}
            >
              {isUserLoading ? "Creating account..." : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-8 pt-4 justify-center text-sm">
          <span className="text-muted-foreground font-medium mr-1">Already have an account?</span>
          <Link href="/login" className="text-primary font-bold hover:underline">Sign in instead</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
