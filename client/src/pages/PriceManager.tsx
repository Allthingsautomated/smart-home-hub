import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  ArrowLeft,
  Download,
  DollarSign,
  Edit2,
  Eye,
  Plus,
  Save,
  Trash2,
  X,
  FileText,
  Users,
  BarChart3,
  Clock,
  Zap,
  Home,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: string;
}

interface Product {
  id: number;
  systemType: "caseta" | "ra3" | "homeworks";
  productType: "hub" | "dimmer" | "keypad" | "remote";
  name: string;
  price: number;
  description?: string;
}

interface LaborRate {
  id: number;
  clientType: "residential" | "commercial";
  hourlyRate: number;
  description?: string;
}

interface EstimateItem {
  type: "product" | "labor";
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface Estimate {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  title: string;
  description?: string;
  items: EstimateItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "accepted" | "declined";
  createdAt: string;
  expiresAt: string;
}

type TabType = "overview" | "estimates" | "quotes" | "clients" | "products" | "labor";
type EditingType = "product" | "labor" | "estimate" | null;

const SYSTEM_TYPES = ["caseta", "ra3", "homeworks"] as const;
const PRODUCT_TYPES = ["hub", "dimmer", "keypad", "remote"] as const;

const DEFAULT_PRODUCTS: Product[] = [
  { id: 1, systemType: "caseta", productType: "hub", name: "Smart Bridge", price: 99.99 },
  { id: 2, systemType: "caseta", productType: "dimmer", name: "Dimmer Switch", price: 89.99 },
  { id: 3, systemType: "caseta", productType: "keypad", name: "Keypad", price: 129.99 },
  { id: 4, systemType: "caseta", productType: "remote", name: "Pico Remote", price: 49.99 },
  { id: 5, systemType: "ra3", productType: "hub", name: "RA3 Bridge", price: 219.99 },
  { id: 6, systemType: "ra3", productType: "dimmer", name: "RA3 Dimmer", price: 199.99 },
  { id: 7, systemType: "homeworks", productType: "hub", name: "HomeWorks Hub", price: 1499.99 },
];

const DEFAULT_LABOR_RATES: LaborRate[] = [
  { id: 1, clientType: "residential", hourlyRate: 90 },
  { id: 2, clientType: "commercial", hourlyRate: 125 },
];

export default function PriceManager() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [products, setProducts] = useState<Product[]>([]);
  const [laborRates, setLaborRates] = useState<LaborRate[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editingType, setEditingType] = useState<EditingType>(null);
  const [error, setError] = useState("");
  const [editForm, setEditForm] = useState<any>({});

  // New estimate form
  const [showNewEstimate, setShowNewEstimate] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [estimateTitle, setEstimateTitle] = useState("");
  const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([]);
  const [taxRate, setTaxRate] = useState(0);

  // New client form
  const [showNewClient, setShowNewClient] = useState(false);
  const [newClientForm, setNewClientForm] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const stored = {
        products: localStorage.getItem("pm_products"),
        laborRates: localStorage.getItem("pm_laborRates"),
        clients: localStorage.getItem("pm_clients"),
        estimates: localStorage.getItem("pm_estimates"),
      };

      setProducts(stored.products ? JSON.parse(stored.products) : DEFAULT_PRODUCTS);
      setLaborRates(stored.laborRates ? JSON.parse(stored.laborRates) : DEFAULT_LABOR_RATES);
      setClients(stored.clients ? JSON.parse(stored.clients) : []);
      setEstimates(stored.estimates ? JSON.parse(stored.estimates) : []);
    } catch {
      setError("Failed to load data");
    }
  };

  const saveData = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      setError("Failed to save data");
    }
  };

  const addClient = () => {
    if (!newClientForm.name || !newClientForm.email || !newClientForm.phone) {
      setError("Please fill in all required fields");
      return;
    }

    const newClient: Client = {
      id: `client_${Date.now()}`,
      ...newClientForm,
      createdAt: new Date().toISOString(),
    };

    const updated = [...clients, newClient];
    setClients(updated);
    saveData("pm_clients", updated);
    setNewClientForm({ name: "", email: "", phone: "", address: "" });
    setShowNewClient(false);
    setError("");
  };

  const deleteClient = (id: string) => {
    if (confirm("Delete this client? Associated estimates will remain.")) {
      const updated = clients.filter(c => c.id !== id);
      setClients(updated);
      saveData("pm_clients", updated);
    }
  };

  const createEstimate = () => {
    if (!selectedClient || !estimateTitle || estimateItems.length === 0) {
      setError("Please select a client, add a title, and at least one item");
      return;
    }

    const subtotal = estimateItems.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    const newEstimate: Estimate = {
      id: `est_${Date.now()}`,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      clientEmail: selectedClient.email,
      clientPhone: selectedClient.phone,
      title: estimateTitle,
      items: estimateItems,
      subtotal,
      tax,
      total,
      status: "draft",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const updated = [...estimates, newEstimate];
    setEstimates(updated);
    saveData("pm_estimates", updated);
    resetEstimateForm();
    setError("");
  };

  const resetEstimateForm = () => {
    setShowNewEstimate(false);
    setSelectedClient(null);
    setEstimateTitle("");
    setEstimateItems([]);
    setTaxRate(0);
  };

  const deleteEstimate = (id: string) => {
    if (confirm("Delete this estimate?")) {
      const updated = estimates.filter(e => e.id !== id);
      setEstimates(updated);
      saveData("pm_estimates", updated);
    }
  };

  const downloadEstimatePDF = (estimate: Estimate) => {
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; color: #8B5CF6; }
            .logo { font-size: 24px; font-weight: bold; color: #8B5CF6; margin-bottom: 10px; }
            .client-info { margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 5px; }
            .client-info h3 { margin: 0 0 10px 0; }
            .client-info p { margin: 5px 0; }
            .estimate-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .estimate-table th { background: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
            .estimate-table td { padding: 10px; border-bottom: 1px solid #eee; }
            .estimate-table .amount { text-align: right; }
            .totals { margin-top: 20px; text-align: right; }
            .totals p { margin: 10px 0; font-size: 14px; }
            .totals .total { font-size: 20px; font-weight: bold; color: #8B5CF6; margin-top: 10px; padding-top: 10px; border-top: 2px solid #ddd; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">All Things Automated</div>
            <h1>ESTIMATE</h1>
            <p>${estimate.title}</p>
          </div>

          <div class="client-info">
            <h3>Client Information</h3>
            <p><strong>${estimate.clientName}</strong></p>
            <p>Email: ${estimate.clientEmail}</p>
            <p>Phone: ${estimate.clientPhone}</p>
          </div>

          <table class="estimate-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="amount">Quantity</th>
                <th class="amount">Unit Price</th>
                <th class="amount">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${estimate.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td class="amount">${item.quantity}</td>
                  <td class="amount">$${item.unitPrice.toFixed(2)}</td>
                  <td class="amount">$${item.subtotal.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <p>Subtotal: <strong>$${estimate.subtotal.toFixed(2)}</strong></p>
            ${estimate.tax > 0 ? `<p>Tax: <strong>$${estimate.tax.toFixed(2)}</strong></p>` : ''}
            <div class="total">Total: $${estimate.total.toFixed(2)}</div>
          </div>

          <div class="footer">
            <p>This estimate is valid until ${new Date(estimate.expiresAt).toLocaleDateString()}</p>
            <p>Created on ${new Date(estimate.createdAt).toLocaleDateString()}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "", "height=600,width=800");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 250);
    }
  };

  const exportClients = () => {
    const csv = [
      ["Name", "Email", "Phone", "Address", "Created Date"],
      ...clients.map(c => [
        c.name,
        c.email,
        c.phone,
        c.address || "",
        new Date(c.createdAt).toLocaleDateString(),
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clients_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const startEdit = (item: Product | LaborRate, type: EditingType) => {
    setEditingId(item.id);
    setEditingType(type);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingType(null);
    setEditForm({});
  };

  const saveEdit = () => {
    try {
      if (editingType === "product") {
        const updated = products.map(p => p.id === editingId ? editForm : p);
        setProducts(updated);
        saveData("pm_products", updated);
      } else if (editingType === "labor") {
        const updated = laborRates.map(lr => lr.id === editingId ? editForm : lr);
        setLaborRates(updated);
        saveData("pm_laborRates", updated);
      }
      cancelEdit();
      setError("");
    } catch (err) {
      setError("Failed to save changes");
    }
  };

  const deleteItem = (id: number, type: EditingType) => {
    if (confirm("Delete this item?")) {
      if (type === "product") {
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        saveData("pm_products", updated);
      } else if (type === "labor") {
        const updated = laborRates.filter(lr => lr.id !== id);
        setLaborRates(updated);
        saveData("pm_laborRates", updated);
      }
    }
  };

  // Stats
  const totalClients = clients.length;
  const totalEstimates = estimates.length;
  const totalRevenue = estimates
    .filter(e => e.status === "accepted")
    .reduce((sum, e) => sum + e.total, 0);
  const pendingEstimates = estimates.filter(e => e.status === "draft").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/admin-all-things-automated-secret")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-[#8B5CF6] p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Price Manager</h1>
            </div>
            <div className="w-40" />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "estimates", label: "Estimates", icon: FileText },
              { id: "clients", label: "Clients", icon: Users },
              { id: "products", label: "Pricing", icon: Zap },
              { id: "labor", label: "Labor Rates", icon: Clock },
            ].map(tab => {
              const Icon = tab.icon as any;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Clients", value: totalClients, icon: Users, color: "bg-blue-100 text-blue-600" },
                { label: "Total Estimates", value: totalEstimates, icon: FileText, color: "bg-purple-100 text-purple-600" },
                { label: "Pending Estimates", value: pendingEstimates, icon: Clock, color: "bg-amber-100 text-amber-600" },
                { label: "Revenue (Accepted)", value: `$${totalRevenue.toFixed(0)}`, icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
              ].map((stat, i) => {
                const Icon = stat.icon as any;
                return (
                  <div key={i} className="bg-white rounded-lg p-6 shadow border border-slate-100">
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Estimates */}
              <div className="bg-white rounded-lg shadow border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Estimates</h2>
                {estimates.length === 0 ? (
                  <p className="text-slate-400 text-sm">No estimates yet</p>
                ) : (
                  <div className="space-y-3">
                    {estimates.slice(-5).reverse().map(est => (
                      <div key={est.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{est.title}</p>
                          <p className="text-slate-500 text-xs">{est.clientName}</p>
                        </div>
                        <Badge className={est.status === "draft" ? "bg-yellow-100 text-yellow-800 border-0" : "bg-green-100 text-green-800 border-0"}>
                          {est.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowNewClient(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Client
                  </Button>
                  <Button
                    onClick={() => {
                      setShowNewEstimate(true);
                      setActiveTab("estimates");
                    }}
                    className="w-full bg-[#8B5CF6] hover:bg-[#7c3aed] justify-start"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Estimate
                  </Button>
                  <Button
                    onClick={exportClients}
                    disabled={clients.length === 0}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 justify-start disabled:opacity-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Clients
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ESTIMATES TAB */}
        {activeTab === "estimates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Estimates</h2>
                <p className="text-slate-500 text-sm mt-1">{estimates.length} total estimates</p>
              </div>
              <Button
                onClick={() => setShowNewEstimate(true)}
                className="bg-[#8B5CF6] hover:bg-[#7c3aed] flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Estimate
              </Button>
            </div>

            {/* New Estimate Form */}
            {showNewEstimate && (
              <div className="bg-white rounded-lg shadow border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Create New Estimate</h3>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Select Client</label>
                      <select
                        value={selectedClient?.id || ""}
                        onChange={e => {
                          const client = clients.find(c => c.id === e.target.value);
                          setSelectedClient(client || null);
                        }}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      >
                        <option value="">Choose a client...</option>
                        {clients.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Estimate Title</label>
                      <input
                        type="text"
                        value={estimateTitle}
                        onChange={e => setEstimateTitle(e.target.value)}
                        placeholder="e.g., Smart Home Installation"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />
                    </div>
                  </div>

                  {/* Add Items */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Items</label>
                    <div className="space-y-2 mb-4">
                      {estimateItems.map((item, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                            <p className="text-slate-500 text-xs">{item.quantity} × ${item.unitPrice.toFixed(2)} = ${item.subtotal.toFixed(2)}</p>
                          </div>
                          <button
                            onClick={() => setEstimateItems(estimateItems.filter((_, idx) => idx !== i))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Item Form */}
                    <div className="grid md:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-lg">
                      <input
                        type="text"
                        placeholder="Item name"
                        id="item-name"
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Quantity"
                        id="item-qty"
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Unit price"
                        id="item-price"
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />
                      <Button
                        onClick={() => {
                          const name = (document.getElementById("item-name") as HTMLInputElement)?.value;
                          const qty = parseFloat((document.getElementById("item-qty") as HTMLInputElement)?.value || "0");
                          const price = parseFloat((document.getElementById("item-price") as HTMLInputElement)?.value || "0");

                          if (name && qty > 0 && price > 0) {
                            setEstimateItems([
                              ...estimateItems,
                              { type: "product", name, quantity: qty, unitPrice: price, subtotal: qty * price },
                            ]);
                            (document.getElementById("item-name") as HTMLInputElement).value = "";
                            (document.getElementById("item-qty") as HTMLInputElement).value = "";
                            (document.getElementById("item-price") as HTMLInputElement).value = "";
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={e => setTaxRate(parseFloat(e.target.value))}
                      className="w-full md:w-40 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={createEstimate}
                      className="bg-[#8B5CF6] hover:bg-[#7c3aed] flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Create Estimate
                    </Button>
                    <Button onClick={resetEstimateForm} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Estimates List */}
            <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
              {estimates.length === 0 ? (
                <div className="py-16 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400">No estimates yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {estimates.map(est => (
                        <TableRow key={est.id}>
                          <TableCell className="font-semibold text-slate-800">{est.title}</TableCell>
                          <TableCell className="text-slate-600">{est.clientName}</TableCell>
                          <TableCell className="font-semibold text-slate-800">${est.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge className={est.status === "draft" ? "bg-yellow-100 text-yellow-800 border-0" : "bg-green-100 text-green-800 border-0"}>
                              {est.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-500 text-sm">{new Date(est.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <button
                                onClick={() => downloadEstimatePDF(est)}
                                className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                                title="Download PDF"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteEstimate(est.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CLIENTS TAB */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Clients</h2>
                <p className="text-slate-500 text-sm mt-1">{clients.length} total clients</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={exportClients}
                  disabled={clients.length === 0}
                  className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
                <Button
                  onClick={() => setShowNewClient(true)}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Client
                </Button>
              </div>
            </div>

            {/* New Client Form */}
            {showNewClient && (
              <div className="bg-white rounded-lg shadow border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Add New Client</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={newClientForm.name}
                    onChange={e => setNewClientForm({ ...newClientForm, name: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={newClientForm.email}
                    onChange={e => setNewClientForm({ ...newClientForm, email: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={newClientForm.phone}
                    onChange={e => setNewClientForm({ ...newClientForm, phone: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={newClientForm.address}
                    onChange={e => setNewClientForm({ ...newClientForm, address: e.target.value })}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={addClient} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Client
                  </Button>
                  <Button onClick={() => setShowNewClient(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Clients List */}
            <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
              {clients.length === 0 ? (
                <div className="py-16 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400">No clients yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clients.map(client => (
                        <TableRow key={client.id}>
                          <TableCell className="font-semibold text-slate-800">{client.name}</TableCell>
                          <TableCell className="text-slate-600">{client.email}</TableCell>
                          <TableCell className="text-slate-600">{client.phone}</TableCell>
                          <TableCell className="text-slate-600 text-sm">{client.address || "—"}</TableCell>
                          <TableCell className="text-slate-500 text-sm">{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <button
                              onClick={() => deleteClient(client.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Equipment Pricing</h2>
              <p className="text-slate-500 text-sm mt-1">Manage prices for all Lutron system types</p>
            </div>

            {SYSTEM_TYPES.map(systemType => (
              <div key={systemType} className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b">
                  <h3 className="font-bold text-slate-800 capitalize text-lg">{systemType}</h3>
                </div>
                <div className="divide-y">
                  {products
                    .filter(p => p.systemType === systemType)
                    .map(product => (
                      <div
                        key={product.id}
                        className={`p-6 hover:bg-slate-50 transition ${
                          editingId === product.id ? "bg-blue-50" : ""
                        }`}
                      >
                        {editingId === product.id && editingType === "product" ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                placeholder="Product name"
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                              />
                              <input
                                type="number"
                                step="0.01"
                                value={editForm.price}
                                onChange={e => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                                placeholder="Price"
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                              />
                            </div>
                            <textarea
                              value={editForm.description || ""}
                              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                              placeholder="Description (optional)"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                              rows={2}
                            />
                            <div className="flex gap-2">
                              <Button
                                onClick={saveEdit}
                                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                                size="sm"
                              >
                                <Save className="w-4 h-4" />
                                Save
                              </Button>
                              <Button onClick={cancelEdit} variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800">{product.name}</h4>
                              {product.description && (
                                <p className="text-sm text-slate-500 mt-1">{product.description}</p>
                              )}
                              <Badge className="mt-2 bg-[#8B5CF6]/10 text-[#8B5CF6] border-0 capitalize">
                                {product.productType}
                              </Badge>
                            </div>
                            <div className="text-right mr-6">
                              <p className="text-2xl font-bold text-slate-800">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => startEdit(product, "product")}
                                className="p-2 text-slate-500 hover:text-[#8B5CF6] hover:bg-slate-100 rounded-lg transition"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteItem(product.id, "product")}
                                className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-100 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LABOR RATES TAB */}
        {activeTab === "labor" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Labor Rates</h2>
              <p className="text-slate-500 text-sm mt-1">Manage hourly labor rates by client type</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-slate-100 overflow-hidden">
              <div className="divide-y">
                {laborRates.map(rate => (
                  <div
                    key={rate.id}
                    className={`p-6 hover:bg-slate-50 transition ${
                      editingId === rate.id ? "bg-blue-50" : ""
                    }`}
                  >
                    {editingId === rate.id && editingType === "labor" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <select
                            value={editForm.clientType}
                            onChange={e => setEditForm({ ...editForm, clientType: e.target.value })}
                            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                          >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                          </select>
                          <input
                            type="number"
                            step="0.01"
                            value={editForm.hourlyRate}
                            onChange={e =>
                              setEditForm({ ...editForm, hourlyRate: parseFloat(e.target.value) })
                            }
                            placeholder="Hourly rate"
                            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={saveEdit}
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                            size="sm"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                          <Button onClick={cancelEdit} variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 capitalize">{rate.clientType}</h4>
                          {rate.description && (
                            <p className="text-sm text-slate-500 mt-1">{rate.description}</p>
                          )}
                        </div>
                        <div className="text-right mr-6">
                          <p className="text-2xl font-bold text-slate-800">
                            ${rate.hourlyRate.toFixed(2)}/hr
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(rate, "labor")}
                            className="p-2 text-slate-500 hover:text-[#8B5CF6] hover:bg-slate-100 rounded-lg transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(rate.id, "labor")}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-slate-100 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
