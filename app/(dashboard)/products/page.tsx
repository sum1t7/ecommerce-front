"use client";

import { DataTable } from "@/components/custom/data-table";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const getProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log("[Products_GET]", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <div className="justify-center items-center flex h-full">
      <BounceLoader size={80} speedMultiplier={3} />
    </div>
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Products
        </Button>
      </div>
      <div>
        <Separator className="bg-grey-1 my-4" />
        <DataTable columns={columns} data={products} searchKey="title" />
      </div>
    </div>
  );
};

export default Products;
