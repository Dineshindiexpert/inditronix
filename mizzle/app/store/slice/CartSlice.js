import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    coupon: null,
    discountValue: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const discountPercentage =
          action.payload.discountPercentage ||
          Math.round(
            ((action.payload.originalPrice - action.payload.price) /
              action.payload.originalPrice) *
            100
          );
        state.cartItems.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          originalPrice: action.payload.originalPrice || action.payload.price,
          discountPercentage: discountPercentage,
          thumbnail: action.payload.thumbnail || action.payload.image,
          quantity: 1,
        });
      }
    },

    removeFromcartitems: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    incrementQty: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    decrementQty: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    applyCoupon: (state, action) => {
      const code = action.payload;
      if (!code) {
        state.coupon = null;
        state.discountValue = 0;
        return;
      }
      if (code === "c") {
        state.coupon = code;
        state.discountValue = 5;
      } else if (code === "DISC10") {
        state.coupon = code;
        state.discountValue = 10;
      } else {
        state.coupon = null;
        state.discountValue = 0;
      }
    },

    removeCoupon: (state) => {
      state.coupon = null;
      state.discountValue = 0;
    },
  },
});

export const {
  addToCart,
  removeFromcartitems,
  incrementQty,
  decrementQty,
  applyCoupon,
  removeCoupon,
} = CartSlice.actions;

export default CartSlice.reducer;