"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StatsCard from "@/components/dashboard/StatsCard";
import ProblemCard from "@/components/dashboard/ProblemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  ShieldCheck, 
  Radar, 
  Globe, 
  Plus,
  Zap,
  Activity,
  Loader2,
  Lock
} from "lucide-react";
import { STATS, CATEGORIES } from "@/lib/mock-data";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection } from "firebase/firestore";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const firestore = useFirestore();

  // Stabilize the reference and only provide it if the user is authenticated.
  // This prevents 'Missing or insufficient permissions' errors for unauthenticated visitors
  // since the Firestore rules require an active session for the 'problems' collection.
  const problemsRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, "problems");
  }, [firestore, user]);

  const { data: problems, isLoading: isProblemsLoading } = useCollection(problemsRef);

  const filteredProblems = (problems || []).filter((p) => {
    const matchesTab = activeTab === "All" || p.category === activeTab;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const statIcons = [AlertTriangle, ShieldCheck, Zap, Radar];

  // Show global loading state while determining auth status
  if (isUserLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Authenticating with Pulse Node...</p>
          </div>
        </main>
      </div>
    );
  }

  // If the user isn't logged in, show a restricted dashboard view with a call to action
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-20 max-w-2xl text-center">
          <div className="bg-card p-12 rounded-3xl shadow-xl border border-border">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-extrabold mb-4 font-headline">Secure Access Required</h1>
            <p className="text-muted-foreground text-lg mb-8 font-medium">
              The global risk dashboard is restricted to verified intelligence analysts. 
              Please sign in to monitor real-time pulses and contribute findings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary font-bold px-8">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold px-8">
                <Link href="/signup">Join the Network</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground font-headline mb-2">
                Problem Pulse Dashboard
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl font-medium">
                Global AI detection & real-time risk prioritization. Monitoring 1.4K verified sources.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/20">
                <Link href="/innovate">
                  <Plus className="mr-2 h-4 w-4" />
                  New Pulse
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat, idx) => (
            <StatsCard 
              key={stat.label}
              label={stat.label}
              value={stat.value}
              growth={stat.growth}
              icon={statIcons[idx]}
            />
          ))}
        </section>

        <section className="mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search active pulses..." 
                className="pl-10 h-11 bg-card border-none shadow-sm focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full lg:w-auto">
              <Button variant="outline" size="sm" className="bg-card font-semibold h-9">
                <Filter className="mr-2 h-4 w-4" /> Urgency
              </Button>
              <Button variant="outline" size="sm" className="bg-card font-semibold h-9">
                Impact
              </Button>
              <Button variant="outline" size="sm" className="bg-card font-semibold h-9">
                Newest
              </Button>
              <div className="h-6 w-px bg-border mx-2 hidden sm:block" />
              <Button variant="secondary" size="sm" className="font-semibold h-9">
                <Radar className="mr-2 h-4 w-4" /> Radar View
              </Button>
            </div>
          </div>

          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent h-auto p-0 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-full px-5 py-2 text-sm font-bold border border-transparent transition-all hover:bg-muted"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </section>

        <section className="mb-12">
          {isProblemsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Synchronizing with global pulse nodes...</p>
            </div>
          ) : filteredProblems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border-2 border-dashed border-border/60">
              <Globe className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold mb-2">No active pulses found</h3>
              <p className="text-muted-foreground">Adjust your filters or try a different search term.</p>
              <Button variant="link" onClick={() => {setActiveTab("All"); setSearchQuery("");}} className="mt-4 text-primary font-bold">
                Clear all filters
              </Button>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t bg-card py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Activity className="h-5 w-5" />
            <span className="font-bold tracking-tight">ProblemPulse</span>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            © 2025 ProblemPulse Global Monitoring. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
