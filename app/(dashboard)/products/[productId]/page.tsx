"use client"
import ProductForm from '@/components/products/ProductForm';
import { useParams } from 'next/navigation';
import  { useEffect, useState } from 'react'
import { BounceLoader } from 'react-spinners';

const ProductDetails = () => {
   
   const [loading, setloading] = useState(true);
     const params = useParams<{ productId: string }>();
    const [product, setproduct] = useState<ProductType | null>(null);
  
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setproduct(data);
        setloading(false);
      } catch (err) {
        console.log("[productDetails_GET]", err);
      }
    };
  
    useEffect(() => {
      getProduct();
    }, []);
  
    return loading ? (
        <div className="justify-center items-center flex h-full">
          <BounceLoader size={80} speedMultiplier={3} />
        </div>
      ):
      (
    <ProductForm initialData={product}/>
  )
}

export default ProductDetails