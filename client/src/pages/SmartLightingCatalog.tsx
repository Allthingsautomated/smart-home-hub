import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Zap } from "lucide-react";
import { useLocation } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function SmartLightingCatalog() {
  const [, navigate] = useLocation();

  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  const systemDesignServices = [
    "Lighting layout planning",
    "Load calculations and circuit planning",
    "Zoning and dimming strategy",
    "Fixture selection guidance",
    "Transformer sizing and voltage drop planning",
    "Scalable system architecture for future expansion",
  ];

  const controlSystems = [
    "Installation and programming of Lutron Caséta",
    "Installation and programming of Lutron RA2",
    "Installation and programming of Lutron PowPak",
    "Smart dimmer installation",
    "Smart switches and keypads",
    "Pico remote configuration",
    "Scene creation and automation scheduling",
    "App-based lighting control setup",
    "Remote access configuration",
  ];

  const residentialServices = [
    "Interior recessed lighting systems",
    "Under-cabinet lighting systems",
    "Accent and architectural lighting",
    "Outdoor façade lighting",
    "Pool cage lighting",
    "Post and pathway lighting",
    "Smart exterior lighting control",
    "Dedicated lighting zones",
  ];

  const commercialServices = [
    "Warehouse high-bay LED systems",
    "Commercial wall pack installation (dusk-to-dawn and selectable CCT)",
    "Parking lot and perimeter lighting",
    "Restaurant and retail lighting upgrades",
    "Lighting retrofits and energy-efficient conversions",
    "Lighting control automation for commercial spaces",
  ];

  const programmingServices = [
    "System startup and verification",
    "Smart scene configuration",
    "Dimmer calibration",
    "Schedule programming",
    "Device pairing and testing",
    "Final system walkthrough and client training",
  ];

  const infrastructureServices = [
    "Dedicated smart lighting circuits",
    "Lighting control panel integration",
    "Low-voltage control wiring",
    "Smart dimmer load balancing",
    "Whole-home lighting control architecture",
    "Conduit routing (surface-mounted or concealed)",
  ];

  const powerServices = [
    "Panel upgrades (100A / 200A)",
    "Sub-panel installation for lighting loads",
    "Surge protection systems",
    "Outdoor-rated disconnects",
    "Code-compliant breaker installation",
  ];

  const maintenanceServices = [
    "Lighting troubleshooting",
    "Smart system diagnostics",
    "Fixture replacement and upgrades",
    "LED conversions",
    "System expansion and reconfiguration",
  ];

  const ServiceSection = ({ title, services }: { title: string; services: string[] }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-primary mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
            <span className="text-gray-700">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 px-4">
        <div className="container mx-auto">
          <button
            onClick={() => handleNavigation("/services")}
            className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </button>
          <div className="flex items-center gap-4 mb-4">
            <Zap className="w-12 h-12 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold">Smart Lighting & Automation Services</h1>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">
            Comprehensive smart lighting solutions for residential and commercial properties, featuring Lutron systems and professional installation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <ServiceSection title="Smart Lighting System Design" services={systemDesignServices} />
        <ServiceSection title="Lighting Control Systems" services={controlSystems} />
        <ServiceSection title="Residential Smart Lighting" services={residentialServices} />
        <ServiceSection title="Commercial Lighting Systems" services={commercialServices} />
        <ServiceSection title="Programming & Commissioning" services={programmingServices} />
        <ServiceSection title="Smart Lighting System Infrastructure" services={infrastructureServices} />
        <ServiceSection title="Lighting Power & Distribution Upgrades" services={powerServices} />
        <ServiceSection title="Maintenance & Service" services={maintenanceServices} />

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-accent/10 to-accent/5 p-12 rounded-xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Ready to Upgrade Your Lighting?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and let's design the perfect smart lighting system for your space.
          </p>
          <Button
            size="lg"
            className="rounded-lg px-8 py-6 text-lg font-semibold"
            onClick={() => handleNavigation("/contact")}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-white/80"><a href="tel:(941) 263-5325" className="hover:text-blue-300 transition">(941) 263-5325</a></p>
          <p className="text-white/80 mt-2">© 2026 All Things Automated. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
