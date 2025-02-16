import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/MongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
 


export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
  } catch (err) {
    console.log("[ProductID_GET]", err);
    return new NextResponse("Internal error", { status: 500 } );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    const product = await Product.findById(params.productId)
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not Enough Data", { status: 400 });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );

    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );

    await Promise.all([
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    const updatedProduct = await Product.findByIdAndUpdate(params.productId,{
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    },{new:true}).populate({path:"collections",model:Collection});
   
    await updatedProduct.save();
    return NextResponse.json(updatedProduct, { status: 200 });


  } catch (err) {
    console.log("[ProductID_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async ( req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        await connectToDB();
        const product = await Product.findById(params.productId);
        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }
        await Product.findByIdAndDelete(product._id);

        await Promise.all(product.collections.map((collectionId: string) =>
            Collection.findByIdAndUpdate(collectionId, {
                $pull: { products: product._id },
            })
        ));
        return new NextResponse("Product Deleted", { status:200});
    }
    catch (err) {
        console.log("[ProductID_DELETE]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";