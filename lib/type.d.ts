type CollectionType =  {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
}
type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
    
}
type OrderColumnType = {
    _id: string;
   customer: string;
    products: ProductType[];
    totalAmount: number;
    createdAt:string
}
type OrderItemType = {
    product: ProductType;
    quantity: number;
    size: string;
    color: string;
    price: number;
 }
 type customerType = {
    clerkId: string;
    name: string;
    email: string;
 }