"use client";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  remove,
  setDiscount,
  setQuantity,
} from "@/lib/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hook";
import { formatIndianCurrency } from "@/util/currencyFormatter";
import Image from "next/image";
import React, { useState } from "react";
import { BiMinus } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { PiPlus } from "react-icons/pi";
import { toast } from "sonner";

const CartPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [discountValue, setDiscountValue] = useState(0);
  const handleDiscountchange = (e: any) => {
    const discountValue = e.target.value;
    setDiscountValue(e.target.value);
    dispatch(setDiscount(Number(discountValue)));
  };
  const handleCheckOut = () => {
    toast.success("Checkout Successfull");
    dispatch(clearCart());
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="text-center text-xl font-bold">Cart </h1>
      <div className="w-full h-full justify-center flex flex-col overflow-x-auto p-4 ">
        <table>
          <thead>
            <tr className="border border-black">
              <th>Action</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.length > 0 ? (
              cart.items.map((data, index) => (
                <tr key={index} className="border border-black">
                  <td className="text-center">
                    <button onClick={() => dispatch(remove(data.id))}>
                      <ImCross />
                    </button>
                  </td>
                  <td className="text-center">
                    <div className="flex flex-col lg:flex-row justify-center items-center">
                      <Image
                        src={data.image}
                        alt={data.title}
                        width={50}
                        height={50}
                      />
                      <h1>{data.title}</h1>
                    </div>
                  </td>
                  <td className="text-center">Rs {data.price}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-1 items-center">
                      <button
                        className="bg-gray-300 rounded-full w-4 h-4 text-white
               flex justify-center items-center hover:bg-blue-600"
                        onClick={() => dispatch(decreaseQuantity(data.id))}
                      >
                        <BiMinus />
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className=" bg-white outline-none w-12 text-center"
                        value={data.quantity}
                        onChange={(e: any) =>
                          dispatch(
                            setQuantity({
                              id: data.id,
                              quantity: e.target.value,
                            })
                          )
                        }
                      />
                      <button
                        className="bg-gray-300 rounded-full w-4 h-4 text-white
               flex justify-center items-center hover:bg-blue-600"
                        onClick={() => dispatch(increaseQuantity(data.id))}
                      >
                        <PiPlus />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">No items in the cart</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col p-4 items-end w-full gap-6">
        <div className="flex gap-3 items-center">
          <h1 className="font-semibold text-xl text-black">Subtotal:</h1>
          <h1 className="font-semibold text-xl text-blue-800">
            {formatIndianCurrency(cart.total)}
          </h1>
        </div>
        <div>
          <h1 className="font-semibold text-xl text-black">Discount</h1>
          <input
            type="number"
            value={discountValue}
            onChange={handleDiscountchange}
            placeholder="Enter Discount in %"
            className="border outline-none rounded-md p-2 border-black"
          />
        </div>
        <div className="flex gap-3 items-center">
          <h1 className="font-semibold text-xl text-black">Total:</h1>
          <h1 className="font-semibold text-xl text-blue-800">
            {formatIndianCurrency(cart.total)}
          </h1>
        </div>
        <button
          className="bg-blue-600 text-white rounded-md p-2 w-32"
          onClick={handleCheckOut}
          disabled={cart.items.length < 1}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CartPage;
