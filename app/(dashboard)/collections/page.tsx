"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get } from "http";
import { DataTable } from "@/components/custom/data-table";
import { columns } from "@/components/collection/CollectionColumns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";

const Collections = () => {
  const [loading, setloading] = useState(true);
  const [collections, setCollections] = useState([]);

  const router = useRouter();

  const getCollection = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCollections(data);
      setloading(false);
    } catch (err) {
      console.log("[Collection_GET]", err);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

 
  return  loading ? (
    <div className="justify-center items-center flex h-full">
      <BounceLoader size={80} speedMultiplier={3} />
    </div>
  ) :(
    <div className="px-10 py-5">
    <div className="flex items-center justify-between">
      <p className="text-heading2-bold">Collections</p>
      <Button type="button" className="bg-blue-1 text-white" onClick={() =>  router.push("/collections/new")}>
        <Plus className="h-4 w-4 mr-2"/>
        Create Collection
      </Button>
    </div>
    <div>
      <Separator className="bg-grey-1 my-4"/>
      <DataTable columns={columns} data={collections} searchKey = "title" />
    </div>
    </div>
  );
};

export default Collections;
