import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2, Eye, EyeOff, Plus, Edit2, AlertCircle, Mail, Phone, MessageSquare, FileText, Zap } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  date: string;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  date: string;
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  excerpt: string;
}

export default function AdminSecretDashboard() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "quotes" | "newsletter" | "blog">("overview");
  
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const ADMIN_PASSWORD = "admin123"; // Change this to your secure password

  useEffect(() => {
    const session = localStorage.getItem("adminSecretSession");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.loggedIn) {
          setIsAuthenticated(true);
          loadAllData();
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
  }, []);

  const loadAllData = () => {
    // Load contacts
    const savedContacts = localStorage.getItem("contactSubmissions");
    if (savedContacts) setContacts(JSON.parse(savedContacts));

    // Load quotes
    const savedQuotes = localStorage.getItem("quoteRequests");
    if (savedQuotes) setQuotes(JSON.parse(savedQuotes));

    // Load newsletter
    const savedSubscribers = localStorage.getItem("newsletterSubscribers");
    if (savedSubscribers) setSubscribers(JSON.parse(savedSubscribers));

    // Load blog posts
    const savedBlog = localStorage.getItem("blogPosts");
    if (savedBlog) setBlogPosts(JSON.parse(savedBlog));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminSecretSession", JSON.stringify({ loggedIn: true }));
      setIsAuthenticated(true);
      loadAllData();
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSecretSession");
    setIsAuthenticated(false);
    setPassword("");
  };

  const deleteContact = (id: string) => {
    if (confirm("Delete this contact submission?")) {
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated);
      localStorage.setItem("contactSubmissions", JSON.stringify(updated));
    }
  };

  const deleteQuote = (id: string) => {
    if (confirm("Delete this quote request?")) {
      const updated = quotes.filter(q => q.id !== id);
      setQuotes(updated);
      localStorage.setItem("quoteRequests", JSON.stringify(updated));
    }
  };

  const deleteSubscriber = (id: string) => {
    if (confirm("Remove this subscriber?")) {
      const updated = subscribers.filter(s => s.id !== id);
      setSubscribers(updated);
      localStorage.setItem("newsletterSubscribers", JSON.stringify(updated));
    }
  };

  const deleteBlogPost = (id: number) => {
    if (confirm("Delete this blog post?")) {
      const updated = blogPosts.filter(p => p.id !== id);
      setBlogPosts(updated);
      localStorage.setItem("blogPosts", JSON.stringify(updated));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Enter your password to access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Login to Dashboard
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              🔒 This is a secret admin area. Keep this URL private!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">All Things Automated</p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: "overview" as const, label: "Overview", icon: "📊" },
              { id: "contacts" as const, label: `Contacts (${contacts.length})`, icon: "📧" },
              { id: "quotes" as const, label: `Quotes (${quotes.length})`, icon: "📋" },
              { id: "newsletter" as const, label: `Newsletter (${subscribers.length})`, icon: "📬" },
              { id: "blog" as const, label: `Blog (${blogPosts.length})`, icon: "📝" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Contact Submissions", value: contacts.length, icon: Mail, color: "blue" },
              { label: "Quote Requests", value: quotes.length, icon: FileText, color: "green" },
              { label: "Newsletter Subscribers", value: subscribers.length, icon: Zap, color: "purple" },
              { label: "Blog Posts", value: blogPosts.length, icon: MessageSquare, color: "orange" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className="w-12 h-12 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Contact Form Submissions</h2>
            </div>
            {contacts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No contact submissions yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.date}</p>
                      </div>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Phone:</strong> <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">{contact.phone}</a>
                    </p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{contact.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Quote Requests</h2>
            </div>
            {quotes.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No quote requests yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {quotes.map((quote) => (
                  <div key={quote.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{quote.name}</h3>
                        <p className="text-sm text-gray-600">{quote.date}</p>
                      </div>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Email:</strong> <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">{quote.email}</a>
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Phone:</strong> <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">{quote.phone}</a>
                    </p>
                    <div>
                      <strong className="text-sm">Services Requested:</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {quote.services.map((service, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Newsletter Tab */}
        {activeTab === "newsletter" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Newsletter Subscribers</h2>
            </div>
            {subscribers.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No newsletter subscribers yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date Subscribed</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <a href={`mailto:${subscriber.email}`} className="text-blue-600 hover:underline">
                            {subscriber.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{subscriber.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteSubscriber(subscriber.id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === "blog" && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <Button onClick={() => navigate("/admin/blog-editor")} className="flex items-center gap-2">
                <Plus size={18} />
                Create Post
              </Button>
            </div>
            {blogPosts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No blog posts yet</p>
              </div>
            ) : (
              <div className="divide-y">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                        <div className="flex gap-3 text-sm text-gray-600 mb-3">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            {post.category}
                          </span>
                          <span>{post.date}</span>
                          <span>by {post.author}</span>
                        </div>
                        <p className="text-gray-700 line-clamp-2">{post.excerpt || post.content.substring(0, 100)}...</p>
                      </div>
                      <button
                        onClick={() => deleteBlogPost(post.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded ml-4"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Import Lock icon
import { Lock } from "lucide-react";
