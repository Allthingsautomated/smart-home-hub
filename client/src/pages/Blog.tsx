import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import PageFooter from "@/components/PageFooter";
import { ROUTES } from "@/lib/routes";

const staticBlogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Smart Lighting Systems",
    excerpt: "Everything you need to know about smart lighting — from basic dimming to advanced automation scenes and scheduling.",
    author: "Jorge Romero",
    date: "February 20, 2026",
    category: "Smart Lighting",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Home Automation Trends for 2026",
    excerpt: "The latest trends in home automation and how they can meaningfully enhance your day-to-day living experience.",
    author: "Jorge Romero",
    date: "February 15, 2026",
    category: "Home Automation",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Energy Savings with Smart Lighting",
    excerpt: "How intelligent lighting systems reduce energy consumption and lower utility bills — with real numbers.",
    author: "Jorge Romero",
    date: "February 10, 2026",
    category: "Energy Efficiency",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Lutron Caséta vs RA3: Which System is Right for You?",
    excerpt: "A clear comparison of Lutron's two most popular lighting control platforms to help you choose the right one.",
    author: "Jorge Romero",
    date: "February 5, 2026",
    category: "Product Comparison",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    title: "Smart Home Security Integration",
    excerpt: "How to integrate smart lighting with your home security system for enhanced protection and peace of mind.",
    author: "Jorge Romero",
    date: "January 30, 2026",
    category: "Home Security",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    title: "Commercial Lighting Solutions for Businesses",
    excerpt: "How smart lighting can improve productivity, reduce costs, and create the right atmosphere in commercial spaces.",
    author: "Jorge Romero",
    date: "January 25, 2026",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Blog() {
  const [, navigate] = useLocation();
  const [blogPosts, setBlogPosts] = useState(staticBlogPosts);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("blogPosts");
      if (saved) {
        const localPosts = JSON.parse(saved) as Array<{
          id: number;
          title: string;
          excerpt: string;
          author: string;
          date: string;
          category: string;
          coverImage?: string;
        }>;
        const mapped = localPosts.map((p) => ({
          id: p.id,
          title: p.title,
          excerpt: p.excerpt,
          author: p.author,
          date: p.date,
          category: p.category,
          image: p.coverImage ?? "",
        }));
        // Local posts first, then static posts not overridden by a matching id
        const localIds = new Set(mapped.map((p) => p.id));
        const merged = [
          ...mapped,
          ...staticBlogPosts.filter((p) => !localIds.has(p.id)),
        ];
        setBlogPosts(merged);
      }
    } catch {
      // Keep static posts on parse error
    }
  }, []);

  const handleNav = (path: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ServicePageHeader />

      {/* Hero */}
      <section className="py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">Blog</h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Expert insights, installation tips, and industry updates from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-background border-t border-border/40">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <button
                key={post.id}
                onClick={() => handleNav(ROUTES.blogPost(post.id))}
                className="group text-left bg-background rounded-xl border border-border/60 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {post.image && (
                  <div className="h-52 overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
                    {post.category}
                  </span>
                  <h2 className="text-lg font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5 pb-5 border-b border-border/40">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-primary-foreground/80 mb-10 leading-relaxed">
            Get smart home tips, product spotlights, and exclusive offers delivered monthly.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 text-sm"
            />
            <Button variant="secondary" className="rounded-full px-6 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
