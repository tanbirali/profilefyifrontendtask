import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts(state, action) {
      state.data = action.payload;
    },
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;
