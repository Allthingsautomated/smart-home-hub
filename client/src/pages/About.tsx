import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function About() {
  const [, navigate] = useLocation();
  
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
                className="text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("/services")}
                className="text-gray-700 hover:text-primary transition-colors"
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
            <Button className="rounded-full">Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary">ABOUT US</h1>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8">OUR STORY</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                For over 15 years, All Things Automated has been transforming homes and businesses with intelligent automation technology.
              </p>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                We believe smart homes should be intuitive, reliable, and enhance daily life. Our team of experts works with you to create custom solutions that perfectly fit your needs.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                From lighting and security to climate control and voice integration, we make automation simple and accessible for everyone.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                alt="Team working on smart home installation"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-20">
            OUR VALUES
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Excellence",
                desc: "We deliver premium installations and support.",
              },
              {
                title: "Customer First",
                desc: "Your satisfaction is our top priority.",
              },
              {
                title: "Reliability",
                desc: "24/7 support you can always count on.",
              },
              {
                title: "Innovation",
                desc: "Latest technology for modern homes.",
              },
            ].map((value, idx) => (
              <div key={idx} className="p-8 bg-white rounded-lg">
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 bg-gradient-to-r from-accent/10 to-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-20">MEET THE FOUNDER</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/DVqMtgRDSQKXEAnK.PNG"
                alt="Jorge Romero - Founder"
                className="w-full h-96 object-cover"
              />
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl mb-6 text-primary" style={{fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400'}}>Jorge Romero</h3>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                As the founder of All Things Automated, I've dedicated over 15 years to transforming homes and businesses through intelligent automation technology.
              </p>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                My passion is making smart home technology accessible and intuitive for everyone. From residential installations to commercial building automation, I believe that the right technology should enhance your life, not complicate it.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                When you work with All Things Automated, you're working with someone who genuinely cares about getting it right the first time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold mb-2">15+</div>
              <p className="text-lg opacity-90">Years Experience</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">1000+</div>
              <p className="text-lg opacity-90">Homes Automated</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">100%</div>
              <p className="text-lg opacity-90">Satisfaction</p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">24/7</div>
              <p className="text-lg opacity-90">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-8">
            READY TO AUTOMATE?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Let's discuss how All Things Automated can create the perfect smart home solution for you.
          </p>
          <Button
            size="lg"
            className="rounded-lg px-10 py-7 text-lg font-semibold"
            onClick={() => navigate("/contact")}
          >
            Schedule a Consultation
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
                    onClick={() => handleNavigation("/")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className="hover:text-white transition-colors"
                  >
                    Blog
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
                <li><a href="tel:(941) 263-5325" className="hover:text-blue-400 transition">(941) 263-5325</a></li>
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
