"use client"
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom/delete"
import Link from "next/link"

export const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell:({row})=> <Link href={`/products/${row.original._id}`} className="hover:text-black ">{row.original.title}</Link>
    },
    
    { 
      accessorKey: "category",
      header: "Category",
     },

     { 
      accessorKey: "collections",
      header: "Collections",
       cell: ({row}) => row.original.collections.map((collection)=> collection.title).join(", "),
     },

     { 
      accessorKey: "price",
      header: "Price (Rs)",
     },

     { 
      accessorKey: "expense",
      header: "Expense (Rs)",
     },


    {
        id: "actions",
        cell: ({row}) => <div>
          {<Delete item="product" id={row.original._id}/>}
        </div>
    }
  ]