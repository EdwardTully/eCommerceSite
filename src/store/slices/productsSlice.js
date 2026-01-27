import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use Netlify Functions endpoints for production
const API_URL = '/api';

// Async thunks

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);


// TODO: Implement a Netlify Function for featured products if needed
export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/featured`);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    featured: [],
    filteredItems: [],
    categories: [],
    selectedCategory: 'all',
    searchQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterProducts(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = filterProducts(state);
    },
    clearFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.filteredItems = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        // Extract unique categories
        const categories = [...new Set(action.payload.map(p => p.category))];
        state.categories = categories.sort();
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featured = action.payload;
      });
  },
});

// Helper function to filter products
const filterProducts = (state) => {
  let filtered = state.items;

  // Filter by category
  if (state.selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.selectedCategory);
  }

  // Filter by search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const { setSelectedCategory, setSearchQuery, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
