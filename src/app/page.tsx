"use client";
import Cards from "@/components/Cards";
import { storeData } from "@/data/storeData";
import { fetchProducts } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hook";
import { CardData } from "@/types/CardData";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getProducts = () => {
      dispatch(fetchProducts(storeData));
    };
    getProducts();
  }, []);
  const products = useAppSelector((state) => state.product);
  console.log(products);
  return (
    <main className="flex  flex-col items-center p-24">
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.data.map((p, index) => (
          <Cards key={index} cardData={p} />
        ))}
      </div>
    </main>
  );
}
