import { configureStore } from "@reduxjs/toolkit";
import Wishlistslice from "./slice/WishlistSlice";
import  CartSlice from "./slice/CartSlice";
 
export const store = configureStore({
    reducer: {
        wishlist: Wishlistslice,
        cart : CartSlice,
    },
});
