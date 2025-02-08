import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../MongoDB";

export const getTotalSales = async () => {
  const orders = await Order.find();
  const totalOrders = orders.length;
  const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  return { totalOrders, totalSales };
};

export const getTotalCustomer = async () => {
  await connectToDB();
  const customer = await Customer.find();
  const totalCustomers = customer.length;
  return totalCustomers;
};


export const getSalesPerMonth = async () => {
    await connectToDB()
    const orders = await Order.find()
  
    const salesPerMonth = orders.reduce((acc, order) => {
      const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
      acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
     
      return acc
    }, {})
  
    const graphData = Array.from({ length: 12}, (_, i) => {
      const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
       return { name: month, sales: salesPerMonth[i] || 0 }
    })
  
    return graphData
  }
