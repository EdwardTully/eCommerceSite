import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedProduct: null,
    isProductModalOpen: false,
    isCheckoutModalOpen: false,
    notification: null,
  },
  reducers: {
    openProductModal: (state, action) => {
      state.selectedProduct = action.payload;
      state.isProductModalOpen = true;
    },
    closeProductModal: (state) => {
      state.isProductModalOpen = false;
      state.selectedProduct = null;
    },
    openCheckoutModal: (state) => {
      state.isCheckoutModalOpen = true;
    },
    closeCheckoutModal: (state) => {
      state.isCheckoutModalOpen = false;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  openProductModal,
  closeProductModal,
  openCheckoutModal,
  closeCheckoutModal,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
