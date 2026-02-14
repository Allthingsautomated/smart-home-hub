import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, navigate] = useLocation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Transformed our home into an intelligent living space. Professional installation and seamless integration.",
      author: "Sarah Johnson",
      role: "Homeowner",
    },
    {
      text: "Saved us significantly on energy bills. Voice control works flawlessly with all our devices.",
      author: "Michael Chen",
      role: "Residential Client",
    },
    {
      text: "Upgraded our entire office building. Security and energy management have been transformative.",
      author: "Emily Rodriguez",
      role: "Business Owner",
    },
  ];

  const services = [
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      desc: "Automated lighting control and ambiance.",
    },
    {
      icon: ShieldCheck,
      title: "Home Security",
      desc: "Advanced security and monitoring systems.",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      desc: "Intelligent temperature management.",
    },
    {
      icon: Mic,
      title: "Voice Control",
      desc: "Seamless voice integration.",
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
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
                onClick={() => navigate("/")}
                className="text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/services")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
            <Button className="rounded-full">Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
            STEP INTO THE FUTURE
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
            Intelligent automation for modern living
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-lg px-8 py-6 text-lg font-semibold"
              onClick={() => navigate("/contact")}
            >
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg px-8 py-6 text-lg font-semibold bg-white/10 border-white text-white hover:bg-white/20"
              onClick={() => navigate("/services")}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-bold mb-4">OUR SERVICES</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg px-8 py-6 text-lg"
              onClick={() => navigate("/services")}
            >
              View All Services <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <p className="text-lg opacity-90">Years Experience</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-lg opacity-90">Homes Automated</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-lg opacity-90">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-lg opacity-90">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-20">
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-2xl text-gray-800 mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <p className="text-xl font-bold">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8">
            READY TO TRANSFORM?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Let's discuss how All Things Automated can create the perfect smart home solution for you.
          </p>
          <Button
            size="lg"
            className="rounded-lg px-10 py-7 text-lg font-semibold"
            onClick={() => navigate("/contact")}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                  alt="All Things Automated Logo"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm opacity-80">
                Intelligent automation for modern homes.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Navigate</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>(555) 123-4567</li>
                <li>info@allthingsautomated.com</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-80">
            <p>© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
