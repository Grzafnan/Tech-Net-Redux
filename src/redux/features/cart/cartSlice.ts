import { IProduct } from './../../../types/globalTypes';
import { IProduct } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExistsProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExistsProduct) {
        isExistsProduct.quantity = isExistsProduct.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const isExistsProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExistsProduct && isExistsProduct.quantity! > 1) {
        isExistsProduct.quantity = isExistsProduct.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
  },
});

export const { addToCart, removeOne, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;