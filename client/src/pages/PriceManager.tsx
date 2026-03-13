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
  DollarSign,
  Edit2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

interface PricingProduct {
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

type TabType = "products" | "labor" | "calculator";
type EditingType = "product" | "labor" | null;

const SYSTEM_TYPES = ["caseta", "ra3", "homeworks"] as const;
const PRODUCT_TYPES = ["hub", "dimmer", "keypad", "remote"] as const;

export default function PriceManager() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("products");
  const [products, setProducts] = useState<PricingProduct[]>([]);
  const [laborRates, setLaborRates] = useState<LaborRate[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<EditingType>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculator state
  const [selectedSystem, setSelectedSystem] = useState<"caseta" | "ra3" | "homeworks">("caseta");
  const [quantities, setQuantities] = useState({ hub: 0, dimmer: 0, keypad: 0, remote: 0 });
  const [laborHours, setLaborHours] = useState(2);
  const [selectedLaborType, setSelectedLaborType] = useState<"residential" | "commercial">("residential");

  // Edit form state
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // In a real scenario, fetch from your API
      // For now, use mock data
      setProducts([
        { id: 1, systemType: "caseta", productType: "hub", name: "Smart Bridge", price: 99.99 },
        { id: 2, systemType: "caseta", productType: "dimmer", name: "Dimmer Switch", price: 89.99 },
        { id: 3, systemType: "caseta", productType: "keypad", name: "Keypad", price: 129.99 },
        { id: 4, systemType: "caseta", productType: "remote", name: "Pico Remote", price: 49.99 },
        { id: 5, systemType: "ra3", productType: "hub", name: "RA3 Bridge", price: 219.99 },
        { id: 6, systemType: "ra3", productType: "dimmer", name: "RA3 Dimmer", price: 199.99 },
        { id: 7, systemType: "homeworks", productType: "hub", name: "HomeWorks Hub", price: 1499.99 },
      ]);

      setLaborRates([
        { id: 1, clientType: "residential", hourlyRate: 90, description: "Standard residential rate" },
        { id: 2, clientType: "commercial", hourlyRate: 125, description: "Commercial/enterprise rate" },
      ]);
    } catch (err) {
      setError("Failed to load pricing data");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item: PricingProduct | LaborRate, type: EditingType) => {
    setEditingId(item.id);
    setEditingType(type);
    setEditForm(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingType(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    try {
      if (editingType === "product") {
        setProducts(products.map(p => p.id === editingId ? editForm : p));
      } else if (editingType === "labor") {
        setLaborRates(laborRates.map(lr => lr.id === editingId ? editForm : lr));
      }
      cancelEdit();
      setError("");
    } catch (err) {
      setError("Failed to save changes");
    }
  };

  const deleteItem = (id: number, type: EditingType) => {
    if (confirm("Are you sure you want to delete this item?")) {
      if (type === "product") {
        setProducts(products.filter(p => p.id !== id));
      } else if (type === "labor") {
        setLaborRates(laborRates.filter(lr => lr.id !== id));
      }
    }
  };

  const addNewProduct = () => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: PricingProduct = {
      id: newId,
      systemType: "caseta",
      productType: "hub",
      name: "",
      price: 0,
    };
    setProducts([...products, newProduct]);
    startEdit(newProduct, "product");
  };

  // Calculator functions
  const getProductPrice = (systemType: string, productType: string) => {
    const product = products.find(p => p.systemType === systemType && p.productType === productType);
    return product?.price ?? 0;
  };

  const getLaborRate = (clientType: string) => {
    const rate = laborRates.find(lr => lr.clientType === clientType);
    return rate?.hourlyRate ?? 0;
  };

  const equipmentCost =
    quantities.hub * getProductPrice(selectedSystem, "hub") +
    quantities.dimmer * getProductPrice(selectedSystem, "dimmer") +
    quantities.keypad * getProductPrice(selectedSystem, "keypad") +
    quantities.remote * getProductPrice(selectedSystem, "remote");

  const laborCost = laborHours * getLaborRate(selectedLaborType);
  const totalCost = equipmentCost + laborCost;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/admin-all-things-automated-secret")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Price Manager</h1>
            <div className="w-32" /> {/* Spacer for alignment */}
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "products", label: "Equipment Pricing" },
              { id: "labor", label: "Labor Rates" },
              { id: "calculator", label: "Quick Calculator" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#8B5CF6] text-white"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Equipment Pricing</h2>
                <p className="text-slate-500 text-sm mt-1">Manage prices for all Lutron system types</p>
              </div>
              <Button
                onClick={addNewProduct}
                className="bg-[#8B5CF6] hover:bg-[#7c3aed] flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {/* Products by system */}
            {SYSTEM_TYPES.map(systemType => (
              <div key={systemType} className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 capitalize">{systemType}</h3>
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
                                onChange={e =>
                                  setEditForm({ ...editForm, price: parseFloat(e.target.value) })
                                }
                                placeholder="Price"
                                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                              />
                            </div>
                            <textarea
                              value={editForm.description || ""}
                              onChange={e =>
                                setEditForm({ ...editForm, description: e.target.value })
                              }
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
                              <Button
                                onClick={cancelEdit}
                                variant="outline"
                                size="sm"
                              >
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

            <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
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
                            onChange={e =>
                              setEditForm({ ...editForm, clientType: e.target.value })
                            }
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
                        <textarea
                          value={editForm.description || ""}
                          onChange={e =>
                            setEditForm({ ...editForm, description: e.target.value })
                          }
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
                          <Button
                            onClick={cancelEdit}
                            variant="outline"
                            size="sm"
                          >
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

        {/* CALCULATOR TAB */}
        {activeTab === "calculator" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Configuration */}
            <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Create Estimate</h2>

              <div className="space-y-6">
                {/* System Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    System Type
                  </label>
                  <div className="space-y-2">
                    {SYSTEM_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedSystem(type)}
                        className={`w-full p-3 rounded-lg border-2 text-left font-medium transition ${
                          selectedSystem === type
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Labor Rate Type
                  </label>
                  <div className="space-y-2">
                    {laborRates.map(rate => (
                      <button
                        key={rate.id}
                        onClick={() => setSelectedLaborType(rate.clientType)}
                        className={`w-full p-3 rounded-lg border-2 text-left font-medium transition ${
                          selectedLaborType === rate.clientType
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/5"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="capitalize">{rate.clientType}</span>
                        <span className="text-sm text-slate-500 ml-2">
                          ${rate.hourlyRate.toFixed(2)}/hr
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Equipment Quantities */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Equipment
                  </label>
                  <div className="space-y-3">
                    {PRODUCT_TYPES.map(type => (
                      <div key={type} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-sm capitalize">{type}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setQuantities(q => ({ ...q, [type]: Math.max(0, q[type] - 1) }))
                            }
                            className="px-2 py-1 hover:bg-slate-200 rounded text-sm"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-bold text-sm">
                            {quantities[type]}
                          </span>
                          <button
                            onClick={() =>
                              setQuantities(q => ({ ...q, [type]: q[type] + 1 }))
                            }
                            className="px-2 py-1 hover:bg-slate-200 rounded text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Labor Hours */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Installation Hours
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLaborHours(Math.max(0.5, laborHours - 0.5))}
                      className="px-3 py-2 hover:bg-slate-100 rounded text-sm"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      step="0.5"
                      value={laborHours}
                      onChange={e => setLaborHours(parseFloat(e.target.value))}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    />
                    <button
                      onClick={() => setLaborHours(laborHours + 0.5)}
                      className="px-3 py-2 hover:bg-slate-100 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quote Summary */}
            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#7c3aed] rounded-lg shadow p-6 text-white">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Estimate Summary
              </h2>

              <div className="space-y-6">
                {/* Equipment Breakdown */}
                <div>
                  <h3 className="font-semibold mb-3 text-white/90">Equipment</h3>
                  <div className="space-y-2 text-sm">
                    {PRODUCT_TYPES.map(type => {
                      const qty = quantities[type];
                      if (qty === 0) return null;
                      const price = getProductPrice(selectedSystem, type);
                      return (
                        <div key={type} className="flex justify-between text-white/80">
                          <span className="capitalize">
                            {qty}x {type}
                          </span>
                          <span>${(qty * price).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/30 flex justify-between font-semibold">
                    <span>Equipment Total</span>
                    <span>${equipmentCost.toFixed(2)}</span>
                  </div>
                </div>

                {/* Labor Breakdown */}
                <div>
                  <h3 className="font-semibold mb-3 text-white/90">Labor</h3>
                  <div className="text-sm text-white/80 mb-2 flex justify-between">
                    <span>{laborHours.toFixed(1)} hours @ ${getLaborRate(selectedLaborType).toFixed(2)}/hr</span>
                    <span>${laborCost.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-white/30">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">TOTAL</span>
                    <span className="text-4xl font-bold">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
