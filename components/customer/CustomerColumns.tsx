"use client";
import { ColumnDef } from "@tanstack/react-table";
 
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
