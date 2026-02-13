/*
Design Philosophy: Soft Modernism with Organic Flow
- Blue and black color scheme from All Things Automated logo
- Rounded corners (16-24px) and soft shadows
- Flowing sections with curved dividers
- Generous whitespace and comfortable typography
*/

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Home as HomeIcon,
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
  Smartphone,
  Clock,
  Award,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "SmartHome Hub transformed our house into a truly intelligent living space. The installation was seamless, and the team was incredibly professional. We can now control everything from our phones!",
      author: "Sarah Johnson",
      role: "Homeowner",
    },
    {
      text: "The climate control system they installed has saved us so much on energy bills. Plus, the voice control integration works flawlessly with all our devices. Highly recommend!",
      author: "Michael Chen",
      role: "Residential Client",
    },
    {
      text: "We upgraded our entire office building with their smart automation solutions. The security features and energy management have been game-changers for our business.",
      author: "Emily Rodriguez",
      role: "Business Owner",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scrolling Banner */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="mx-8">Certified & Insured</span>
          <span className="mx-8">•</span>
          <span className="mx-8">24/7 Support Available</span>
          <span className="mx-8">•</span>
          <span className="mx-8">15+ Years Experience</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Smart Home Experts</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Certified & Insured</span>
          <span className="mx-8">•</span>
          <span className="mx-8">24/7 Support Available</span>
          <span className="mx-8">•</span>
          <span className="mx-8">15+ Years Experience</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Smart Home Experts</span>
          <span className="mx-8">•</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">All Things Automated</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/services")}
                className="hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-primary transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-primary transition-colors"
              >
                Contact
              </button>
              <Button className="rounded-full">Book Now</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/G41wwZxJTdeFqWuVf8Z88y/sandbox/2Qru1urV1BQeECqkP4Y3oV-img-1_1770965033000_na1fn_aGVyby1zbWFydC1ob21l.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRzQxd3daeEpUZGVGcVd1VmY4Wjg4eS9zYW5kYm94LzJRcnUxdXJWMUJRZUVDcWtQNFkzb1YtaW1nLTFfMTc3MDk2NTAzMzAwMF9uYTFmbl9hR1Z5YnkxemJXRnlkQzFvYjIxbC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=f1mlgETafZl4~p-jaIKeKSeHstqmRF50WMC8kcY4dnvXIpf-c9ogcZl-WCnerD8YDCTPli49jmSb82DT8tGTyRsH3x9TlTvjX84vf7xOyxybKYJ3jMoKsXs~35uq9lFyNOE1imvkcCaOovAFFus5mM7NwFfqazGaD~KshfyhD4LSckpgg7lupWJCpjC1PHXq5b6NFhCRlp2RLiuluc4Wv-RXsdxaEy59mLIsacZuuEx7m~SWPby-0uP9UJsWjce4tMpuWTFau6aKnoUGZDMxLRMZsL-pjT08dMTxPouBTv7EvNO6jx7OQ28jDYtAp1kA-6P5Gnu7FUFybqScYkOvKA__')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>
        <div className="container relative z-10 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Licensed. Bonded. Insured.</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Step Into The World Of Smart Homes With Ease
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              All Things Automated delivers comprehensive home automation solutions that
              provide comfort, security, and energy efficiency for modern living.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90">
                Book a Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4 text-primary">
                <Clock className="w-5 h-5" />
                <span className="font-medium">24/7 Support Available</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Automating Homes Across the Nation
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">                All Things Automated is a certified and insured smart home integration
                company. Since our founding, we've been proud to serve homeowners
                and businesses with dependable, high-quality automation solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With more than 15 years of hands-on experience, our team brings
                specialized skills and genuine care to every project. From lighting
                and climate control to security and entertainment systems, All Things
                Automated delivers solutions built on trust and long-term relationships.         </p>
              <Button className="rounded-full" size="lg">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Modern smart home interior"
                className="rounded-3xl shadow-soft w-full"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="rounded-2xl shadow-soft border-2 border-dashed">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">
                  Years of Experience in Home Automation
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-soft border-2 border-dashed">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Support Available
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-soft border-2 border-dashed">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">
                  Customer Satisfaction
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-soft border-2 border-dashed">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Homes Automated
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Certified Installers</h3>
                <p className="text-sm text-muted-foreground">
                  Fully certified to perform smart home installations, ensuring every
                  project is safe, legal, and reliable.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Licensed, Bonded, and Insured</h3>
                <p className="text-sm text-muted-foreground">
                  Fully certified to perform smart home work across the region,
                  ensuring every project is safe, legal, and reliable.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">15+ Years of Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Extensive experience delivering high-quality automation solutions
                  for residential and commercial clients.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Residential & Commercial</h3>
                <p className="text-sm text-muted-foreground">
                  Skilled in everything from home automation to large-scale
                  commercial and municipal projects.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4 text-primary">
              <Smartphone className="w-5 h-5" />
              <span className="font-medium">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comprehensive Smart Home Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              All Things Automated delivers safe, reliable, and innovative automation
              solutions for homes and businesses nationwide.      </p>
          </div>

          <Tabs defaultValue="residential" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 rounded-full h-12">
              <TabsTrigger value="residential" className="rounded-full">
                Residential Services
              </TabsTrigger>
              <TabsTrigger value="commercial" className="rounded-full">
                Commercial Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="residential">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Lightbulb className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Smart Lighting</h3>
                    <p className="text-muted-foreground mb-4">
                      Transform your home with intelligent lighting solutions,
                      including color-changing bulbs, automated schedules, and
                      voice control integration.
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Home Security</h3>
                    <p className="text-muted-foreground mb-4">
                      Protect your home with smart security systems, video
                      doorbells, cameras, and automated locks with remote
                      monitoring.
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Thermometer className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Climate Control</h3>
                    <p className="text-muted-foreground mb-4">
                      Enjoy perfect comfort with smart thermostats, automated
                      climate zones, and energy-efficient temperature management.
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Mic className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Voice Control</h3>
                    <p className="text-muted-foreground mb-4">
                      Control your entire home with voice commands through Alexa,
                      Google Assistant, or Siri integration.
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Smartphone className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Entertainment Systems
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Create the ultimate entertainment experience with smart TVs,
                      multi-room audio, and automated home theaters.
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <HomeIcon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Whole Home Integration
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Seamlessly connect all your smart devices into one unified
                      system for complete home automation control.
                    </p>
                    <Button variant="link" className="p-0 text-primary">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="commercial">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Office Automation
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Enhance productivity with automated lighting, climate
                      control, and security systems for modern office spaces.
                    </p>
                    <Button variant="link" className="p-0 text-accent">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Commercial Security
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Protect your business with enterprise-grade security
                      systems, access control, and 24/7 monitoring solutions.
                    </p>
                    <Button variant="link" className="p-0 text-accent">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                      <Thermometer className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      Energy Management
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Reduce operating costs with smart energy monitoring,
                      automated HVAC control, and efficiency optimization.
                    </p>
                    <Button variant="link" className="p-0 text-accent">
                      Learn More →
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="rounded-3xl shadow-soft">
              <CardContent className="p-12">
                <div className="text-center">
                  <p className="text-xl italic text-muted-foreground mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="font-semibold text-lg">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center items-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? "bg-primary w-8"
                        : "bg-muted"
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get In Touch
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Ready to transform your home with smart automation? Contact us
                today for a free consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="opacity-90">(555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="opacity-90">info@smarthomehub.com</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Our Location</div>
                    <div className="opacity-90">
                      123 Smart Street, Tech City, TC 12345
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-3xl shadow-soft">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="rounded-xl mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="rounded-xl mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="rounded-xl mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl mt-2">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">⚡ Urgent</SelectItem>
                        <SelectItem value="soon">🔧 Soon</SelectItem>
                        <SelectItem value="routine">🗓️ Routine</SelectItem>
                        <SelectItem value="info">💬 Just looking for info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Service Type</Label>
                    <RadioGroup defaultValue="residential" className="mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="residential" id="residential" />
                        <Label htmlFor="residential">Residential</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="commercial" id="commercial" />
                        <Label htmlFor="commercial">Commercial</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="service">Service Needed</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl mt-2">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lighting">Smart Lighting</SelectItem>
                        <SelectItem value="security">Home Security</SelectItem>
                        <SelectItem value="climate">Climate Control</SelectItem>
                        <SelectItem value="voice">Voice Control</SelectItem>
                        <SelectItem value="entertainment">
                          Entertainment Systems
                        </SelectItem>
                        <SelectItem value="integration">
                          Whole Home Integration
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      className="rounded-xl mt-2 min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-xl"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <HomeIcon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">All Things Automated</span>
              </div>
              <p className="text-sm opacity-80">
                Your trusted partner for intelligent home automation solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <a href="#about" className="hover:opacity-100">
                    About
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:opacity-100">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:opacity-100">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:opacity-100">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Residential Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
                <li>Entertainment Systems</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Commercial Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Office Automation</li>
                <li>Commercial Security</li>
                <li>Energy Management</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
