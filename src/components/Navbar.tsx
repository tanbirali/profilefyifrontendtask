"use client";
import { useAppSelector } from "@/lib/hooks/hook";
import Link from "next/link";
import React from "react";
import { CgShoppingCart } from "react-icons/cg";

const Navbar = () => {
  const cart = useAppSelector((state) => state.cart);
  return (
    <div className="w-full flex gap-8 p-4 justify-center ">
      <Link href={"/"} className="text-xl font-bold">
        Fake Store
      </Link>
      <Link href={"/cart"}>
        <div className="relative">
          <div className="absolute -top-3 -right-3  w-6 h-6 rounded-full bg-blue-600 flex justify-center">
            <p className="text-white">{cart.items.length}</p>
          </div>
          <CgShoppingCart className="text-3xl" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
