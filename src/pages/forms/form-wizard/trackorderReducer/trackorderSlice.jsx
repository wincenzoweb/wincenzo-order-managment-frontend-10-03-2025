import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trackOrderByAWB as trackOrderService } from './trackorderService';

// Thunk to track order by AWB
export const trackOrderByAWB = createAsyncThunk(
  'trackOrder/trackByAWB',
  async (awb, { rejectWithValue }) => {
    try {
      const response = await trackOrderService(awb);
      return response;  // Tracking data from the service
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const trackOrderSlice = createSlice({
  name: 'trackOrder',
  initialState: {
    trackingData: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add non-async actions here
  },
  extraReducers: (builder) => {
    builder
      .addCase(trackOrderByAWB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackOrderByAWB.fulfilled, (state, action) => {
        state.loading = false;
        state.trackingData = action.payload;
        state.error = null;
      })
      .addCase(trackOrderByAWB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trackOrderSlice.reducer;
