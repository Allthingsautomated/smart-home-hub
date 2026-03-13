import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DollarSign, Edit2, Trash2, Plus, Upload, ChevronLeft } from "lucide-react";
import ServicePageHeader from "@/components/ServicePageHeader";
import { trpc } from "@/lib/trpc";
import { useToast } from "@/hooks/use-toast";

type Tab = "products" | "laborRates" | "import";

const SYSTEM_TYPES = ["caseta", "ra3", "homeworks"] as const;
const PRODUCT_TYPES = ["hub", "dimmer", "keypad", "remote"] as const;
const CLIENT_TYPES = ["residential", "commercial"] as const;

interface ProductForm {
  systemType: string;
  productType: string;
  name: string;
  price: string;
  description: string;
}

interface LaborRateForm {
  clientType: string;
  hourlyRate: string;
  description: string;
}

export default function AdminPriceManager() {
  const [navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingLaborId, setEditingLaborId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<ProductForm>({
    systemType: "caseta",
    productType: "hub",
    name: "",
    price: "",
    description: "",
  });
  const [laborForm, setLaborForm] = useState<LaborRateForm>({
    clientType: "residential",
    hourlyRate: "",
    description: "",
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string>("");

  // Queries
  const { data: products = [], refetch: refetchProducts } =
    trpc.pricing.getProducts.useQuery();
  const { data: laborRates = [], refetch: refetchLaborRates } =
    trpc.pricing.getLaborRates.useQuery();

  // Mutations
  const createProductMutation = trpc.pricing.createProduct.useMutation({
    onSuccess: () => {
      toast({ title: "Product created successfully" });
      resetProductForm();
      refetchProducts();
    },
    onError: (error) => {
      toast({ title: "Error creating product", description: error.message, variant: "destructive" });
    },
  });

  const updateProductMutation = trpc.pricing.updateProduct.useMutation({
    onSuccess: () => {
      toast({ title: "Product updated successfully" });
      resetProductForm();
      setEditingProductId(null);
      refetchProducts();
    },
    onError: (error) => {
      toast({ title: "Error updating product", description: error.message, variant: "destructive" });
    },
  });

  const createLaborRateMutation = trpc.pricing.createLaborRate.useMutation({
    onSuccess: () => {
      toast({ title: "Labor rate created successfully" });
      resetLaborForm();
      refetchLaborRates();
    },
    onError: (error) => {
      toast({ title: "Error creating labor rate", description: error.message, variant: "destructive" });
    },
  });

  const updateLaborRateMutation = trpc.pricing.updateLaborRate.useMutation({
    onSuccess: () => {
      toast({ title: "Labor rate updated successfully" });
      resetLaborForm();
      setEditingLaborId(null);
      refetchLaborRates();
    },
    onError: (error) => {
      toast({ title: "Error updating labor rate", description: error.message, variant: "destructive" });
    },
  });

  const handleProductSubmit = () => {
    if (!productForm.name || !productForm.price) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (editingProductId) {
      updateProductMutation.mutate({
        id: editingProductId,
        name: productForm.name,
        price: parseFloat(productForm.price),
        description: productForm.description,
      });
    } else {
      createProductMutation.mutate({
        systemType: productForm.systemType as any,
        productType: productForm.productType as any,
        name: productForm.name,
        price: parseFloat(productForm.price),
        description: productForm.description,
      });
    }
  };

  const handleLaborSubmit = () => {
    if (!laborForm.hourlyRate) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (editingLaborId) {
      updateLaborRateMutation.mutate({
        id: editingLaborId,
        hourlyRate: parseFloat(laborForm.hourlyRate),
        description: laborForm.description,
      });
    } else {
      createLaborRateMutation.mutate({
        clientType: laborForm.clientType as any,
        hourlyRate: parseFloat(laborForm.hourlyRate),
        description: laborForm.description,
      });
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProductId(product.id);
    setProductForm({
      systemType: product.systemType,
      productType: product.productType,
      name: product.name,
      price: product.price.toString(),
      description: product.description || "",
    });
  };

  const handleEditLaborRate = (rate: any) => {
    setEditingLaborId(rate.id);
    setLaborForm({
      clientType: rate.clientType,
      hourlyRate: rate.hourlyRate.toString(),
      description: rate.description || "",
    });
  };

  const resetProductForm = () => {
    setProductForm({
      systemType: "caseta",
      productType: "hub",
      name: "",
      price: "",
      description: "",
    });
  };

  const resetLaborForm = () => {
    setLaborForm({
      clientType: "residential",
      hourlyRate: "",
      description: "",
    });
  };

  const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCsvPreview(content.split("\n").slice(0, 5).join("\n"));
      };
      reader.readAsText(file);
    }
  };

  const handleCSVImport = async () => {
    if (!csvFile) {
      toast({ title: "Please select a CSV file", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const lines = content.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      const data = lines.slice(1).map((line) => {
        const values = line.split(",");
        return {
          systemType: values[headers.indexOf("systemtype")]?.trim(),
          productType: values[headers.indexOf("producttype")]?.trim(),
          name: values[headers.indexOf("name")]?.trim(),
          price: values[headers.indexOf("price")]?.trim(),
          description: values[headers.indexOf("description")]?.trim(),
        };
      });

      // For now, just create products one by one
      // In a real app, you'd want a batch endpoint
      try {
        for (const row of data) {
          if (row.systemType && row.productType && row.name && row.price) {
            await createProductMutation.mutateAsync({
              systemType: row.systemType as any,
              productType: row.productType as any,
              name: row.name,
              price: parseFloat(row.price),
              description: row.description,
            });
          }
        }
        toast({ title: "CSV imported successfully" });
        setCsvFile(null);
        setCsvPreview("");
      } catch (error) {
        toast({ title: "Error importing CSV", variant: "destructive" });
      }
    };
    reader.readAsText(csvFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <ServicePageHeader title="Price Manager" description="Manage product prices and labor rates" />

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/admin-all-things-automated-secret")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["products", "laborRates", "import"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab === "products" && "Products"}
              {tab === "laborRates" && "Labor Rates"}
              {tab === "import" && "CSV Import"}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <DollarSign className="w-5 h-5" />
                  Product Prices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={editingProductId !== null || productForm.name !== ""} onOpenChange={() => {
                  if (editingProductId === null && productForm.name === "") return;
                  resetProductForm();
                  setEditingProductId(null);
                }}>
                  <Button
                    onClick={() => resetProductForm()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>

                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        {editingProductId ? "Edit Product" : "Add Product"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          System Type
                        </label>
                        <Select
                          value={productForm.systemType}
                          onValueChange={(value) =>
                            setProductForm({ ...productForm, systemType: value })
                          }
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {SYSTEM_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Product Type
                        </label>
                        <Select
                          value={productForm.productType}
                          onValueChange={(value) =>
                            setProductForm({ ...productForm, productType: value })
                          }
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {PRODUCT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Name *
                        </label>
                        <Input
                          value={productForm.name}
                          onChange={(e) =>
                            setProductForm({ ...productForm, name: e.target.value })
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="e.g., Caséta Hub"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Price *
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) =>
                            setProductForm({ ...productForm, price: e.target.value })
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Description
                        </label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) =>
                            setProductForm({ ...productForm, description: e.target.value })
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Optional description"
                          rows={3}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetProductForm();
                          setEditingProductId(null);
                        }}
                        className="border-slate-600 text-slate-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleProductSubmit}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {editingProductId ? "Update" : "Create"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700">
                        <TableHead className="text-slate-300">System</TableHead>
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Name</TableHead>
                        <TableHead className="text-slate-300">Price</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product: any) => (
                        <TableRow key={product.id} className="border-slate-700">
                          <TableCell className="text-slate-200 uppercase">
                            {product.systemType}
                          </TableCell>
                          <TableCell className="text-slate-200 capitalize">
                            {product.productType}
                          </TableCell>
                          <TableCell className="text-slate-200">{product.name}</TableCell>
                          <TableCell className="text-slate-200">${parseFloat(product.price).toFixed(2)}</TableCell>
                          <TableCell className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-1 hover:bg-slate-700 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Labor Rates Tab */}
        {activeTab === "laborRates" && (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <DollarSign className="w-5 h-5" />
                  Labor Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={editingLaborId !== null || laborForm.hourlyRate !== ""} onOpenChange={() => {
                  if (editingLaborId === null && laborForm.hourlyRate === "") return;
                  resetLaborForm();
                  setEditingLaborId(null);
                }}>
                  <Button
                    onClick={() => resetLaborForm()}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Labor Rate
                  </Button>

                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        {editingLaborId ? "Edit Labor Rate" : "Add Labor Rate"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Client Type
                        </label>
                        <Select
                          value={laborForm.clientType}
                          onValueChange={(value) =>
                            setLaborForm({ ...laborForm, clientType: value })
                          }
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {CLIENT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Hourly Rate *
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          value={laborForm.hourlyRate}
                          onChange={(e) =>
                            setLaborForm({ ...laborForm, hourlyRate: e.target.value })
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-200 mb-1">
                          Description
                        </label>
                        <Textarea
                          value={laborForm.description}
                          onChange={(e) =>
                            setLaborForm({ ...laborForm, description: e.target.value })
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                          placeholder="Optional description"
                          rows={3}
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetLaborForm();
                          setEditingLaborId(null);
                        }}
                        className="border-slate-600 text-slate-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleLaborSubmit}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {editingLaborId ? "Update" : "Create"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="grid gap-4">
                  {laborRates.map((rate: any) => (
                    <Card key={rate.id} className="bg-slate-700 border-slate-600">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold capitalize">
                              {rate.clientType}
                            </h3>
                            <p className="text-slate-300 text-lg">
                              ${parseFloat(rate.hourlyRate).toFixed(2)}/hr
                            </p>
                            {rate.description && (
                              <p className="text-slate-400 text-sm mt-1">{rate.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditLaborRate(rate)}
                              className="p-2 hover:bg-slate-600 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-2 hover:bg-slate-600 rounded transition-colors">
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CSV Import Tab */}
        {activeTab === "import" && (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Upload className="w-5 h-5" />
                  Import CSV
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
                  <h3 className="text-white font-semibold mb-2">CSV Format</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Your CSV file should have the following columns:
                  </p>
                  <code className="text-slate-200 text-xs bg-slate-900 p-3 rounded block">
                    systemType,productType,name,price,description
                  </code>
                  <p className="text-slate-400 text-xs mt-3">
                    Example: caseta,hub,Caséta Hub,99.99,Smart lighting hub
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Select CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVChange}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  />
                </div>

                {csvPreview && (
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Preview
                    </label>
                    <pre className="bg-slate-900 p-3 rounded text-slate-300 text-xs overflow-x-auto">
                      {csvPreview}
                    </pre>
                  </div>
                )}

                <Button
                  onClick={handleCSVImport}
                  disabled={!csvFile}
                  className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
