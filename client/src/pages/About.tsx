import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import PageFooter from "@/components/PageFooter";

export default function About() {
  const [, navigate] = useLocation();

  const values = [
    {
      title: "Excellence",
      desc: "We hold ourselves to the highest standards in every installation, from the first consultation to the final walkthrough.",
    },
    {
      title: "Customer First",
      desc: "Your satisfaction drives every decision we make. We don't close a job until you're completely happy.",
    },
    {
      title: "Reliability",
      desc: "Show up on time, do what we say, back it up with 24/7 support. That's the promise we keep every day.",
    },
    {
      title: "Innovation",
      desc: "We stay ahead of the technology curve so you always get the most effective and future-proof solutions.",
    },
  ];

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "1,000+", label: "Homes Automated" },
    { value: "100%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ServicePageHeader />

      {/* Hero */}
      <section className="py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              About Us
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Southwest Florida's trusted smart home and commercial automation specialists —
              helping families and businesses live and work smarter since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background border-t border-border/40">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                For over 15 years we've been transforming homes and businesses
                with intelligent automation technology. What started as a passion
                for clean, well-integrated technology has grown into a full-service
                company trusted by over a thousand clients across the region.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe smart homes should be intuitive, reliable, and genuinely
                improve daily life — not add complexity. From lighting and security to
                climate control and voice integration, we make automation simple and
                accessible for everyone.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Team working on smart home installation"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold mb-16">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-muted/40 rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-background border-t border-border/40">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/DVqMtgRDSQKXEAnK.PNG"
                alt="Jorge Romero - Founder"
                className="w-full h-96 object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Founder & Lead Integrator</p>
              <h2 className="text-4xl font-bold mb-6">Jorge Romero</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As the founder, I've dedicated over 15 years to transforming homes
                and businesses through intelligent automation. My passion is making
                smart home technology accessible and intuitive for everyone.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From residential installations to commercial building automation,
                I believe the right technology should enhance your life — not
                complicate it. When you work with us, you're working with someone
                who genuinely cares about getting it right the first time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Let's discuss how we can create the perfect smart home or commercial
            automation solution for you.
          </p>
          <Button
            size="lg"
            className="rounded-full px-10 py-6 text-lg"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/contact");
            }}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
