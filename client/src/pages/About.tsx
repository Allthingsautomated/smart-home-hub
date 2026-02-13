import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Users, Building2, Home as HomeIcon } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
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
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-primary-foreground" />
              </div>
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
                className="text-primary font-semibold"
              >
                About Us
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
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Learn about All Things Automated and our mission to transform homes
              with intelligent automation solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                All Things Automated was founded with a simple mission: to make smart
                home technology accessible, reliable, and easy to use for everyone.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With over 15 years of experience in home automation, our team has
                installed and integrated smart systems in thousands of homes and
                businesses. We believe that technology should enhance your life, not
                complicate it.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                From our early days installing basic automation systems to today's
                sophisticated whole-home integration, we've grown alongside the
                industry. Our commitment to quality, customer service, and innovation
                remains unchanged.
              </p>
              <Button size="lg" className="rounded-full">
                Get Started Today
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team working on smart home installation"
                className="rounded-3xl shadow-soft w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Years of Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Homes Automated</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Excellence</h3>
                <p className="text-muted-foreground">
                  We deliver the highest quality installations and service every
                  single time.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We listen, understand, and
                  deliver solutions that work for you.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Reliability</h3>
                <p className="text-muted-foreground">
                  Available 24/7 for support, maintenance, and emergency assistance
                  whenever you need us.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-soft">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-lg">Integrity</h3>
                <p className="text-muted-foreground">
                  Licensed, bonded, and insured. We operate with transparency and
                  honesty in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Automate Your Home?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss how All Things Automated can transform your living space
            with intelligent automation.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/contact")}
          >
            Schedule a Consultation
          </Button>
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
