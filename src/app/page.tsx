
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8 animate-fade-in">
              <Zap className="h-4 w-4" />
              <span>AI-Powered Risk Prioritization Engine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-foreground mb-6 leading-tight">
              Real-time Global <br />
              <span className="text-primary">Intelligence & Monitoring</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
              Detect global shifts, environmental threats, and social tremors before they escalate. 
              The future of proactive risk management is here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-14 px-10 text-lg font-bold bg-primary shadow-xl shadow-primary/30 rounded-full group">
                <Link href="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-full border-2">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Features grid */}
        <section className="py-24 bg-card border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Verified Intelligence</h3>
                <p className="text-muted-foreground font-medium">
                  We aggregate data from over 1.4K verified sources, including NGOs, government feeds, and satellite data.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI Prioritization</h3>
                <p className="text-muted-foreground font-medium">
                  Advanced machine learning models categorize and prioritize risks based on impact, urgency, and history.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Global Scale</h3>
                <p className="text-muted-foreground font-medium">
                  Monitor risks across 195 countries with localized data visualization and real-time alerts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
