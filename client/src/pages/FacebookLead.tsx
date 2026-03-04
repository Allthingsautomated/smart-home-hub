import { useState } from "react";
import { CheckCircle, Home, Zap, DollarSign, Shield, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FacebookLead() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
      setError("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    console.log("Lead submitted:", formData);
    setSubmitted(true);

    // Auto-redirect after 3 seconds
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Check Your Email!
          </h2>
          <p className="text-blue-100 text-lg mb-6">
            We've sent your FREE Smart Home Energy Savings Report to <strong>{formData.email}</strong>
          </p>
          <p className="text-blue-200 mb-8">
            Inside you'll discover exactly how much you can save on energy bills and which smart home upgrades will give you the best ROI.
          </p>
          <p className="text-blue-300 text-sm">
            Redirecting in 3 seconds... or <a href="/" className="underline font-bold hover:text-white">click here</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Hook */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 text-white py-12 px-4 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm mb-4">
            🎁 LIMITED TIME: FREE REPORT
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif', fontWeight: "400" }}>
            DISCOVER HOW MUCH YOU'RE WASTING ON ENERGY
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Get your personalized Smart Home Energy Savings Report and find out exactly which upgrades will save you the most money
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-blue-200">
            <CheckCircle className="w-5 h-5" />
            <span>Takes 60 seconds • No credit card required • 100% free</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Benefits & Social Proof */}
          <div>
            {/* Problem Agitation */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Most Tampa Homeowners Are Losing $2,000+ Per Year
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Without smart home automation, your HVAC runs 24/7 even when you're away. Your lights stay on in empty rooms. Your thermostat can't adapt to weather changes.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                The result? Skyrocketing energy bills, wasted money, and a home that's not working for you.
              </p>
            </div>

            {/* Solution Benefits */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Your Free Report Reveals:
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">Exact Savings Potential</p>
                    <p className="text-gray-600">How much YOU can save annually with smart home upgrades</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">Best ROI Upgrades</p>
                    <p className="text-gray-600">Which specific upgrades will pay for themselves fastest</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Home className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">Home Value Increase</p>
                    <p className="text-gray-600">How much smart home upgrades boost your home's value</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-gray-900">Tax Credits & Incentives</p>
                    <p className="text-gray-600">Federal and state rebates you might qualify for</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-900 font-bold mb-3">
                ⭐ Trusted by 500+ Tampa Bay Homeowners
              </p>
              <p className="text-gray-700 text-sm mb-4">
                "Jorge's team showed us exactly where we were wasting money. We saved $1,800 in the first year alone!"
              </p>
              <p className="text-gray-600 text-sm font-semibold">
                — Sarah Johnson, Tampa
              </p>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg sticky top-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Get Your Free Report
            </h3>
            <p className="text-gray-600 mb-6">
              Just enter your info below and we'll email your personalized report instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 text-lg rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
              >
                Send Me My Free Report
                <ArrowRight className="w-5 h-5" />
              </Button>

              <p className="text-xs text-gray-600 text-center">
                We respect your privacy. Your info is 100% secure and we'll never spam you.
              </p>
            </form>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>500+ 5-Star Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Common Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How much will this cost me?
              </h3>
              <p className="text-gray-700">
                The report is completely free. No credit card required. We send it to your email instantly after you submit the form.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Will you spam me?
              </h3>
              <p className="text-gray-700">
                Absolutely not. We'll send you your report and occasional tips about saving energy. You can unsubscribe anytime with one click.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How personalized is the report?
              </h3>
              <p className="text-gray-700">
                Very! We analyze your home's size, age, location, and current systems to give you specific recommendations and savings estimates tailored to YOUR situation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What if I'm not ready to upgrade yet?
              </h3>
              <p className="text-gray-700">
                That's fine! The report is yours to keep. Many homeowners save it and use it to plan future upgrades. We'll be here when you're ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Stop Wasting Money on Energy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get your free personalized Smart Home Energy Savings Report in 60 seconds.
          </p>
          <a
            href="#form"
            className="inline-block bg-yellow-400 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-yellow-300 transition-colors"
          >
            Get Your Free Report Now
          </a>
        </div>
      </div>
    </div>
  );
}
