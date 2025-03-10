
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import statisticsService from "./statisticsService";

// Async thunk for getting branch statistics
export const getOrderStatistics = createAsyncThunk(
    "statistics/getOrderStatistics",
    async ({ startDate, endDate }, thunkAPI) => {
        try {
            const response = await statisticsService.getOrderStatistics(startDate, endDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
// Async thunk for getting employee statistics
export const getEmployeeStatistics = createAsyncThunk(
    "statistics/getEmployeeStatistics",
    async ({ startDate, endDate }, thunkAPI) => {
        try {
            const response = await statisticsService.getEmployeeStatistics(startDate, endDate);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk 
export const getMatchCounts = createAsyncThunk(
    "statistics/getMatchCounts",
    async (_,thunkAPI) => {
        try {
            const response = await statisticsService.getMatchCounts();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const statisticsSlice = createSlice({
    name: "statistics",
    initialState: {
        allOrderStatistics: {},
        branchOrderStatistics: [],
        allEmployeeOrderStatistics: [],
        employeeOrderStatistics: {},
        isLoading: false,
        error: null,
        paymentCount: 0,
        returnOrderCount: 0,
        pendingOrderCount: 0,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrderStatistics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderStatistics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allOrderStatistics = action.payload?.combinedStatistics;
                state.branchOrderStatistics = action.payload?.branchStatistics;
            })
            .addCase(getOrderStatistics.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.message);
            })
            .addCase(getEmployeeStatistics.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployeeStatistics.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allEmployeeOrderStatistics = action.payload?.allEmployeeData;
                state.employeeOrderStatistics = action.payload?.aggregatedEmployeeStatistics;
            })
            .addCase(getEmployeeStatistics.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.message);
            })

            .addCase(getMatchCounts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMatchCounts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentCount = action.payload?.paymentCount;
                state.returnOrderCount = action.payload?.returnOrderCount;
                state.pendingOrderCount = action.payload?.pendingOrderCount;
                state.pendingOrderLength = action.payload?.pendingOrderList?.length || 0; 
            })
            .addCase(getMatchCounts.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    },
});


export default statisticsSlice.reducer;
