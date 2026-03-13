import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { nanoid } from "nanoid";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Zap,
  MessageSquare,
  Tag,
  LogOut,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  Lock,
  Bell,
  Search,
  Menu,
  X,
  Plus,
  ChevronRight,
  Home,
  TrendingUp,
  Users,
  Phone,
  Image as ImageIcon,
  Copy,
  Check,
  Upload,
} from "lucide-react";
import PhotoUpload from "@/components/PhotoUpload";

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

interface UploadedPhoto {
  id: number;
  s3Url: string;
  filename: string;
  uploadedAt: Date;
  contentType: string;
  fileSize: number;
  s3Key: string;
}

type ActiveTab = "overview" | "contacts" | "quotes" | "newsletter" | "blog" | "media";

const NAV_GROUPS = [
  {
    label: "MAIN",
    items: [
      { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
      { id: "contacts" as const, label: "Contacts", icon: Mail },
      { id: "quotes" as const, label: "Quotes", icon: FileText },
    ],
  },
  {
    label: "CONTENT",
    items: [
      { id: "newsletter" as const, label: "Newsletter", icon: Zap },
      { id: "blog" as const, label: "Blog", icon: MessageSquare },
      { id: "media" as const, label: "Media", icon: ImageIcon },
    ],
  },
];

const CHART_COLORS = ["#8B5CF6", "#06b6d4", "#f59e0b", "#10b981"];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AdminSecretDashboard() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // tRPC hooks for photos
  const photosQuery = trpc.photos.list.useQuery({ limit: 100, offset: 0 });
  const deletePhotoMutation = trpc.photos.delete.useMutation({
    onSuccess: () => {
      photosQuery.refetch();
    },
  });

  const photos = photosQuery.data?.photos || [];

  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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
    const savedContacts = localStorage.getItem("contactSubmissions");
    if (savedContacts) setContacts(JSON.parse(savedContacts));
    const savedQuotes = localStorage.getItem("quoteRequests");
    if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
    const savedSubscribers = localStorage.getItem("newsletterSubscribers");
    if (savedSubscribers) setSubscribers(JSON.parse(savedSubscribers));
    const savedBlog = localStorage.getItem("blogPosts");
    if (savedBlog) setBlogPosts(JSON.parse(savedBlog));
    // Photos are now loaded from server via tRPC
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminSecretSession", JSON.stringify({ loggedIn: true }));
      setIsAuthenticated(true);
      loadAllData();
    } else {
      setError("Invalid password. Please try again.");
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

  const handlePhotoUpload = (url: string) => {
    // Refetch photos after upload
    photosQuery.refetch();
  };

  const deletePhoto = (id: number) => {
    if (confirm("Delete this photo?")) {
      deletePhotoMutation.mutate({ id });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const activeTabLabel =
    NAV_GROUPS.flatMap(g => g.items).find(i => i.id === activeTab)?.label ?? "Overview";

  const pieData = [
    { name: "Contacts", value: contacts.length || 1 },
    { name: "Quotes", value: quotes.length || 1 },
    { name: "Newsletter", value: subscribers.length || 1 },
    { name: "Blog", value: blogPosts.length || 1 },
  ];

  const total = contacts.length + quotes.length + subscribers.length + blogPosts.length;

  const barData = WEEK_DAYS.map((day, i) => ({
    day,
    value: [contacts.length, quotes.length, subscribers.length, blogPosts.length, 0, 0, 0][i] ?? 0,
  }));

  const chartConfig = {
    contacts: { label: "Contacts", color: CHART_COLORS[0] },
    quotes: { label: "Quotes", color: CHART_COLORS[1] },
    newsletter: { label: "Newsletter", color: CHART_COLORS[2] },
    blog: { label: "Blog", color: CHART_COLORS[3] },
    value: { label: "Count", color: CHART_COLORS[0] },
  };

  // ── Login Screen ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="bg-[#8B5CF6] p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-2xl font-bold tracking-tight">All Things Automated</span>
            </div>
            <p className="text-slate-400 text-sm">Admin Portal</p>
          </div>

          {/* Card */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 p-4 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h1 className="text-white text-2xl font-bold">Welcome back</h1>
              <p className="text-slate-400 text-sm mt-1">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white font-semibold rounded-xl transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#0F172A] flex flex-col z-30 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}
      >
        {/* Sidebar header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="bg-[#8B5CF6] p-1.5 rounded-lg shrink-0">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">All Things Automated</p>
            <p className="text-slate-400 text-xs">Smart Home Hub</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-slate-400 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {NAV_GROUPS.map(group => (
            <div key={group.label} className="mb-6">
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
                {group.label}
              </p>
              {group.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all
                      ${isActive
                        ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Admin Tools */}
          <div className="mb-6">
            <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
              TOOLS
            </p>
            <button
              onClick={() => navigate("/admin/price-manager")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Tag className="w-4 h-4 shrink-0" />
              Price Manager
            </button>
            <button
              onClick={() => navigate("/admin/blog-editor")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Plus className="w-4 h-4 shrink-0" />
              Blog Editor
            </button>
          </div>
        </nav>

        {/* User footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-[#8B5CF6] text-white text-sm font-bold">JR</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Jorge Romero</p>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="text-slate-400 hover:text-red-400 transition p-1"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

        {/* Top header */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-800 p-1"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-slate-500 hidden sm:flex">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-medium">{activeTabLabel}</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] w-52 transition"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition">
                <Bell size={20} />
              </button>
              {total > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8B5CF6] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {total > 9 ? "9+" : total}
                </span>
              )}
            </div>

            {/* Avatar */}
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarFallback className="bg-[#0F172A] text-white text-sm font-bold">JR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page body */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome banner */}
              <div className="relative bg-gradient-to-r from-[#0F172A] to-[#4c1d95] rounded-2xl p-6 lg:p-8 overflow-hidden">
                <div className="relative z-10">
                  <p className="text-slate-300 text-sm mb-1">
                    {formatDate(now)} · {formatTime(now)}
                  </p>
                  <h2 className="text-white text-2xl lg:text-3xl font-bold mb-1">Good day, Admin!</h2>
                  <p className="text-slate-300 text-sm">Here's what's happening with All Things Automated today.</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full" />
                <div className="absolute -right-4 -bottom-10 w-56 h-56 bg-[#8B5CF6]/20 rounded-full" />
                <Home className="absolute right-8 bottom-4 w-16 h-16 text-white/10" />
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Contact Submissions", value: contacts.length, icon: Mail, color: "bg-blue-100 text-blue-600", trend: "Form inquiries" },
                  { label: "Quote Requests", value: quotes.length, icon: FileText, color: "bg-purple-100 text-purple-600", trend: "Pricing requests" },
                  { label: "Subscribers", value: subscribers.length, icon: Zap, color: "bg-amber-100 text-amber-600", trend: "Newsletter list" },
                  { label: "Blog Posts", value: blogPosts.length, icon: MessageSquare, color: "bg-emerald-100 text-emerald-600", trend: "Published content" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <TrendingUp className="w-4 h-4 text-slate-300" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
                    <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{stat.trend}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Donut chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-slate-800">Submission Overview</h3>
                      <p className="text-slate-400 text-sm mt-0.5">All data categories</p>
                    </div>
                  </div>
                  <ChartContainer config={chartConfig} className="h-52">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {pieData.map((entry, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CHART_COLORS[i] }} />
                        <span className="text-slate-600 text-xs">{entry.name}</span>
                        <span className="text-slate-400 text-xs ml-auto font-medium">{entry.value === 1 && total === 0 ? 0 : entry.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-slate-400 text-xs">Total <strong className="text-slate-700">{total}</strong></span>
                  </div>
                </div>

                {/* Bar chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-slate-800">Weekly Activity</h3>
                      <p className="text-slate-400 text-sm mt-0.5">Entries per category</p>
                    </div>
                  </div>
                  <ChartContainer config={chartConfig} className="h-52">
                    <BarChart data={barData} barSize={24}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab("contacts")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition"
                  >
                    <Mail size={16} /> View Contacts
                  </button>
                  <button
                    onClick={() => setActiveTab("quotes")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium hover:bg-purple-100 transition"
                  >
                    <FileText size={16} /> View Quotes
                  </button>
                  <button
                    onClick={() => navigate("/admin/blog-editor")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100 transition"
                  >
                    <Plus size={16} /> New Blog Post
                  </button>
                  <button
                    onClick={() => navigate("/admin/price-manager")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-100 transition"
                  >
                    <Tag size={16} /> Manage Pricing
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── CONTACTS TAB ── */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Contact Submissions</h2>
                  <p className="text-slate-500 text-sm mt-0.5">{contacts.length} total submissions</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {contacts.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No contact submissions yet</p>
                    <p className="text-sm mt-1">Submissions from your contact form will appear here.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100 bg-slate-50">
                        <TableHead className="font-semibold text-slate-600">Name</TableHead>
                        <TableHead className="font-semibold text-slate-600">Email</TableHead>
                        <TableHead className="font-semibold text-slate-600 hidden md:table-cell">Phone</TableHead>
                        <TableHead className="font-semibold text-slate-600 hidden lg:table-cell">Message</TableHead>
                        <TableHead className="font-semibold text-slate-600 hidden sm:table-cell">Date</TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map(contact => (
                        <TableRow key={contact.id} className="border-slate-100 hover:bg-slate-50">
                          <TableCell className="font-medium text-slate-800">{contact.name}</TableCell>
                          <TableCell>
                            <a href={`mailto:${contact.email}`} className="text-[#8B5CF6] hover:underline text-sm">
                              {contact.email}
                            </a>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <a href={`tel:${contact.phone}`} className="text-slate-600 hover:text-slate-800 text-sm flex items-center gap-1">
                              <Phone size={13} /> {contact.phone}
                            </a>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-slate-500 text-sm max-w-xs truncate">
                            {contact.message}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-slate-400 text-sm">{contact.date}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          )}

          {/* ── QUOTES TAB ── */}
          {activeTab === "quotes" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Quote Requests</h2>
                <p className="text-slate-500 text-sm mt-0.5">{quotes.length} total requests</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {quotes.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No quote requests yet</p>
                    <p className="text-sm mt-1">Pricing quote submissions will appear here.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {quotes.map(quote => (
                      <div key={quote.id} className="p-6 hover:bg-slate-50 transition">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-800">{quote.name}</h3>
                            <p className="text-slate-400 text-sm">{quote.date}</p>
                          </div>
                          <button
                            onClick={() => deleteQuote(quote.id)}
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm mb-3">
                          <a href={`mailto:${quote.email}`} className="text-[#8B5CF6] hover:underline flex items-center gap-1">
                            <Mail size={13} /> {quote.email}
                          </a>
                          <a href={`tel:${quote.phone}`} className="text-slate-600 hover:text-slate-800 flex items-center gap-1">
                            <Phone size={13} /> {quote.phone}
                          </a>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {quote.services.map((service, i) => (
                            <Badge key={i} variant="secondary" className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-0 text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── NEWSLETTER TAB ── */}
          {activeTab === "newsletter" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Newsletter Subscribers</h2>
                <p className="text-slate-500 text-sm mt-0.5">{subscribers.length} active subscribers</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {subscribers.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <Zap className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No subscribers yet</p>
                    <p className="text-sm mt-1">Newsletter signups will appear here.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-100 bg-slate-50">
                        <TableHead className="font-semibold text-slate-600">Email</TableHead>
                        <TableHead className="font-semibold text-slate-600">Date Subscribed</TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map(sub => (
                        <TableRow key={sub.id} className="border-slate-100 hover:bg-slate-50">
                          <TableCell>
                            <a href={`mailto:${sub.email}`} className="text-[#8B5CF6] hover:underline text-sm">
                              {sub.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-slate-400 text-sm">{sub.date}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => deleteSubscriber(sub.id)}
                              className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          )}

          {/* ── BLOG TAB ── */}
          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Blog Posts</h2>
                  <p className="text-slate-500 text-sm mt-0.5">{blogPosts.length} published posts</p>
                </div>
                <button
                  onClick={() => navigate("/admin/blog-editor")}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#8B5CF6] text-white rounded-xl text-sm font-medium hover:bg-[#7c3aed] transition"
                >
                  <Plus size={16} /> New Post
                </button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {blogPosts.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No blog posts yet</p>
                    <button
                      onClick={() => navigate("/admin/blog-editor")}
                      className="mt-3 text-sm text-[#8B5CF6] hover:underline"
                    >
                      Create your first post →
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {blogPosts.map(post => (
                      <div key={post.id} className="p-6 hover:bg-slate-50 transition">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0 pr-4">
                            <h3 className="font-semibold text-slate-800 mb-2 truncate">{post.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 mb-2">
                              <Badge variant="secondary" className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-0 text-xs">
                                {post.category}
                              </Badge>
                              <span>{post.date}</span>
                              <span>by {post.author}</span>
                            </div>
                            <p className="text-slate-500 text-sm line-clamp-2">
                              {post.excerpt || post.content?.substring(0, 120)}...
                            </p>
                          </div>
                          <button
                            onClick={() => deleteBlogPost(post.id)}
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── MEDIA TAB ── */}
          {activeTab === "media" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Photo Manager</h2>
                <p className="text-slate-500 text-sm mt-0.5">Upload photos from your computer or phone</p>
              </div>

              {/* Upload section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Upload size={20} className="text-[#8B5CF6]" />
                  <h3 className="font-semibold text-slate-800">Upload New Photo</h3>
                </div>
                <PhotoUpload onUpload={handlePhotoUpload} />
              </div>

              {/* Photos grid */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {photos.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No photos uploaded yet</p>
                    <p className="text-sm mt-1">Upload your first photo above to get started.</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">{photos.length} Photos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {photos.map((photo: UploadedPhoto) => (
                        <div key={photo.id} className="group">
                          <div className="relative mb-3 rounded-lg overflow-hidden bg-slate-100">
                            <img
                              src={photo.s3Url}
                              alt={photo.filename}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center gap-2">
                              <button
                                onClick={() => copyToClipboard(photo.s3Url)}
                                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-white opacity-0 group-hover:opacity-100"
                                title="Copy URL"
                              >
                                {copiedUrl === photo.s3Url ? (
                                  <Check size={18} />
                                ) : (
                                  <Copy size={18} />
                                )}
                              </button>
                              <button
                                onClick={() => deletePhoto(photo.id)}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition text-white opacity-0 group-hover:opacity-100"
                                title="Delete"
                                disabled={deletePhotoMutation.isPending}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-800 truncate">{photo.filename}</p>
                            <p className="text-xs text-slate-400">
                              {new Date(photo.uploadedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                            <p className="text-xs text-slate-500 break-all font-mono">{photo.s3Url}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
