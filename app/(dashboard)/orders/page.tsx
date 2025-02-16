"use client";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@radix-ui/react-separator";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

const Orders =   () => {
  const [loading, setloading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
       const res = await fetch("http://localhost:3000/api/order");
      const data = await res.json();
      setOrders(data);
      setloading(false);
    } catch (err) {
      console.log("Getorders", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <div className="justify-center items-center flex h-full">
      <BounceLoader size={80} speedMultiplier={3} />
    </div>
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Orders;
