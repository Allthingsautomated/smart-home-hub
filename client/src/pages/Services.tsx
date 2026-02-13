import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
  Smartphone,
  HomeIcon,
  Building2,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Services() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/NFtgaObIakoZmJFV.png"
                alt="All Things Automated Logo"
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">All Things Automated</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-primary transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/services")}
                className="text-primary font-semibold"
              >
                Services
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
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive smart home automation solutions for residential and
              commercial properties.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20">
        <div className="container">
          <Tabs defaultValue="residential" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 rounded-full h-12">
              <TabsTrigger value="residential" className="rounded-full">
                Residential
              </TabsTrigger>
              <TabsTrigger value="commercial" className="rounded-full">
                Commercial
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
                      voice control integration. Create the perfect ambiance for
                      any moment.
                    </p>
                    <div className="text-sm text-primary font-semibold">
                      Starting at $500
                    </div>
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
                      monitoring from anywhere.
                    </p>
                    <div className="text-sm text-primary font-semibold">
                      Starting at $1,200
                    </div>
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
                      climate zones, and energy-efficient temperature management
                      that learns your preferences.
                    </p>
                    <div className="text-sm text-primary font-semibold">
                      Starting at $800
                    </div>
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
                      Google Assistant, or Siri. Hands-free convenience at your
                      fingertips.
                    </p>
                    <div className="text-sm text-primary font-semibold">
                      Starting at $300
                    </div>
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
                      multi-room audio, and automated home theaters with seamless
                      integration.
                    </p>
                    <div className="text-sm text-primary font-semibold">
                      Starting at $2,000
                    </div>
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
                      system for complete home automation control and management.
                    </p>
                    <div className="text-sm text-primary font-semibold">
                      Custom Quote
                    </div>
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
                      control, and security systems for modern office spaces and
                      commercial buildings.
                    </p>
                    <div className="text-sm text-accent font-semibold">
                      Custom Quote
                    </div>
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
                      systems, access control, and 24/7 monitoring solutions with
                      professional support.
                    </p>
                    <div className="text-sm text-accent font-semibold">
                      Custom Quote
                    </div>
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
                      automated HVAC control, and efficiency optimization for
                      large facilities.
                    </p>
                    <div className="text-sm text-accent font-semibold">
                      Custom Quote
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="rounded-full"
              onClick={() => navigate("/contact")}
            >
              Get a Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Expert Installation</h3>
              <p className="text-muted-foreground">
                Our certified technicians have years of experience installing and
                integrating smart home systems with precision and care.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-muted-foreground">
                We're always available to help with maintenance, troubleshooting,
                and support whenever you need us.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Licensed & Insured</h3>
              <p className="text-muted-foreground">
                Fully licensed, bonded, and insured for your peace of mind and
                protection on every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today for a free consultation and custom quote for your
            smart home automation project.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/contact")}
          >
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/NFtgaObIakoZmJFV.png"
                  alt="All Things Automated Logo"
                  className="h-10 w-auto"
                />
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
                  <button
                    onClick={() => navigate("/")}
                    className="hover:opacity-100"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="hover:opacity-100"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:opacity-100"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hover:opacity-100"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@allthingsautomated.com</li>
                <li>Available 24/7</li>
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
