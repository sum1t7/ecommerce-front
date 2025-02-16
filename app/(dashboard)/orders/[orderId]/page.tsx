import { DataTable } from "@/components/custom/data-table"
import { columns } from "@/components/orderItems/OrderItemColumns"
 
 
const OrderDetails = async ({params}:{params:{orderId:string}}) => {
    const res = await fetch(`http://localhost:3000/api/order/${params.orderId}`)
    const {orderDetails, customer} = await res.json()
    const {streetNumber, city, state} = orderDetails.shippingAddress
    console.log(orderDetails)
     
  return (
    <div className="flex flex-col p-10 gap-5">
        <p className="text-base-bold">
            Order ID: <span className="text-base-medium">{orderDetails._id}</span>
        </p>
        <p className="text-base-bold">
            Customer Name: <span className="text-base-medium">{customer.name}</span>
        </p>
        <p className="text-base-bold">
            Shipping Address: <span className="text-base-medium">{streetNumber}{city},{state}</span>
        </p>
        <p className="text-base-bold">
            Total: <span className="text-base-medium">Rs.{orderDetails.totalAmount}</span>
        </p>
    
            <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
        
    </div>
  )
}

export default OrderDetails