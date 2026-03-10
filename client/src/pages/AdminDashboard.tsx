import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  PenSquare,
  Receipt,
  BarChart2,
  Download,
  Plus,
  Trash2,
  Save,
  Upload,
  X,
  ChevronRight,
  Users,
  DollarSign,
  ClipboardList,
  Share2,
} from "lucide-react";
import ServicePageHeader from "@/components/ServicePageHeader";
import { useLocation } from "wouter";
import { ROUTES } from "@/lib/routes";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "overview" | "blog" | "contracts" | "invoices" | "leads" | "social";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  content: string;
  published: boolean;
}

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  message: string;
  date: string;
}

interface ContractField {
  id: string;
  label: string;
  value: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

// ─── Sample data ──────────────────────────────────────────────────────────────

const sampleLeads: Lead[] = [
  { id: 1, name: "Michael Torres", email: "m.torres@email.com", phone: "(941) 555-0192", address: "123 Palmetto Ave, Naples FL 34102", service: "Smart Lighting", message: "Interested in full home lighting upgrade", date: "2026-03-01" },
  { id: 2, name: "Sarah Williams", email: "sarah.w@email.com", phone: "(941) 555-0284", address: "456 Gulf Shore Blvd, Naples FL 34108", service: "Home Security", message: "Need cameras and door locks", date: "2026-03-04" },
  { id: 3, name: "David Kim", email: "d.kim@email.com", phone: "(941) 555-0371", address: "789 Vanderbilt Rd, Naples FL 34120", service: "Networks", message: "Office networking for new build", date: "2026-03-07" },
];

const initialBlogPosts: BlogPost[] = [
  { id: 1, title: "The Complete Guide to Smart Lighting Systems", category: "Smart Lighting", date: "2026-02-20", content: "Smart lighting has transformed how we interact with our homes...", published: true },
  { id: 2, title: "Home Automation Trends for 2026", category: "Home Automation", date: "2026-02-15", content: "As we move into 2026, home automation continues to evolve...", published: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function downloadCSV(data: Lead[], filename: string) {
  const headers = ["Name", "Email", "Phone", "Address", "Service", "Message", "Date"];
  const rows = data.map(l => [l.name, l.email, l.phone, l.address, l.service, l.message, l.date]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function downloadText(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ─── Overview ─────────────────────────────────────────────────────────────────

function OverviewPanel({ leads, posts, setTab }: { leads: Lead[]; posts: BlogPost[]; setTab: (t: Tab) => void }) {
  const cards = [
    { icon: Users, label: "Total Leads", value: leads.length, color: "text-blue-600", bg: "bg-blue-50", tab: "leads" as Tab },
    { icon: PenSquare, label: "Blog Posts", value: posts.length, color: "text-green-600", bg: "bg-green-50", tab: "blog" as Tab },
    { icon: DollarSign, label: "Invoices", value: 0, color: "text-amber-600", bg: "bg-amber-50", tab: "invoices" as Tab },
    { icon: ClipboardList, label: "Contracts", value: 0, color: "text-purple-600", bg: "bg-purple-50", tab: "contracts" as Tab },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(c => {
          const Icon = c.icon;
          return (
            <button key={c.label} onClick={() => setTab(c.tab)} className="text-left">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`${c.bg} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${c.color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{c.value}</div>
                  <div className="text-sm text-muted-foreground">{c.label}</div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <h3 className="text-lg font-semibold mb-4">Recent Leads</h3>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Service</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Date</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map(lead => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-4">
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{lead.service}</td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{lead.date}</td>
                  <td className="p-4 text-right">
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function BlogPanel({ posts, setPosts }: { posts: BlogPost[]; setPosts: (p: BlogPost[]) => void }) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [creating, setCreating] = useState(false);
  const blank: BlogPost = { id: Date.now(), title: "", category: "Home Automation", date: new Date().toISOString().slice(0, 10), content: "", published: false };

  const save = (post: BlogPost) => {
    if (posts.find(p => p.id === post.id)) {
      setPosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      setPosts([...posts, post]);
    }
    setEditing(null);
    setCreating(false);
  };

  const del = (id: number) => setPosts(posts.filter(p => p.id !== id));

  if (editing || creating) {
    const post = editing ?? blank;
    return <PostEditor post={post} onSave={save} onCancel={() => { setEditing(null); setCreating(false); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button onClick={() => setCreating(true)} className="rounded-full">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>
      <div className="space-y-3">
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{post.title || "Untitled"}</div>
                <div className="text-sm text-muted-foreground">{post.category} · {post.date}</div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                {post.published ? "Published" : "Draft"}
              </span>
              <Button size="sm" variant="ghost" onClick={() => setEditing(post)}>Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => del(post.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && <p className="text-muted-foreground text-center py-12">No posts yet. Create your first post.</p>}
      </div>
    </div>
  );
}

function PostEditor({ post: initial, onSave, onCancel }: { post: BlogPost; onSave: (p: BlogPost) => void; onCancel: () => void }) {
  const [post, setPost] = useState<BlogPost>(initial);
  const set = (k: keyof BlogPost, v: string | boolean) => setPost(prev => ({ ...prev, [k]: v }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        <h2 className="text-2xl font-bold">{initial.title ? "Edit Post" : "New Post"}</h2>
      </div>
      <div className="space-y-5 max-w-2xl">
        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <input className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={post.title} onChange={e => set("title", e.target.value)} placeholder="Post title..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <select className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none" value={post.category} onChange={e => set("category", e.target.value)}>
              {["Smart Lighting", "Home Security", "Climate Control", "Voice Integration", "Networks", "Home Audio", "Commercial", "Energy Efficiency", "Home Automation", "Product Comparison"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <input type="date" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none" value={post.date} onChange={e => set("date", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Content</label>
          <textarea className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[280px] resize-y" value={post.content} onChange={e => set("content", e.target.value)} placeholder="Write your article here..." />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="published" checked={post.published} onChange={e => set("published", e.target.checked)} className="w-4 h-4" />
          <label htmlFor="published" className="text-sm font-medium">Publish to website</label>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => onSave(post)} className="rounded-full px-8"><Save className="w-4 h-4 mr-2" /> Save Post</Button>
          <Button variant="outline" onClick={onCancel} className="rounded-full">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Contracts ────────────────────────────────────────────────────────────────

function ContractsPanel({ leads }: { leads: Lead[] }) {
  const [step, setStep] = useState<"form" | "preview">("form");
  const [template, setTemplate] = useState<string | null>(null);
  const [fields, setFields] = useState<ContractField[]>([
    { id: "client", label: "Client Name", value: "" },
    { id: "email", label: "Email", value: "" },
    { id: "address", label: "Property Address", value: "" },
    { id: "service", label: "Service Type", value: "" },
    { id: "amount", label: "Contract Amount ($)", value: "" },
    { id: "start", label: "Start Date", value: "" },
    { id: "notes", label: "Project Notes", value: "" },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);

  const setField = (id: string, value: string) => setFields(fields.map(f => f.id === id ? { ...f, value } : f));
  const fillFromLead = (lead: Lead) => setFields(fields.map(f =>
    f.id === "client" ? { ...f, value: lead.name } :
    f.id === "email" ? { ...f, value: lead.email } :
    f.id === "address" ? { ...f, value: lead.address } :
    f.id === "service" ? { ...f, value: lead.service } : f
  ));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setTemplate(ev.target?.result as string);
    reader.readAsText(file);
  };

  const get = (id: string) => fields.find(f => f.id === id)?.value ?? "";

  const contractText = template
    ? template
        .replace(/\[CLIENT\]/gi, get("client"))
        .replace(/\[EMAIL\]/gi, get("email"))
        .replace(/\[ADDRESS\]/gi, get("address"))
        .replace(/\[SERVICE\]/gi, get("service"))
        .replace(/\[AMOUNT\]/gi, get("amount"))
        .replace(/\[DATE\]/gi, get("start"))
    : `SERVICE CONTRACT
All Things Automated
───────────────────────────────────────────

CLIENT: ${get("client")}
EMAIL: ${get("email")}
ADDRESS: ${get("address")}
SERVICE: ${get("service")}
AMOUNT: $${get("amount")}
START DATE: ${get("start")}

PROJECT NOTES:
${get("notes")}

───────────────────────────────────────────
TERMS & CONDITIONS

1. All work will be performed by licensed, insured technicians.
2. Payment is due upon completion unless otherwise agreed in writing.
3. All equipment carries manufacturer warranty; labor warranty: 1 year.
4. Any changes to scope must be agreed in writing before work begins.
5. All Things Automated is not responsible for pre-existing wiring issues.

───────────────────────────────────────────
SIGNATURES

Client: _______________________________  Date: ____________

All Things Automated: _________________  Date: ____________
`;

  if (step === "preview") {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setStep("form")} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          <h2 className="text-2xl font-bold">Contract Preview</h2>
        </div>
        <pre className="bg-muted/30 border border-border rounded-xl p-8 text-sm font-mono whitespace-pre-wrap leading-relaxed mb-6 max-h-[500px] overflow-y-auto">
          {contractText}
        </pre>
        <div className="flex gap-3">
          <Button className="rounded-full" onClick={() => downloadText(contractText, `contract-${get("client").replace(/\s+/g, "-") || "client"}.txt`)}>
            <Download className="w-4 h-4 mr-2" /> Download Contract
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => setStep("form")}>Edit</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Create Contract</h2>
        <Button variant="outline" className="rounded-full" onClick={() => fileRef.current?.click()}>
          <Upload className="w-4 h-4 mr-2" /> Upload Template
        </Button>
        <input ref={fileRef} type="file" accept=".txt,.md" className="hidden" onChange={handleUpload} />
      </div>

      {template && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700 mb-6 flex items-center justify-between">
          <span>Custom template loaded — [CLIENT], [EMAIL], [ADDRESS], [SERVICE], [AMOUNT], [DATE] will be replaced.</span>
          <button onClick={() => setTemplate(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {leads.length > 0 && (
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Fill from lead</label>
          <select className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none w-full max-w-sm" defaultValue="" onChange={e => {
            const lead = leads.find(l => l.id === Number(e.target.value));
            if (lead) fillFromLead(lead);
          }}>
            <option value="">Select a lead to prefill...</option>
            {leads.map(l => <option key={l.id} value={l.id}>{l.name} — {l.service}</option>)}
          </select>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5 max-w-2xl mb-8">
        {fields.map(f => (
          <div key={f.id} className={f.id === "notes" ? "md:col-span-2" : ""}>
            <label className="text-sm font-medium mb-2 block">{f.label}</label>
            {f.id === "notes"
              ? <textarea className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[100px] resize-y" value={f.value} onChange={e => setField(f.id, e.target.value)} />
              : <input className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={f.value} onChange={e => setField(f.id, e.target.value)} />
            }
          </div>
        ))}
      </div>
      <Button className="rounded-full px-8" onClick={() => setStep("preview")}>
        <FileText className="w-4 h-4 mr-2" /> Preview Contract
      </Button>
    </div>
  );
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

function InvoicesPanel({ leads }: { leads: Lead[] }) {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Smart Lighting Installation", qty: 1, rate: 1500 },
  ]);
  const [client, setClient] = useState({ name: "", email: "", address: "" });
  const [invoiceNum, setInvoiceNum] = useState("INV-001");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState(false);

  const addItem = () => setItems([...items, { id: String(Date.now()), description: "", qty: 1, rate: 0 }]);
  const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));
  const updateItem = (id: string, key: keyof InvoiceItem, val: string | number) =>
    setItems(items.map(i => i.id === id ? { ...i, [key]: val } : i));

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const fillFromLead = (lead: Lead) => setClient({ name: lead.name, email: lead.email, address: lead.address });

  const invoiceText = `INVOICE ${invoiceNum}
All Things Automated
(941) 263-5325 | office@allthingsautomated.org
───────────────────────────────────────────

BILL TO:
${client.name}
${client.email}
${client.address}

DUE DATE: ${dueDate || "Upon Receipt"}

SERVICES:
${items.map(i => `  ${i.description.padEnd(40)} ${i.qty} x $${i.rate.toFixed(2)} = $${(i.qty * i.rate).toFixed(2)}`).join("\n")}

───────────────────────────────────────────
  Subtotal:  $${subtotal.toFixed(2)}
  Tax (7%):  $${tax.toFixed(2)}
  TOTAL:     $${total.toFixed(2)}
───────────────────────────────────────────

NOTES: ${notes || "Thank you for your business!"}

Payment accepted: Check, ACH, or Credit Card.
`;

  if (preview) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setPreview(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          <h2 className="text-2xl font-bold">Invoice Preview</h2>
        </div>
        <pre className="bg-muted/30 border border-border rounded-xl p-8 text-sm font-mono whitespace-pre-wrap leading-relaxed mb-6 max-h-[500px] overflow-y-auto">
          {invoiceText}
        </pre>
        <div className="flex gap-3">
          <Button className="rounded-full" onClick={() => downloadText(invoiceText, `${invoiceNum}.txt`)}>
            <Download className="w-4 h-4 mr-2" /> Download Invoice
          </Button>
          <Button variant="outline" className="rounded-full" onClick={() => setPreview(false)}>Edit</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Create Invoice</h2>
      </div>

      <div className="max-w-2xl space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Invoice #</label>
            <input className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={invoiceNum} onChange={e => setInvoiceNum(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Due Date</label>
            <input type="date" className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>
        </div>

        {leads.length > 0 && (
          <div>
            <label className="text-sm font-medium mb-2 block">Fill from lead</label>
            <select className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none w-full" defaultValue="" onChange={e => {
              const l = leads.find(x => x.id === Number(e.target.value));
              if (l) fillFromLead(l);
            }}>
              <option value="">Select a lead...</option>
              {leads.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
        )}

        <div className="space-y-4">
          {(["name", "email", "address"] as const).map(k => (
            <div key={k}>
              <label className="text-sm font-medium mb-2 block">{k === "name" ? "Client Name" : k === "email" ? "Client Email" : "Client Address"}</label>
              <input className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" value={client[k]} onChange={e => setClient({ ...client, [k]: e.target.value })} />
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Line Items</label>
            <Button size="sm" variant="outline" onClick={addItem} className="rounded-full">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Item
            </Button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground px-1">
              <span className="col-span-6">Description</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-3 text-right">Rate ($)</span>
              <span className="col-span-1"></span>
            </div>
            {items.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                <input className="col-span-6 border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none" value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)} placeholder="Service description" />
                <input type="number" className="col-span-2 border border-border rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none" value={item.qty} min={1} onChange={e => updateItem(item.id, "qty", Number(e.target.value))} />
                <input type="number" className="col-span-3 border border-border rounded-lg px-3 py-2.5 text-sm text-right focus:outline-none" value={item.rate} onChange={e => updateItem(item.id, "rate", Number(e.target.value))} />
                <button onClick={() => removeItem(item.id)} className="col-span-1 flex justify-center"><Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" /></button>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/40 space-y-1 text-sm text-right">
            <div className="text-muted-foreground">Subtotal: <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span></div>
            <div className="text-muted-foreground">Tax (7%): <span className="text-foreground font-medium">${tax.toFixed(2)}</span></div>
            <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Notes</label>
          <textarea className="w-full border border-border rounded-lg px-4 py-3 text-sm focus:outline-none resize-y min-h-[80px]" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Payment terms, additional notes..." />
        </div>

        <Button className="rounded-full px-8" onClick={() => setPreview(true)}>
          <Receipt className="w-4 h-4 mr-2" /> Preview Invoice
        </Button>
      </div>
    </div>
  );
}

// ─── Leads ────────────────────────────────────────────────────────────────────

function LeadsPanel({ leads }: { leads: Lead[] }) {
  const [selected, setSelected] = useState<Lead | null>(null);
  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });

  if (selected) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
          <h2 className="text-2xl font-bold">Lead Details</h2>
        </div>
        <Card className="max-w-lg">
          <CardContent className="p-8 space-y-4">
            {([
              ["Name", selected.name],
              ["Email", selected.email],
              ["Phone", selected.phone],
              ["Address", selected.address],
              ["Service Requested", selected.service],
              ["Date", selected.date],
              ["Message", selected.message],
            ] as [string, string][]).map(([label, val]) => (
              <div key={label}>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
                <div className="text-sm">{val}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Leads & Inquiries</h2>
        <Button variant="outline" className="rounded-full" onClick={() => downloadCSV(leads, `leads-${month.replace(" ", "-")}.csv`)}>
          <Download className="w-4 h-4 mr-2" /> Export CSV ({month})
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Service</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Email</th>
                <th className="text-left p-4 font-semibold hidden lg:table-cell">Date</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/20 cursor-pointer" onClick={() => setSelected(lead)}>
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4 hidden sm:table-cell text-muted-foreground">{lead.service}</td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{lead.email}</td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">{lead.date}</td>
                  <td className="p-4 text-right"><ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-4">Click any row to view full details. Export CSV downloads all leads for this month.</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [, setLocation] = useLocation();
  const leads = sampleLeads;

  const navItems: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview", label: "Overview", icon: BarChart2 },
    { key: "blog", label: "Blog", icon: PenSquare },
    { key: "contracts", label: "Contracts", icon: FileText },
    { key: "invoices", label: "Invoices", icon: Receipt },
    { key: "leads", label: "Leads", icon: Users },
    { key: "social", label: "Social Media", icon: Share2 },
  ];

  const handleTabClick = (key: Tab) => {
    if (key === "social") {
      setLocation(ROUTES.adminSocialConnections);
    } else {
      setTab(key);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ServicePageHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-border/60 py-8 px-4 shrink-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6 px-2">Admin</p>
          <nav className="space-y-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  tab === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/60 flex">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => handleTabClick(key)} className={`flex-1 flex flex-col items-center py-3 text-xs gap-1 ${tab === key ? "text-primary" : "text-muted-foreground"}`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 overflow-y-auto">
          {tab === "overview" && <OverviewPanel leads={leads} posts={posts} setTab={setTab} />}
          {tab === "blog" && <BlogPanel posts={posts} setPosts={setPosts} />}
          {tab === "contracts" && <ContractsPanel leads={leads} />}
          {tab === "invoices" && <InvoicesPanel leads={leads} />}
          {tab === "leads" && <LeadsPanel leads={leads} />}
        </main>
      </div>
    </div>
  );
}
