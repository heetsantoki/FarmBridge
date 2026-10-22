import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { 
  User, Mail, Phone, MapPin, Linkedin, Twitter, 
  Github, Globe, Calendar, Shield, Award, Clock, Users
} from 'lucide-react';

const AdminProfile = () => {
  return (
    <div className="min-h-screen w-full py-24 px-4 sm:px-6 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Information */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="overflow-hidden border border-border/40 bg-card/50">
              <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"></div>
              <div className="flex justify-center -mt-16">
                <img 
                  src="https://media-hosting.imagekit.io//523265c6844a4a6c/WhatsApp%20Image%202025-03-01%20at%2023.03.50_d2f3aaec.jpg?Expires=1835458465&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jEzgDXNo2Zc6RmGADKX~q~WuUZEdW4XSRFkLAMmYaYHOe0zwCQrF0CYo-v-E3R5FB6LkHKbALLytDl~JVkPRDdTzxy-uCgWimii65khMNRVj4Ji7s-2CfEBvKEs7ZVHTNgF~HnPv2uvM1U0p6TzZwSJ5zRd1bqxgaiRnAmsGvVjpzS6PO-PoXLnNO44kPUOGjzKUezlJxYYly9KGIc2DSaSgxtgHLPyBUlpeUulpwIzAbcuF8HnfqKeoy0zIywK3YGYVsPElp21mTymoKRLjaF2fIuDqh1FHvswDY~Zjh8OhQ6qLmIwADYLhJ9rw94BB8I7fRcaf~-2Ln~3ZS39NKw__" 
                  alt="Admin Profile"
                  className="h-32 w-32 rounded-full border-4 border-background animate-image-glow"
                />
              </div>
              <CardHeader className="text-center">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 mx-auto mb-2">Administrator</Badge>
                <CardTitle className="text-2xl font-medium">Makvana Mohit</CardTitle>
                <CardDescription>Senior System Administrator</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <p className="text-xl font-medium">124</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-medium">9.2k</p>
                    <p className="text-xs text-muted-foreground">Users</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-medium">4y</p>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-balance">makavanamohit558@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">+91 93131 67885</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-balance">Opposite to ram temple,Rohishala,Morbi-363650</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text -muted-foreground" />
                    <span className="text-sm">Joined January 2020</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-accent text-accent-foreground me-2 mb-2">System Management</Badge>
                <Badge className="bg-accent text-accent-foreground me-2 mb-2">User  Administration</Badge>
                <Badge className="bg-accent text-accent-foreground me-2 mb-2">Security</Badge>
                <Badge className="bg-accent text-accent-foreground me-2 mb-2">Database</Badge>
                <Badge className="bg-accent text-accent-foreground me-2 mb-2">Performance</Badge>
                <Badge className="bg-accent text-accent-foreground me-2 mb-2">Backup & Recovery</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="border border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <User  className="h-5 w-5 text-primary" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Dedicated system administrator with over 4 years of experience managing complex IT infrastructures and ensuring smooth operation of critical systems. Specialized in cloud architecture, security implementation, and performance optimization. Proven track record of reducing system downtime by 35% and implementing cost-effective solutions that saved the company $200,000 annually.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">System Administration</span>
                        <span className="text-sm text-muted-foreground">95%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Cloud Infrastructure</span>
                        <span className="text-sm text-muted-foreground">90%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Network Security</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Management</span>
                        <span className="text-sm text-muted-foreground">80%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font -medium">Virtualization</span>
                        <span className="text-sm text-muted-foreground">88%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Automation Scripts</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-border/40 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    Working Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Monday - Friday</span>
                    <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Saturday</span>
                    <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sunday</span>
                    <span className="text-sm font-medium">Closed</span>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-primary/10 text-primary">On Call 24/7 for Emergencies</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/40 bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Team Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback>BJ</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback>CL</AvatarFallback>
                    </Avatar>
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs">+5</div>
                  </div>
                  <p className="text-sm text-muted-foreground">Leading a team of 9 IT specialists across system administration, security, and database management departments.</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Connect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a href="#" className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-300">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-300">
                    <Twitter className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Twitter</span>
                  </a>
                  <a href="#" className="flex items-center gap- 2 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-300">
                    <Github className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-all duration-300">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Website</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AdminProfile };