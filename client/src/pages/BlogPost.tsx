import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import MobileNav from "@/components/MobileNav";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Blog posts data - same as in Blog.tsx
const BLOG_POSTS: Record<number, any> = {
  1: {
    id: 1,
    title: "The Complete Guide to Smart Lighting Systems",
    excerpt: "Learn everything you need to know about smart lighting, from basic dimming to advanced automation scenes and scheduling.",
    author: "All Things Automated",
    date: "February 20, 2026",
    category: "Smart Lighting",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    content: `
      <h2>Introduction</h2>
      <p>Smart lighting systems have revolutionized the way we control and experience light in our homes and businesses. From simple dimming to complex automation scenes, modern smart lighting offers unprecedented control and convenience.</p>
      
      <h2>Understanding Smart Lighting Basics</h2>
      <p>Smart lighting systems consist of three main components: smart bulbs or fixtures, a control system (hub or bridge), and a user interface (app or voice control). These components work together to provide seamless control over your lighting environment.</p>
      
      <h3>Smart Bulbs vs Smart Switches</h3>
      <p>Smart bulbs are individual bulbs that can be controlled independently, while smart switches control all lights connected to that switch. Each has its advantages depending on your needs and existing infrastructure.</p>
      
      <h2>Popular Smart Lighting Systems</h2>
      <p>There are several excellent smart lighting systems available on the market. Lutron Caséta offers wireless control with excellent range, while Philips Hue provides extensive color options and integration capabilities. HomeWorks systems offer enterprise-grade solutions for larger installations.</p>
      
      <h2>Setting Up Automation Scenes</h2>
      <p>Automation scenes allow you to create custom lighting configurations for different situations. Whether it's movie mode, dinner mode, or bedtime mode, you can set specific brightness and color levels for multiple lights simultaneously.</p>
      
      <h2>Energy Savings and Efficiency</h2>
      <p>Smart lighting can significantly reduce energy consumption through scheduling, occupancy sensors, and daylight harvesting. Many users report 20-30% reductions in lighting energy costs after implementing smart systems.</p>
      
      <h2>Conclusion</h2>
      <p>Smart lighting is more than just convenience—it's an investment in comfort, efficiency, and the future of your home or business. With proper planning and implementation, you can create the perfect lighting environment for any situation.</p>
    `,
  },
  2: {
    id: 2,
    title: "Home Automation Trends for 2026",
    excerpt: "Discover the latest trends in home automation technology and how they can enhance your living experience.",
    author: "All Things Automated",
    date: "February 15, 2026",
    category: "Home Automation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    content: `
      <h2>The Evolution of Home Automation</h2>
      <p>Home automation has come a long way from simple remote controls to sophisticated AI-powered systems that learn your preferences and adapt to your lifestyle.</p>
      
      <h2>Emerging Trends in 2026</h2>
      <p>This year brings several exciting developments in home automation technology. Voice control continues to improve with better natural language processing. Integration between different ecosystems is becoming more seamless. Energy management and sustainability are becoming central to automation design.</p>
      
      <h3>AI-Powered Automation</h3>
      <p>Artificial intelligence is enabling systems to learn your patterns and automatically adjust settings for optimal comfort and efficiency. These systems can predict your needs and make adjustments before you even ask.</p>
      
      <h3>Interoperability Standards</h3>
      <p>New standards like Matter are breaking down silos between different manufacturers, allowing devices from different brands to work together seamlessly.</p>
      
      <h2>Energy Management Focus</h2>
      <p>With rising energy costs and environmental concerns, smart energy management is becoming a priority for homeowners. Real-time monitoring and optimization tools help reduce consumption and costs.</p>
      
      <h2>Security and Privacy</h2>
      <p>As more devices connect to our homes, security and privacy are increasingly important. Modern systems use encryption, secure authentication, and local processing to protect your data.</p>
      
      <h2>Looking Ahead</h2>
      <p>The future of home automation is exciting, with technology becoming more intuitive, efficient, and integrated. Whether you're just starting or upgrading your system, 2026 is a great time to invest in smart home technology.</p>
    `,
  },
  3: {
    id: 3,
    title: "Energy Savings with Smart Lighting",
    excerpt: "Explore how intelligent lighting systems can reduce your energy consumption and lower utility bills.",
    author: "All Things Automated",
    date: "February 10, 2026",
    category: "Energy Efficiency",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    content: `
      <h2>The Cost of Traditional Lighting</h2>
      <p>Traditional incandescent and even fluorescent lighting systems consume significant energy and contribute to high utility bills. Smart lighting offers a modern solution to this age-old problem.</p>
      
      <h2>How Smart Lighting Saves Energy</h2>
      <p>Smart lighting systems reduce energy consumption through several mechanisms: LED technology uses 75% less energy than incandescent bulbs, occupancy sensors ensure lights are only on when needed, and scheduling allows you to automate lighting based on time of day.</p>
      
      <h3>Occupancy Sensors</h3>
      <p>Motion sensors automatically turn lights on when someone enters a room and off when the room is empty. This simple technology can result in significant savings, especially in areas that aren't constantly occupied.</p>
      
      <h3>Daylight Harvesting</h3>
      <p>Daylight sensors adjust artificial lighting levels based on available natural light. This ensures you have adequate illumination while minimizing unnecessary energy use during daylight hours.</p>
      
      <h2>Real-World Savings</h2>
      <p>Studies show that homeowners can reduce lighting energy consumption by 20-30% with smart systems. For businesses, the savings can be even more dramatic, with some reporting 40-50% reductions in lighting costs.</p>
      
      <h2>Return on Investment</h2>
      <p>The initial investment in smart lighting typically pays for itself within 2-3 years through energy savings. After that, it's pure savings on your utility bills.</p>
      
      <h2>Environmental Impact</h2>
      <p>Beyond financial savings, reducing energy consumption helps the environment by decreasing carbon emissions. Every kilowatt-hour saved contributes to a more sustainable future.</p>
    `,
  },
  4: {
    id: 4,
    title: "Lutron Caséta vs RA3: Which System is Right for You?",
    excerpt: "Compare the features and benefits of Lutron's popular lighting control systems to find the perfect fit.",
    author: "All Things Automated",
    date: "February 5, 2026",
    category: "Product Comparison",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    content: `
      <h2>Lutron: The Leader in Smart Lighting</h2>
      <p>Lutron has been a pioneer in lighting control for decades. Their two most popular consumer systems are Caséta and RA3, each designed for different needs and budgets.</p>
      
      <h2>Caséta: Wireless and Affordable</h2>
      <p>Caséta is Lutron's entry-level wireless system. It's easy to install, doesn't require a hub for basic operation, and is very affordable. Perfect for homeowners looking to add smart lighting without major renovations.</p>
      
      <h3>Caséta Features</h3>
      <p>Wireless dimmer switches, remote controls, mobile app control, voice assistant integration, and easy installation. No neutral wire required in many cases.</p>
      
      <h3>Caséta Limitations</h3>
      <p>Limited to 50 devices without a hub, slower response times, fewer advanced features, and less reliable range in larger homes.</p>
      
      <h2>RA3: Professional-Grade Control</h2>
      <p>RA3 is Lutron's mid-range professional system. It requires a hub but offers superior reliability, range, and advanced features. Ideal for larger homes or those requiring complex automation.</p>
      
      <h3>RA3 Features</h3>
      <p>Mesh network for superior range, supports 200+ devices, faster response times, advanced scheduling and scenes, professional installation support, and integration with other systems.</p>
      
      <h3>RA3 Considerations</h3>
      <p>Higher cost, requires professional installation in most cases, more complex setup, and requires a hub.</p>
      
      <h2>Which Should You Choose?</h2>
      <p>Choose Caséta if you have a small to medium home, limited budget, and want simple wireless control. Choose RA3 if you have a larger home, need advanced features, want professional support, or plan to expand significantly.</p>
      
      <h2>Conclusion</h2>
      <p>Both systems are excellent choices from a trusted manufacturer. Your decision should be based on your home size, budget, and desired features.</p>
    `,
  },
  5: {
    id: 5,
    title: "Smart Home Security Integration",
    excerpt: "Learn how to integrate smart lighting with your home security system for enhanced protection.",
    author: "All Things Automated",
    date: "January 30, 2026",
    category: "Home Security",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    content: `
      <h2>Security Through Smart Lighting</h2>
      <p>Smart lighting is more than just convenience—it's a powerful security tool. Properly integrated with your security system, it can deter intruders and enhance your home's protection.</p>
      
      <h2>Deterrent Effect</h2>
      <p>Lighting is one of the most effective deterrents against burglary. Well-lit homes are significantly less likely to be targeted. Smart lighting allows you to automate this protection even when you're away.</p>
      
      <h3>Away Mode Automation</h3>
      <p>When you're on vacation, smart lighting can simulate occupancy by turning lights on and off in different rooms on a schedule. This makes your home appear occupied and active, deterring potential intruders.</p>
      
      <h2>Integration with Security Systems</h2>
      <p>Modern smart lighting integrates seamlessly with security systems. When motion is detected or an alarm is triggered, lights can automatically turn on to illuminate the area and deter intruders.</p>
      
      <h3>Emergency Response</h3>
      <p>In case of an emergency, smart lighting can be programmed to turn on all lights, providing visibility and potentially confusing an intruder. Some systems can also trigger strobe effects to alert neighbors.</p>
      
      <h2>Monitoring and Alerts</h2>
      <p>Smart lighting systems can send you alerts if lights are turned on or off unexpectedly, providing another layer of monitoring for your home's security.</p>
      
      <h2>Best Practices</h2>
      <p>Combine smart lighting with other security measures like cameras, alarms, and locks. Use realistic schedules that match your normal patterns. Consider professional monitoring services for added protection.</p>
      
      <h2>Conclusion</h2>
      <p>Smart lighting is a valuable component of a comprehensive home security strategy. Used effectively, it can significantly enhance your home's protection.</p>
    `,
  },
  6: {
    id: 6,
    title: "Commercial Lighting Solutions for Businesses",
    excerpt: "Discover how smart lighting can improve productivity and reduce costs in commercial spaces.",
    author: "All Things Automated",
    date: "January 25, 2026",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    content: `
      <h2>The Business Case for Smart Lighting</h2>
      <p>Commercial spaces consume enormous amounts of energy for lighting. Smart lighting systems offer significant opportunities for cost reduction and productivity improvement.</p>
      
      <h2>Energy Cost Reduction</h2>
      <p>Businesses typically spend 20-40% of their energy budget on lighting. Smart systems can reduce this by 30-50% through LED technology, occupancy sensors, and daylight harvesting.</p>
      
      <h3>Occupancy-Based Control</h3>
      <p>Lights automatically turn off in unoccupied areas. Conference rooms, storage areas, and restrooms can have significant energy savings through motion-activated control.</p>
      
      <h2>Productivity and Employee Wellness</h2>
      <p>Research shows that proper lighting improves employee productivity and well-being. Smart systems can adjust color temperature throughout the day to support circadian rhythms and reduce eye strain.</p>
      
      <h3>Tunable White Lighting</h3>
      <p>Cooler light in the morning and afternoon promotes alertness, while warmer light in the evening supports natural sleep cycles. This can improve employee satisfaction and reduce fatigue-related errors.</p>
      
      <h2>Maintenance and Longevity</h2>
      <p>LED bulbs last 25,000-50,000 hours compared to 1,000 hours for incandescent. Smart systems track bulb usage and predict maintenance needs, reducing downtime and labor costs.</p>
      
      <h2>Scalability and Integration</h2>
      <p>Commercial smart lighting systems can control thousands of fixtures across multiple buildings. Integration with building management systems provides centralized control and monitoring.</p>
      
      <h2>ROI and Payback Period</h2>
      <p>Most commercial smart lighting installations pay for themselves within 3-5 years through energy savings and reduced maintenance. After that, it's pure profit.</p>
      
      <h2>Conclusion</h2>
      <p>Smart lighting is a smart investment for any business looking to reduce costs, improve employee wellness, and demonstrate environmental responsibility.</p>
    `,
  },
};

export default function BlogPost() {
  const [location, navigate] = useLocation();
  
  // Extract post ID from URL (e.g., /blog/1)
  const postId = parseInt(location.split('/').pop() || '1');
  const post = BLOG_POSTS[postId];

  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavigation("/")}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/logo.png"
                  alt="SmartHome Hub Logo"
                  className="h-10 w-auto"
                />
              </button>
            </div>
          </div>
        </nav>

        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => handleNavigation("/blog")}>Back to Blog</Button>
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
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="SmartHome Hub Logo"
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
                className="text-gray-700 hover:text-primary transition-colors"
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
              <button
                onClick={() => handleNavigation("/quote-builder")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigation("/blog")}
                className="text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Blog
              </button>
            </div>
            <MobileNav onNavigate={handleNavigation} />
            <Button className="rounded-full" onClick={() => navigate("/contact")}>Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 px-4">
        <div className="container mx-auto">
          <button
            onClick={() => handleNavigation("/blog")}
            className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </button>
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                {post.author}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-primary prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:underline
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-semibold">Share:</span>
            <button className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(BLOG_POSTS)
              .filter((p: any) => p.id !== postId)
              .slice(0, 2)
              .map((relatedPost: any) => (
                <button
                  key={relatedPost.id}
                  onClick={() => handleNavigation(`/blog/${relatedPost.id}`)}
                  className="text-left bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 hover:-translate-y-1"
                >
                  <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    {relatedPost.category}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </button>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="/logo.png"
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
                <li>(941) 263-5325</li>
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
