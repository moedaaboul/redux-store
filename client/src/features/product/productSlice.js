import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  // we simply go for a reducers object in the slice, and then add key/value pairs
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.cartOpen = false;
    },
    // action is used to access the payload. Alternatively, can destructure straight away {payload} to access payload directly like in "increase" reducer
    removeFromCartReducer: (state, action) => {
      const productId = action.payload._id;
      state.cart = state.cart.filter((product) => product._id !== productId);
      state.cartOpen = state.cart.length > 0;
    },
    // note here how we access payload directly
    addToCartReducer: (state, { payload }) => {
      state.cartOpen = true;
      state.cart = [...state.cart, payload.product];
    },
    addMultipleToCart: (state, { payload }) => {
      state.cart = [...state.cart, ...payload.products];
    },
    updateProducts: (state, { payload }) => {
      state.products = [...payload.products];
    },
    updateCartQuantity: (state, { payload }) => {
      state.cartOpen = true;
      state.cart = state.cart.map((product) => {
        if (payload._id === product._id) {
          product.purchaseQuantity = payload.purchaseQuantity;
        }
        return product;
      });
    },
    toggleCartReducer: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    updateCategories: (state, { payload }) => {
      state.categories = [...payload.categories];
    },
    updateCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload.currentCategory;
    },
  },
});

console.log(productSlice);
// below code is how we create actions
// Note that with useReducer we had to write the following instead as an example:
// const ACTION_TYPE = 'ACTION_TYPE'
// const actionCreator = (payload) => {
//   return {type: ACTION_TYPE, payload: payload}
// }
export const {
  clearCart,
  removeFromCartReducer,
  addToCartReducer,
  addMultipleToCart,
  updateProducts,
  updateCartQuantity,
  toggleCartReducer,
  updateCategories,
  updateCurrentCategory,
} = productSlice.actions;

export default productSlice.reducer;
