import { Separator } from "@/components/ui/separator";
import { getSalesPerMonth, getTotalCustomer, getTotalSales } from "@/lib/actions/action";
import { UserButton } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, UserRound } from "lucide-react";
import SalesChart from "@/components/custom/SalesChart";

export default async function Home() {
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalSales = await getTotalSales().then((data) => data.totalSales);
  const totalCustomers = await getTotalCustomer();
  const graphData = await getSalesPerMonth();

  return (
    <div className="px-8 py-10">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Sales</CardTitle>
            Rs
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">Rs {totalSales}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden"/>
           </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>

        <Card className="mt-10">
        <CardHeader>
          <CardTitle>Sales Chart ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
