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
  Zap,
  Lock,
  Wifi,
  Volume2,
  Instagram,
  Music,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import MobileNav from "@/components/MobileNav";
import { ROUTES, type AppRoute } from "@/lib/routes";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, navigate] = useLocation();

  const handleNavigation = (path: AppRoute) => {
    scrollToTop();
    navigate(path);
  };
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
      icon: Zap,
      title: "Smart Lighting",
      desc: "Automated lighting control and ambiance.",
    },
    {
      icon: Lock,
      title: "Home Security",
      desc: "Advanced security and monitoring systems.",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      desc: "Intelligent temperature management.",
    },
    {
      icon: Volume2,
      title: "Voice Control",
      desc: "Seamless voice integration.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigation(ROUTES.home)}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                alt="SmartHome Hub Logo"
                className="h-10 w-auto"
              />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation(ROUTES.home)}
                className="text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation(ROUTES.about)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation(ROUTES.services)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation(ROUTES.contact)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation(ROUTES.quoteBuilder)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigation(ROUTES.blog)}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Blog
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <MobileNav onNavigate={handleNavigation} />
              <Button
                className="rounded-full hidden md:inline-flex"
                onClick={() => navigate(ROUTES.contact)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://private-us-east-1.manuscdn.com/sessionFile/G41wwZxJTdeFqWuVf8Z88y/sandbox/XHFc9s6nwSGdz8ri9QjlWr-img-1_1771269105000_na1fn_c21hcnQtaG9tZS1oZXJv.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRzQxd3daeEpUZGVGcVd1VmY4Wjg4eS9zYW5kYm94L1hIRmM5czZud1NHZHo4cmk5UWpsV3ItaW1nLTFfMTc3MTI2OTEwNTAwMF9uYTFmbl9jMjFoY25RdGFHOXRaUzFvWlhKdi5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qbwv4hUTzejzL1mj6PefAdpDLb0Cn8qCYTRv3IlWb8SfAdfxCijCBATn-kekKPEp0cN3F5g-8OAENz92uvCBTGsXt7utGT9SIHJIfeZcUj-~uHmVfaMyZbJQiZGVpbgJJJrwQM0I3Yyw1-xC1jEtCGd1MzGAn4EywjI6DKTMpcGnxHsL5hciy-1rLdOKaV0CgY1LETJ5YDTaW7JYF7xseUZhoK3XTUZVv-~ErR-uNvCvpjvX-Ic1Zee4qg~sgUehi4SWgvO-Mv9eoWdWVJ88vrSm~oJwVPlGBEBQOaRa95kYBhgvWFteV829VYjo1sfaGp8dnuPHMnI8HKNfy6oe1g__')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
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
              onClick={() => handleNavigation(ROUTES.contact)}
            >
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg px-8 py-6 text-lg font-semibold bg-white/10 border-white text-white hover:bg-white/20"
              onClick={() => handleNavigation(ROUTES.services)}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto">
          <h2
            className="text-center text-4xl md:text-5xl mb-4 text-primary"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontWeight: "400",
            }}
          >
            OUR SERVICES
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleNavigation(ROUTES.services)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3
                    className="text-xl text-primary mb-2"
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontWeight: "400",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="rounded-lg px-8 py-6 text-lg"
              onClick={() => handleNavigation(ROUTES.services)}
            >
              View All Services <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">15+</h3>
              <p className="text-white/80">Years Experience</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">1000+</h3>
              <p className="text-white/80">Homes Automated</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">100%</h3>
              <p className="text-white/80">Satisfaction Rate</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">24/7</h3>
              <p className="text-white/80">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 text-primary">
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-16"></div>

          <div className="bg-slate-50 p-8 rounded-xl shadow-md">
            <p className="text-lg text-gray-700 italic mb-6">
              "{testimonials[currentTestimonial].text}"
            </p>
            <div className="text-center">
              <h4 className="font-bold text-primary text-lg">
                {testimonials[currentTestimonial].author}
              </h4>
              <p className="text-gray-600">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/30 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-accent" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-accent/20 hover:bg-accent/30 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-accent" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            READY TO TRANSFORM?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Let's discuss how SmartHome Hub can create the perfect smart home
            solution for you.
          </p>
          <Button
            size="lg"
            className="rounded-lg px-8 py-6 text-lg font-semibold"
            onClick={() => handleNavigation(ROUTES.contact)}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">NAVIGATE</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.home)}
                    className="hover:text-accent transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.about)}
                    className="hover:text-accent transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.services)}
                    className="hover:text-accent transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.contact)}
                    className="hover:text-accent transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.blog)}
                    className="hover:text-accent transition-colors"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">SERVICES</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.services)}
                    className="hover:text-accent transition-colors"
                  >
                    Smart Lighting
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.services)}
                    className="hover:text-accent transition-colors"
                  >
                    Home Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.services)}
                    className="hover:text-accent transition-colors"
                  >
                    Climate Control
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(ROUTES.services)}
                    className="hover:text-accent transition-colors"
                  >
                    Voice Control
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">CONTACT</h4>
              <p className="mb-2">
                <a
                  href="tel:(941) 263-5325"
                  className="hover:text-accent transition-colors"
                >
                  (941) 263-5325
                </a>
              </p>
              <p className="mb-4">Available 24/7</p>
              <h4 className="font-bold text-lg mb-4 mt-6">FOLLOW US</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/allthingsautomated8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@allthingsautomated?_r=1&_t=ZT-94GKcCmT0rW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  <Music size={24} />
                </a>
              </div>
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
