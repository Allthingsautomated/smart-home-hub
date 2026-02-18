import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Zap, Battery, Leaf } from "lucide-react";

export default function TeslaPanels() {
  const [, navigate] = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                alt="All Things Automated Logo"
                className="h-10 w-auto"
              />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("/services")}
                className="text-primary font-semibold"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
            <Button className="rounded-full" onClick={() => handleNavigation("/contact")}>
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/20 to-accent/10">
        <div className="container mx-auto">
          <button
            onClick={() => handleNavigation("/services")}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </button>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
            TESLA ELECTRICAL PANELS
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl">
            Advanced electrical panel solutions with Tesla Powerwall integration for energy independence and backup power.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-primary">
            TESLA POWERWALL & ELECTRICAL SOLUTIONS
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
              <Battery className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-primary">Powerwall Integration</h3>
              <p className="text-gray-700">
                Store solar energy and use it when you need it most. Seamless integration with your home's electrical system.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
              <Leaf className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-primary">Energy Independence</h3>
              <p className="text-gray-700">
                Reduce grid dependency and lower your electricity bills with sustainable energy solutions.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-primary">Backup Power</h3>
              <p className="text-gray-700">
                Automatic backup during outages ensures your home stays powered and protected.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 rounded-lg mb-16">
            <h3 className="text-3xl font-bold mb-8 text-primary">WHAT WE OFFER</h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Tesla Powerwall installation and configuration</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Complete electrical panel upgrades and modernization</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Solar integration and battery storage solutions</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Backup power system design and installation</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>Smart monitoring and energy management</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-accent font-bold">✓</span>
                <span>24/7 support and maintenance</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-12 rounded-lg">
            <h3 className="text-3xl font-bold mb-4">READY TO UPGRADE?</h3>
            <p className="text-lg mb-8 opacity-90">
              Let our experts design the perfect Tesla electrical solution for your home or business.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-lg px-8 py-6 text-lg font-semibold"
              onClick={() => handleNavigation("/contact")}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">NAVIGATE</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="hover:text-accent transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="hover:text-accent transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-accent transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="hover:text-accent transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">SERVICES</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-accent transition-colors"
                  >
                    Smart Lighting
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-accent transition-colors"
                  >
                    Home Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-accent transition-colors"
                  >
                    Climate Control
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-accent transition-colors"
                  >
                    Tesla Electrical Panels
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">CONTACT</h4>
              <p className="mb-2">
                <a href="tel:(941) 263-5325" className="hover:text-accent transition-colors">
                  (941) 263-5325
                </a>
              </p>
              <p className="mb-4">
                <a href="mailto:office@allthingsautomated.org" className="hover:text-accent transition-colors">
                  office@allthingsautomated.org
                </a>
              </p>
              <p>Available 24/7</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/80">
            <p>© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
