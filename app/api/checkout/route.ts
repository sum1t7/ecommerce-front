 import { NextRequest, NextResponse } from "next/server";
 import { stripe } from "@/lib/Stripe";
 
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();
    
    if (!cartItems || !customer) {
      return new NextResponse("invalid request", { status: 400 });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      shipping_options: [{ shipping_rate: "shr_1QekWvJaHEOogjatJhT3KfJ1" }],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.item.title,
            metadata: {
              productId: item.item._id,
               ...(item.size && { size: item.size }),
                ...(item.color && { color: item.color }),
             
            },
          },
          unit_amount: item.item.price * 100,
        },
        quantity: item.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      customer_email: customer.email,
    });
    return NextResponse.json(session, { headers: corsHeaders}) 
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("internal server error", { status: 500 });
  }
}
export const dynamic = "force-dynamic";
{
  /*
export async function POST(req: NextRequest) {
    try{
        
        const { amount } = await req.json()
        
        const options = {
            amount: amount ,  
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1,
             
        };
        const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret:process.env.RAZORPAY_KEY_SECRET })
        
        const order = await razorpay.orders.create(options)
        
    const orderId:string = order.id
 
        const paymentinfo = await razorpay.orders.fetchPayments(orderId)
        console.log(paymentinfo)
        return NextResponse.json(order, { headers: CorsHeaders })
    }
    catch(err){
        console.log("[checkout_err]",err)
        return new NextResponse("internal server error", { status: 500 })
    }
}

*/
}
