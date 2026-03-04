import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";
import { useAuth } from "@/_core/hooks/useAuth";

export default function FacebookLead() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
      setFormError("Please fill in all required fields");
      return;
    }

    console.log("Lead submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
            Check Your Email
          </h2>
          <p className="text-blue-100 text-lg mb-6">
            We've sent your Smart Home Energy Savings Report to <strong>{formData.email}</strong>
          </p>
          <p className="text-blue-200 mb-8">
            Your personalized report includes exact savings potential, best ROI upgrades, home value increase, and available tax credits.
          </p>
          <p className="text-blue-300 text-sm">
            Redirecting in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                alt="All Things Automated Logo"
                className="w-10 h-10"
              />
              <span className="text-lg font-bold text-gray-900" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
                ALL THINGS AUTOMATED
              </span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
              <Button className="bg-blue-900 hover:bg-blue-950 text-white">
                Book Now
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-4 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold mb-6 border border-blue-600">
            LIMITED TIME OFFER
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
            DISCOVER YOUR ENERGY SAVINGS POTENTIAL
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your personalized Smart Home Energy Savings Report and find out exactly which upgrades will save you the most money
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <Check className="w-5 h-5" />
            <span>Takes 60 seconds • No credit card required • 100% free</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
              WHY HOMEOWNERS CHOOSE US
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Most Tampa Bay homeowners are leaving thousands of dollars on the table each year. Without smart home automation, your HVAC runs continuously, lights stay on in empty rooms, and your thermostat cannot adapt to weather changes.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
              YOUR REPORT INCLUDES
            </h3>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-blue-900 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Exact Savings Potential</p>
                  <p className="text-gray-600">How much you can save annually with smart home upgrades</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-blue-900 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Best ROI Upgrades</p>
                  <p className="text-gray-600">Which specific upgrades will pay for themselves fastest</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-blue-900 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Home Value Increase</p>
                  <p className="text-gray-600">How much smart home upgrades boost your home's value</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded bg-blue-900 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Tax Credits & Incentives</p>
                  <p className="text-gray-600">Federal and state rebates you qualify for</p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-gray-50 border-l-4 border-blue-900 p-6 rounded">
              <p className="text-gray-900 font-bold mb-3 text-lg">
                TRUSTED BY 500+ HOMEOWNERS
              </p>
              <p className="text-gray-700 mb-4">
                "Jorge's team showed us exactly where we were wasting money. We saved $1,800 in the first year alone."
              </p>
              <p className="text-gray-600 font-semibold">
                Sarah Johnson, Tampa
              </p>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
              GET YOUR FREE REPORT
            </h3>
            <p className="text-gray-600 mb-8">
              Enter your information below and we'll email your personalized report instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(813) 555-0123"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Home Address (Optional)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, Tampa, FL"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-4 text-lg rounded flex items-center justify-center gap-2 transition-all"
              >
                Send My Free Report
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-xs text-gray-600 text-center">
                We respect your privacy. Your information is 100% secure and we'll never spam you.
              </p>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-900" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-900" />
                <span>500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-900" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
            COMMON QUESTIONS
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How much will this cost me?
              </h3>
              <p className="text-gray-700">
                The report is completely free. No credit card required. We send it to your email instantly after you submit the form.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Will you spam me?
              </h3>
              <p className="text-gray-700">
                Absolutely not. We'll send you your report and occasional tips about saving energy. You can unsubscribe anytime with one click.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How personalized is the report?
              </h3>
              <p className="text-gray-700">
                Very personalized. We analyze your home's size, age, location, and current systems to give you specific recommendations and savings estimates tailored to your situation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                What if I'm not ready to upgrade yet?
              </h3>
              <p className="text-gray-700">
                That's fine. The report is yours to keep. Many homeowners save it and use it to plan future upgrades. We'll be here when you're ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
            READY TO SAVE MONEY?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get your free personalized Smart Home Energy Savings Report in 60 seconds.
          </p>
          <a
            href="#form"
            className="inline-block bg-white text-blue-900 font-bold py-4 px-8 rounded hover:bg-gray-100 transition-colors"
          >
            Get Your Free Report Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/services/smart-lighting" className="hover:text-white transition-colors">Smart Lighting</a></li>
                <li><a href="/services/home-security" className="hover:text-white transition-colors">Home Security</a></li>
                <li><a href="/services/climate-control" className="hover:text-white transition-colors">Climate Control</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <p className="text-sm">
                <a href="tel:9412635325" className="hover:text-white transition-colors">(941) 263-5325</a>
              </p>
              <p className="text-sm mt-2">Tampa, Florida</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
