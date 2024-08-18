"use client";
import { addToCart } from "@/lib/features/cartSlice";
import { useAppDispatch } from "@/lib/hooks/hook";
import { CardData } from "@/types/CardData";
import { formatIndianCurrency } from "@/util/currencyFormatter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface CardDataProps {
  cardData: CardData;
}

const Cards: React.FC<CardDataProps> = ({ cardData }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAddedToCart, setisAddedToCart] = useState(false);
  const handleAddToCart = () => {
    dispatch(addToCart(cardData));
    setisAddedToCart(true);
  };
  return (
    <div className="flex flex-col w-40 lg:w-80 items-center gap-3 ">
      <Image
        src={cardData.image}
        alt={cardData.title}
        width={200}
        height={200}
        className="p-4 h-full"
      />
      <div className="w-full h-full justify-end rounded-md bg-slate-400 gap-3 flex flex-col p-4">
        <h1 className="font-bold text-sm lg:text-xl">{cardData.title}</h1>
        <h1 className="font-bold"> {formatIndianCurrency(cardData.price)}</h1>
        {isAddedToCart ? (
          <button
            className="text-white font-bold bg-green-800 
        w-full rounded-md p-2"
            onClick={() => router.push("/cart")}
          >
            View Cart
          </button>
        ) : (
          <button
            className="text-white font-bold bg-black 
        w-full rounded-md p-2"
            onClick={handleAddToCart}
          >
            Add To cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards;
