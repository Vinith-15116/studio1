
"use client";

import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Shield, 
  Activity, 
  MapPin, 
  Mail, 
  Search, 
  Filter,
  Loader2,
  Lock,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { collection } from "firebase/firestore";
import { useState } from "react";
import Link from "next/link";

export default function NetworkPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [searchQuery, setSearchQuery] = useState("");

  const usersRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, "users");
  }, [firestore, user]);

  const { data: networkUsers, isLoading: isUsersLoading } = useCollection(usersRef);

  const filteredUsers = (networkUsers || []).filter((u) => {
    const search = searchQuery.toLowerCase();
    return u.name?.toLowerCase().includes(search) || 
           u.email?.toLowerCase().includes(search) ||
           u.role?.toLowerCase().includes(search);
  });

  if (isUserLoading) {
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
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <Lock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Restricted Access</h2>
            <p className="text-muted-foreground mb-6">The analyst directory is only available to verified network nodes.</p>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight font-headline mb-2 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" /> Pulse Network
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Directory of verified global intelligence analysts and regional nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">Network Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">Active Nodes</span>
                  <Badge variant="secondary" className="font-bold">{networkUsers?.length || 0}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">Uptime</span>
                  <span className="text-xs font-bold text-green-500 flex items-center gap-1">
                    <Activity className="h-3 w-3" /> 99.9%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 mb-4 opacity-50" />
                <h3 className="font-bold mb-2">Security Advisory</h3>
                <p className="text-xs opacity-90 leading-relaxed">
                  All node data is encrypted. Use the Pulse ID to verify reports in the global database.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search network nodes..." 
                  className="pl-10 h-11 bg-card border-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-11 font-bold">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>

            <Card className="border-none shadow-xl bg-card overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold text-xs uppercase">Analyst</TableHead>
                    <TableHead className="font-bold text-xs uppercase">Role</TableHead>
                    <TableHead className="font-bold text-xs uppercase">Location</TableHead>
                    <TableHead className="font-bold text-xs uppercase">Pulse ID</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isUsersLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20">
                        <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground">Synchronizing with node network...</span>
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <TableRow key={u.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                                {u.name?.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-sm leading-none mb-1">{u.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {u.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={u.isAdmin ? "default" : "outline"} className="text-[10px] font-bold">
                            {u.role || "Analyst"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-medium text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-primary" />
                            {u.location || "Global"}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-[10px] text-muted-foreground">
                          {u.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-20 text-muted-foreground font-medium">
                        No nodes found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
