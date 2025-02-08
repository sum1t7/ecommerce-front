"use client";
import { ColumnDef } from "@tanstack/react-table";
 import Link from "next/link";

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.product._id}`} className="hover:text-black ">
        {row.original.product.title}
      </Link>
    ),
  },
  {
    accessorKey: "color",
    header: "color",
  },
  {
    accessorKey: "quantity",
    header: "Qauntity",
   },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
