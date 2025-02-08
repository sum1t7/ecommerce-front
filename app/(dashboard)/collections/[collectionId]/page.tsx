"use client";
import CollectionFrom from "@/components/collection/CollectionForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BounceLoader } from "react-spinners";

const CollectionDetails = () => {
  const params = useParams<{ collectionId: string }>();
  const [loading, setloading] = useState(true);
  const [collection, setCollection] = useState<CollectionType | null>(null);

  const getCollection = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCollection(data);
      setloading(false);
    } catch (err) {
      console.log("[CollectionDetails_GET]", err);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return loading ? (
    <div className="justify-center items-center flex h-full">
      <BounceLoader size={80} speedMultiplier={3} />
    </div>
  ) : (
    <CollectionFrom initialData={collection} />
  );
};

export default CollectionDetails;
