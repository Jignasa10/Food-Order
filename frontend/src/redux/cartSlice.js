import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);

      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i._id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i._id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
