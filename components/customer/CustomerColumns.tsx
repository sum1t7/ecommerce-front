"use client";
import { ColumnDef } from "@tanstack/react-table";
 import Link from "next/link";

export const columns: ColumnDef<customerType>[] = [
  {
    accessorKey: "clerkId",
    header: "CustomerID",
    
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
   },
  
];
