import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useLocation } from "wouter";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Blog() {
  const [, navigate] = useLocation();

  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Complete Guide to Smart Lighting Systems",
      excerpt: "Learn everything you need to know about smart lighting, from basic dimming to advanced automation scenes and scheduling.",
      author: "All Things Automated",
      date: "February 20, 2026",
      category: "Smart Lighting",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Home Automation Trends for 2026",
      excerpt: "Discover the latest trends in home automation technology and how they can enhance your living experience.",
      author: "All Things Automated",
      date: "February 15, 2026",
      category: "Home Automation",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Energy Savings with Smart Lighting",
      excerpt: "Explore how intelligent lighting systems can reduce your energy consumption and lower utility bills.",
      author: "All Things Automated",
      date: "February 10, 2026",
      category: "Energy Efficiency",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Lutron Caséta vs RA3: Which System is Right for You?",
      excerpt: "Compare the features and benefits of Lutron's popular lighting control systems to find the perfect fit.",
      author: "All Things Automated",
      date: "February 5, 2026",
      category: "Product Comparison",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Smart Home Security Integration",
      excerpt: "Learn how to integrate smart lighting with your home security system for enhanced protection.",
      author: "All Things Automated",
      date: "January 30, 2026",
      category: "Home Security",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Commercial Lighting Solutions for Businesses",
      excerpt: "Discover how smart lighting can improve productivity and reduce costs in commercial spaces.",
      author: "All Things Automated",
      date: "January 25, 2026",
      category: "Commercial",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Home Blog</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Expert insights, tips, and industry updates on smart home automation and intelligent living
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {post.category}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    {post.author}
                  </div>
                </div>

                {/* Read More */}
                <button className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="rounded-lg px-8 py-6 text-lg"
          >
            Load More Articles
          </Button>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16 px-4 mt-16">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-8">
            Get the latest smart home tips, industry updates, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <Button className="rounded-lg px-8 py-3 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-white/80">© 2026 All Things Automated. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
