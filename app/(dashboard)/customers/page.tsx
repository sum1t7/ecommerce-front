import { connectToDB } from '@/lib/MongoDB'
import Customer from '../../../lib/models/Customer'
import { Separator } from '@radix-ui/react-separator'
import { DataTable } from '@/components/custom/data-table'
import { columns } from '@/components/customer/CustomerColumns'
const Customers = async () => {

    
    await connectToDB()
    const res = await Customer.find().sort({createdAt: -1})
    const customer = JSON.parse(JSON.stringify(res))


   return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customer</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={customer} searchKey="name" />
    </div>
  )
}
export const dynamic = "force-dynamic";

export default Customers