'use client';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { PenTool, Users, Grid,Github, Twitter, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Link from "next/link";

export default function Home() {
  //alt img
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Excel.Draw
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-muted-foreground">
            Unleash Creativity in Spreadsheets
          </p>
          <Link href={'/auth'}>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"  >
            Get Started
          </Button>
          </Link>
          
          {/* Animated Grid Background */}
          <div className="mt-12 relative">
            <div className="w-full h-64 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 animate-pulse">
              <div className="absolute inset-0 bg-grid-white/10 bg-grid" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool className="h-8 w-8 text-purple-400" />,
                title: "Advanced Drawing Tools",
                description: "Create stunning visualizations directly in your spreadsheets"
              },
              {
                icon: <Grid className="h-8 w-8 text-blue-400" />,
                title: "Seamless Editing",
                description: "Edit your spreadsheets with powerful, intuitive tools"
              },
              {
                icon: <Users className="h-8 w-8 text-green-400" />,
                title: "Collaboration",
                description: "Work together in real-time with your team"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 border-white/10">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Showcase</h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-black/40 backdrop-blur-sm border-white/10">
                      {/* <Image
                        src={`https://images.unsplash.com/photo-167${index + 1}000000-example?auto=format&fit=crop&w=800&q=80`}
                        alt={`Showcase ${index + 1}`}
                        width={800} 
                        height={400}
                        className="w-full h-64 object-cover rounded-lg"
                      /> */}
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "Data Analyst",
                quote: "Excel.Draw transformed how I present data to my clients.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              },
              {
                name: "Sarah Johnson",
                role: "Product Manager",
                quote: "The collaborative features are game-changing for our team.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              },
              {
                name: "Mike Roberts",
                role: "Financial Advisor",
                quote: "Finally, a tool that makes spreadsheets exciting!",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-black/40 backdrop-blur-sm border-white/10">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg mb-4">"{testimonial.quote}"</p>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground">
            <p>&copy; 2024 Excel.Draw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}