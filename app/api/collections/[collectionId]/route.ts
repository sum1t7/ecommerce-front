import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/MongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();
    const collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "collection not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[CollectionID_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    let collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }
    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and Image are required", {
        status: 400,
      });
    }

    collection = await Collection.findByIdAndUpdate(params.collectionId, {title, description, image}, {new: true});
    await collection.save();

    return NextResponse.json(collection, { status: 200 });


  } catch (err) {
    console.log("[CollectionID_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    console.log("inside delete");
    const { userId } = await auth();
    console.log(userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    console.log("0");
    console.log(params.collectionId);
    await Collection.findByIdAndDelete(params.collectionId);
    console.log("2");

    await Product.updateMany({ collection: params.collectionId },
      {$pull: {collection: params.collectionId}}
    );

    

    return new NextResponse("Collection Deleted Successfully ", {
      status: 200,
    });
  } catch (err) {
    console.log("[CollectionID_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
