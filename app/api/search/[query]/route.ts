import Product from '@/lib/models/Product';
import { connectToDB } from '@/lib/MongoDB';
import {NextRequest, NextResponse} from 'next/server';


export const GET = async (req: NextRequest,{params}:{params:{query:string}}) => {    
try {
    await connectToDB();
    const searchedProducts = await Product.find({
        $or:[
            {title:{$regex:params.query,$options:'i'}},
            {category:{$regex:params.query,$options:'i'}},
            {color:{$in : [new RegExp(params.query,'i')]}},
            {tags:{$in : [new RegExp(params.query,'i')]}}
        ]
    })
    return NextResponse.json(searchedProducts,{status:200});
}
catch(err){
    console.error("[Search_GET]",err);
    return new NextResponse("Internal Server error",{status:500});
}
}

export const dynamic = "force-dynamic";