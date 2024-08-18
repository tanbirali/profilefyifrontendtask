import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface cartItems {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: string;
    count: number;
  };
  quantity: number;
}

interface cartState {
  items: cartItems[];
  discount: number;
  total: number;
}
const initialState: cartState = {
  items: [],
  discount: 0,
  total: 0,
};
// Helper function to calculate the total
const calculateTotal = (items: cartItems[], discount: number) => {
  const subtotal = items.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * (discount / 100);

  return subtotal - discountAmount;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add to cart reducer
    addToCart: (state, action: PayloadAction<cartItems>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
      state.total = calculateTotal(state.items, state.discount);
    },
    //remove item reducer
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items, state.discount);
    },
    // Increase the quantity of an item
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total = calculateTotal(state.items, state.discount);
      }
    },
    // Decrease the quantity of an item
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total = calculateTotal(state.items, state.discount);
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload); // Remove if quantity reaches 0
        state.total = calculateTotal(state.items, state.discount);
      }
    },
    //set a defined quantity
    setQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items, state.discount);
      }
    },
    // Set discount action
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      state.total = calculateTotal(state.items, state.discount); // Update total
    },
    //clear cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.discount = 0;
    },
  },
});

export const {
  addToCart,
  remove,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  setDiscount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
