"use client"
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom/delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell:({row})=> <Link href={`/collections/${row.original._id}`} className="hover:text-black ">{row.original.title}</Link>
    },
    { 
      accessorKey: "products",
      header: "Products",
        cell:({row})=> <p>{row.original.products.length}</p>
    },
    {
        id: "actions",
        cell: ({row}) => <div>
          {<Delete item="collection" id={row.original._id}/>}
        </div>
    }
  ]