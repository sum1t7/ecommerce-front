"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom/delete";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original._id}`} className="hover:text-black ">
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => row.original.products.length,
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Ordered On",
  },
];
