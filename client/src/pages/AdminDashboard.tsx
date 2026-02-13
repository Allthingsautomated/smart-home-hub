import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [products, setProducts] = useState<any[]>([]);
  const [laborRates, setLaborRates] = useState<any[]>([]);

  // Fetch pricing data
  const productsQuery = trpc.pricing.getProducts.useQuery();
  const laborRatesQuery = trpc.pricing.getLaborRates.useQuery();

  // Mutations
  const updateProductMutation = trpc.pricing.updateProduct.useMutation({
    onSuccess: () => {
      toast.success("Product updated successfully");
      productsQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateLaborRateMutation = trpc.pricing.updateLaborRate.useMutation({
    onSuccess: () => {
      toast.success("Labor rate updated successfully");
      laborRatesQuery.refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  // Redirect if not admin
  useEffect(() => {
    if (isAuthenticated && user?.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data);
    }
  }, [productsQuery.data]);

  useEffect(() => {
    if (laborRatesQuery.data) {
      setLaborRates(laborRatesQuery.data);
    }
  }, [laborRatesQuery.data]);

  if (!isAuthenticated || user?.role !== "admin") {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <p className="text-gray-600 mt-2">Manage product pricing and labor rates</p>
        </div>

        {/* Labor Rates Section */}
        <Card>
          <CardHeader>
            <CardTitle>Labor Rates</CardTitle>
            <CardDescription>Update your hourly labor rates by client type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {laborRates.map((rate) => (
              <div key={rate.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold capitalize">{rate.clientType}</h3>
                  <span className="text-lg font-bold text-primary">${rate.hourlyRate}/hr</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="New hourly rate"
                    defaultValue={rate.hourlyRate}
                    id={`rate-${rate.id}`}
                    step="0.01"
                  />
                  <Button
                    onClick={() => {
                      const newRate = (document.getElementById(`rate-${rate.id}`) as HTMLInputElement)?.value;
                      if (newRate) {
                        updateLaborRateMutation.mutate({
                          id: rate.id,
                          hourlyRate: newRate,
                        });
                      }
                    }}
                    disabled={updateLaborRateMutation.isPending}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card>
          <CardHeader>
            <CardTitle>Product Pricing</CardTitle>
            <CardDescription>Update pricing for Lutron products</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {products.length === 0 ? (
              <p className="text-gray-500">No products found. Add products to get started.</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.systemType.toUpperCase()} • {product.productType}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="New price"
                      defaultValue={product.price}
                      id={`price-${product.id}`}
                      step="0.01"
                    />
                    <Button
                      onClick={() => {
                        const newPrice = (document.getElementById(`price-${product.id}`) as HTMLInputElement)?.value;
                        if (newPrice) {
                          updateProductMutation.mutate({
                            id: product.id,
                            price: newPrice,
                          });
                        }
                      }}
                      disabled={updateProductMutation.isPending}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
