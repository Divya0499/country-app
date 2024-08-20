import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state for the country slice
const initialState = {
  countries: [],
  countryDetail: null,
  loading: false,
  error: null,
  searchQuery: '', 
};

// Async thunk to fetch countries based on the search query
export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async (countryName, thunkAPI) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch countries');
    }
  }
);

// Async thunk to fetch details of a single country by its code
export const fetchCountryDetail = createAsyncThunk(
  'country/fetchCountryDetail',
  async (countryCode, thunkAPI) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      return response.data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch country details');
    }
  }
);

// Create the country slice with reducers and async thunks
const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearSearchQuery(state) {
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCountryDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.countryDetail = action.payload;
      })
      .addCase(fetchCountryDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearchQuery } = countrySlice.actions;

export default countrySlice.reducer;
