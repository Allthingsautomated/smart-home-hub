/*
Design Philosophy: Premium Minimalism + Bold Geometric
- Cormorant Garamond serif for luxury headings
- Bold, geometric design matching logo aesthetic
- Strategic use of blue (#1E5BA8) and black
- Clean, powerful typography hierarchy
- Maximum impact with minimal text
*/

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
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
          <span className="mx-8">24/7 Support</span>
          <span className="mx-8">•</span>
          <span className="mx-8">15+ Years</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Smart Home Experts</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Certified & Insured</span>
          <span className="mx-8">•</span>
          <span className="mx-8">24/7 Support</span>
          <span className="mx-8">•</span>
          <span className="mx-8">15+ Years</span>
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
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                alt="All Things Automated Logo"
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold hidden sm:inline">
                All Things Automated
              </span>
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
                className="hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/services")}
                className="hover:text-primary transition-colors"
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
      <section
        className="relative py-48 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold backdrop-blur-sm">
                Smart Home Automation
              </span>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight">
              Step Into The Future
            </h1>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl">
              Intelligent automation for modern living. Transform your home with cutting-edge smart technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg font-semibold"
                onClick={() => navigate("/contact")}
              >
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-semibold bg-white/10 border-white text-white hover:bg-white/20"
                onClick={() => navigate("/services")}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-48 bg-background">
        <div className="container">
          <div className="mb-20">
            <h2 className="text-6xl md:text-7xl font-bold mb-6">
              Our Services
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
            ].map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-white border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-16 text-center">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => navigate("/services")}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-48 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="text-6xl md:text-7xl font-bold mb-20 text-center">
            What Our Clients Say
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 text-center">
              <p className="text-2xl md:text-3xl mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <p className="text-xl font-semibold">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="opacity-80">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-7xl font-bold mb-8">
              Ready to Transform Your Home?
            </h2>
            <p className="text-2xl text-muted-foreground mb-12">
              Let's discuss how All Things Automated can create the perfect smart home solution for you.
            </p>
            <Button
              size="lg"
              className="rounded-full px-10 py-7 text-lg font-semibold"
              onClick={() => navigate("/contact")}
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
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
              <ul className="space-y-3 text-sm opacity-80">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hover:opacity-100 transition-opacity"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm opacity-80">
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
