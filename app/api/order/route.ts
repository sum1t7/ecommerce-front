import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { connectToDB } from "@/lib/MongoDB";
 import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns"
export  const GET = async (req: NextRequest) => {
    try{
        await connectToDB()
        const orders = (await Order.find().sort({createdAt: "desc"}))
        const OrderDetails = await Promise.all(orders.map(async (order) => {
            const customer = await Customer.findOne({clerkId: order.customerClerkId})
            return{
                _id: order._id,
                customer: customer.name,
                products: order.products,
                shippingAddress: order.shippingAddress,
                totalAmount: order.totalAmount,
                createdAt: format(order.createdAt,"MMM do, yyyy"),
            }
        }))
        return NextResponse.json(OrderDetails, {status: 200})
    }
    catch(err){
        console.log("[order_GET]", err);
        return new NextResponse("internal server error", { status: 500 });
    }
}
export const dynamic = "force-dynamic";