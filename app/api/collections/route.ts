import { connectToDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest,NextResponse } from "next/server";

import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB()
        const { title, description, image } = await req.json();
        console.log("Title",title);
        const existingCollection = await Collection.findOne({title});
        
        if (existingCollection){
            return new NextResponse("Collection already exists", {status: 402});
        }
        if( !image){
            return new NextResponse("  Image are required",{status:405});
        } 
        if(!title ){
            return new NextResponse("Title   are required",{status:406});
        } 
        const newCollection = await Collection.create({
            title,
            description,
            image,
            
        });
        await newCollection.save();
        return new NextResponse(newCollection, {status:200});
        
    }

    catch(err){
        console.log("[Collection_POST]",err);
        return new NextResponse("Server error",{status:500});
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();
        const collections = await Collection.find().sort({createdAt : "desc"})
        return NextResponse.json(collections, { status: 200 });

     }
    
    catch (err) {
        console.log("[Collection_GET]", err);
        return new NextResponse("Server error", { status: 500 });
    }
}
export const dynamic = "force-dynamic";