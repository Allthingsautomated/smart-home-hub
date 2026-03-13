import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
  Building2,
  Volume2,
  Wifi,
  Zap,
  Leaf,
} from "lucide-react";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import PageFooter from "@/components/PageFooter";
import { ROUTES } from "@/lib/routes";

export default function Services() {
  const [, navigate] = useLocation();

  const residentialServices = [
    {
      id: "smart-lighting",
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Lutron Caséta, RA3, and HomeWorks automation systems.",
      route: ROUTES.smartLighting,
    },
    {
      id: "home-security",
      icon: ShieldCheck,
      title: "Home Security",
      description: "Ring, Lorex, and Ubiquiti security solutions.",
      route: ROUTES.homeSecurity,
    },
    {
      id: "climate-control",
      icon: Thermometer,
      title: "Climate Control",
      description: "Intelligent HVAC and temperature management.",
      route: ROUTES.climateControl,
    },
    {
      id: "voice-integration",
      icon: Mic,
      title: "Voice Integration",
      description: "Siri, Alexa, and Josh.ai voice control.",
      route: ROUTES.voiceIntegration,
    },
    {
      id: "home-audio",
      icon: Volume2,
      title: "Home Audio",
      description: "Sonos and premium TV system installations.",
      route: ROUTES.homeAudio,
    },
    {
      id: "networks",
      icon: Wifi,
      title: "Networks",
      description: "Ubiquiti networking and connectivity solutions.",
      route: ROUTES.networks,
    },
    {
      id: "tesla-panels",
      icon: Zap,
      title: "Tesla Electrical Panels",
      description: "Tesla Powerwall and electrical panel installations.",
      route: ROUTES.teslaPanels,
    },
    {
      id: "landscape-lighting",
      icon: Leaf,
      title: "Landscape Lighting",
      description: "Professional outdoor lighting design and installation.",
      route: ROUTES.landscapeLighting,
    },
  ];

  const commercialServices = [
    {
      id: "commercial-automation",
      icon: Building2,
      title: "Building Automation",
      description: "Enterprise-level Lutron and automation systems.",
      route: ROUTES.commercialAutomation,
    },
    {
      id: "commercial-security",
      icon: ShieldCheck,
      title: "Security Solutions",
      description: "Commercial-grade security infrastructure.",
      route: ROUTES.commercialSecurity,
    },
    {
      id: "commercial-climate",
      icon: Thermometer,
      title: "Energy Management",
      description: "Optimize energy consumption and costs.",
      route: ROUTES.commercialClimate,
    },
    {
      id: "commercial-networks",
      icon: Wifi,
      title: "Network Infrastructure",
      description: "Enterprise Ubiquiti networking solutions.",
      route: ROUTES.commercialNetworks,
    },
    {
      id: "landscape-lighting-commercial",
      icon: Leaf,
      title: "Landscape Lighting",
      description: "Commercial outdoor lighting systems and design.",
      route: ROUTES.landscapeLighting,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ServicePageHeader />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-background border-b border-border/40">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-foreground">Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive automation solutions for residential and commercial properties.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-20 px-4 bg-background">
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
                    <button
                      key={service.id}
                      onClick={() => navigate(service.route)}
                      className="text-left hover:opacity-80 transition-opacity cursor-pointer group"
                    >
                      <Card className="border border-border shadow-sm h-full hover:shadow-md transition-shadow bg-card">
                        <CardContent className="p-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all">
                            <IconComponent className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-foreground">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <Button className="w-full">
                            Learn More →
                          </Button>
                        </CardContent>
                      </Card>
                    </button>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="commercial">
              <div className="grid md:grid-cols-2 gap-8">
                {commercialServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => navigate(service.route)}
                      className="text-left hover:opacity-80 transition-opacity cursor-pointer group"
                    >
                      <Card className="border border-border shadow-sm h-full hover:shadow-md transition-shadow bg-card">
                        <CardContent className="p-8">
                          <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all">
                            <IconComponent className="w-8 h-8 text-accent" />
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-foreground">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <Button className="w-full">
                            Learn More →
                          </Button>
                        </CardContent>
                      </Card>
                    </button>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Let's find the perfect automation solution for your needs.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold"
            onClick={() => navigate(ROUTES.contact)}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
