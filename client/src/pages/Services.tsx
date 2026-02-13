import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
  Home as HomeIcon,
  Building2,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Services() {
  const [, navigate] = useLocation();

  const residentialServices = [
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Automated lighting with scheduling and remote control.",
      price: "$1,500",
    },
    {
      icon: ShieldCheck,
      title: "Security Systems",
      description: "Advanced cameras, sensors, and monitoring.",
      price: "$2,500",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Intelligent HVAC and temperature management.",
      price: "$1,800",
    },
    {
      icon: Mic,
      title: "Voice Integration",
      description: "Alexa, Google Home, and voice automation.",
      price: "$800",
    },
  ];

  const commercialServices = [
    {
      icon: Building2,
      title: "Building Automation",
      description: "Enterprise-level automation systems.",
      price: "Custom",
    },
    {
      icon: ShieldCheck,
      title: "Security Solutions",
      description: "Commercial-grade security infrastructure.",
      price: "Custom",
    },
    {
      icon: Thermometer,
      title: "Energy Management",
      description: "Optimize energy consumption and costs.",
      price: "Custom",
    },
    {
      icon: Lightbulb,
      title: "Lighting Systems",
      description: "Smart lighting for offices and facilities.",
      price: "Custom",
    },
  ];

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
      <section className="py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">Services</h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Comprehensive automation solutions for residential and commercial properties.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-40 bg-background">
        <div className="container">
          <Tabs defaultValue="residential" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto mb-20 h-auto">
              <TabsTrigger value="residential" className="text-lg py-3">
                Residential
              </TabsTrigger>
              <TabsTrigger value="commercial" className="text-lg py-3">
                Commercial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="residential">
              <div className="grid md:grid-cols-2 gap-8">
                {residentialServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="border-none shadow-sm">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="text-3xl font-bold text-primary">
                          {service.price}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="commercial">
              <div className="grid md:grid-cols-2 gap-8">
                {commercialServices.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="border-none shadow-sm">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="text-3xl font-bold text-primary">
                          {service.price}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Let's find the perfect automation solution for your needs.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
            onClick={() => navigate("/contact")}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/NFtgaObIakoZmJFV.png"
                  alt="All Things Automated Logo"
                  className="h-10 w-auto"
                />
                <span className="text-lg font-bold">All Things Automated</span>
              </div>
              <p className="text-sm opacity-80">
                Intelligent automation for modern homes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigate</h4>
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
                    Contact
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
                <li>(555) 123-4567</li>
                <li>info@allthingsautomated.com</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
