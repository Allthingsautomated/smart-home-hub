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
  Volume2,
  Wifi,
  Zap,
} from "lucide-react";
import { useLocation } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Services() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  const residentialServices = [
    {
      id: "smart-lighting",
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Lutron Caséta, RA3, and HomeWorks automation systems.",
    },
    {
      id: "home-security",
      icon: ShieldCheck,
      title: "Home Security",
      description: "Ring, Lorex, and Ubiquiti security solutions.",
    },
    {
      id: "climate-control",
      icon: Thermometer,
      title: "Climate Control",
      description: "Intelligent HVAC and temperature management.",
    },
    {
      id: "voice-integration",
      icon: Mic,
      title: "Voice Integration",
      description: "Siri, Alexa, and Josh.ai voice control.",
    },
    {
      id: "home-audio",
      icon: Volume2,
      title: "Home Audio",
      description: "Sonos and premium TV system installations.",
    },
    {
      id: "networks",
      icon: Wifi,
      title: "Networks",
      description: "Ubiquiti networking and connectivity solutions.",
    },
    {
      id: "tesla-panels",
      icon: Zap,
      title: "Tesla Electrical Panels",
      description: "Tesla Powerwall and electrical panel installations.",
    },
  ];

  const commercialServices = [
    {
      id: "commercial-automation",
      icon: Building2,
      title: "Building Automation",
      description: "Enterprise-level Lutron and automation systems.",
    },
    {
      id: "commercial-security",
      icon: ShieldCheck,
      title: "Security Solutions",
      description: "Commercial-grade security infrastructure.",
    },
    {
      id: "commercial-climate",
      icon: Thermometer,
      title: "Energy Management",
      description: "Optimize energy consumption and costs.",
    },
    {
      id: "commercial-networks",
      icon: Wifi,
      title: "Network Infrastructure",
      description: "Enterprise Ubiquiti networking solutions.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
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
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-primary">Services</h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Comprehensive automation solutions for residential and commercial properties.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20 px-4">
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
                {residentialServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.id}
                      onClick={() => { scrollToTop(); navigate(`/services/${service.id}`); }}
                      className="text-left hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Card className="border-none shadow-sm h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-6">
                            <IconComponent className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <div className="pointer-events-none">
                            <Button variant="outline" className="rounded-full">
                              See More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="commercial">
              <div className="grid md:grid-cols-2 gap-8">
                {commercialServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={service.id}
                      onClick={() => { scrollToTop(); navigate(`/services/${service.id}`); }}
                      className="text-left hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Card className="border-none shadow-sm h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-6">
                            <IconComponent className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <div className="pointer-events-none">
                            <Button variant="outline" className="rounded-full">
                              See More
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
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
                    onClick={() => handleNavigation("/")}
                    className="hover:opacity-100"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="hover:opacity-100"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:opacity-100"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="hover:opacity-100"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className="hover:opacity-100"
                  >
                    Blog
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
