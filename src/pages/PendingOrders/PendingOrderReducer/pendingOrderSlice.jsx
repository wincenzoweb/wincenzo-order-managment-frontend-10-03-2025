import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PendingOrderService from "./pendingOrderService";
import { toast } from "react-toastify";

// Async thunk for move old booking data
export const getPendingOrders = createAsyncThunk(
    "pendingOrder/getPendingOrders",
    async (thunkAPI) => {
        try {
            const response = await PendingOrderService.getPendingOrders();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



// export const moveOldOrdersToPending = createAsyncThunk(
//     "pendingOrder/moveOldOrdersToPending",
//     async (thunkAPI) => {
//         try {
//             const response = await PendingOrderService.moveOldOrdersToPending();
//             return response;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

export const updatePendingOrder = createAsyncThunk(
    "pendingOrder/updatePendingOrder",
    async (data, thunkAPI) => {
        try {
            const response = await PendingOrderService.updatePendingOrderById(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deletePendingOrder = createAsyncThunk(
    "pendingOrder/deletePendingOrder",
    async (dataId, thunkAPI) => {
        try {
            const response = await PendingOrderService.deletePendingOrderById(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteMultiplePendingOrder = createAsyncThunk(
    "pendingOrder/deleteMultiplePendingOrder",
    async (idList, thunkAPI) => {
        try {
            const response = await PendingOrderService.deleteMultiplePendingOrder(idList);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting paginated booking data
export const getPaginatedPendingOrders = createAsyncThunk(
    "pendingOrder/getPaginatedPendingOrders",
    async ({ page, limit, search, startDate, endDate, filterByDuplicateBarcode }, thunkAPI) => {
        try {
            const response = await PendingOrderService.getPaginatedPendingOrders(page, limit, search, startDate, endDate, filterByDuplicateBarcode);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getDuplicateBarcodeNumbers = createAsyncThunk(
    "returnandpending/getDuplicateBarcodeNumbers",
    async (_, thunkAPI) => {
        try {
            const response = await PendingOrderService.getDuplicateBarcodeNumbers();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const pendingOrderSlice = createSlice({
    name: "pendingorder",
    initialState: {
        duplicateBarcodeNumbers: [],
        totalSameDuplicateNumbers: 0,
        totalData: 0,
        totalPages: 0,
        currentPage: 0,
        pageLimit: 10,
        editItem: {},
        detailItem: {},
        isLoading: false,
        editModal: false,
        detailModal: false,
        pendingOrder: [],
        confirmModel: false,
        itemId: null,
    },
    reducers: {
        setPageLimit: (state, action) => {
            state.pageLimit = action.payload;
        },
        toggleEditModal: (state, action) => {
            state.editModal = action.payload;
            state.editItem = {};
        },
        editPendingData: (state, action) => {
            state.editItem = action.payload;
            state.editModal = !state.editModal;
        },
        toggleDetailModal: (state, action) => {
            state.detailItem = action.payload;
            state.detailModal = !state.detailModal;
        },
        closeDetailModal: (state, action) => {
            state.detailModal = action.payload;
            state.detailItem = {};
        },
        toggleConfirmModal: (state, action) => {
            state.confirmModel = !state.confirmModel;
            state.itemId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

            //get pendingorder
            .addCase(getPendingOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPendingOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pendingOrder = action.payload?.pendingOrders;
                toast.success(action.payload.message);
            })
            .addCase(getPendingOrders.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // update pendingOrder
            .addCase(updatePendingOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePendingOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updatePendingOrder.rejected, (state, action) => {
                state.isLoading = false;
                               const errorMessage = action.error?.response?.data?.message || 'Failed to update data';
                toast.error(errorMessage);
            })

            // .addCase(updateBookingData.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(updateBookingData.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.editItem = {};
            //     toast.success(action.payload.message);
            // })
            // .addCase(updateBookingData.rejected, (state, action) => {
            //     state.isLoading = false;
                
            //     // Capture and display error message
            //     const errorMessage = action.error?.response?.data?.message || 'Failed to update data';
            //     toast.error(errorMessage);
            // })
            // .addCase(moveOldOrdersToPending.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(moveOldOrdersToPending.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     toast.success(action.payload.message);
            // })
            // .addCase(moveOldOrdersToPending.rejected, (state, action) => {
            //     state.isLoading = false;
            //     toast.error(action.payload?.response?.data?.message);
            // })
            //delete pendingorder
            .addCase(deletePendingOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePendingOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deletePendingOrder.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            //delete multiple pendingorder
            .addCase(deleteMultiplePendingOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMultiplePendingOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteMultiplePendingOrder.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(getDuplicateBarcodeNumbers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDuplicateBarcodeNumbers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.duplicateBarcodeNumbers = action.payload?.duplicates;
                state.totalSameDuplicateNumbers = action.payload?.duplicates.length;
                // state.totalUnknownBarcodeNumbers = action.payload.totalUnknownBarcodeNumbers;
                // state.totalSameDuplicateNumbers = action.payload?.sameDuplicates.length;
                // state.totalUnknownBarcodeNumbers = action.payload?.unknownBarcodes.length;
            })
            .addCase(getDuplicateBarcodeNumbers.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getPaginatedBookingData
            .addCase(getPaginatedPendingOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaginatedPendingOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pendingOrder = action.payload?.data;
                state.totalData = action.payload?.totalData;
                state.totalPages = action.payload?.totalPages;
                state.currentPage = action.payload?.currentPage;
            })
            .addCase(getPaginatedPendingOrders.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
    },
});

export const {
    setPageLimit,
    toggleAddModal,
    toggleEditModal,
    editPendingData,
    toggleDetailModal,
    closeDetailModal,
    toggleInfoModal,
    toggleConfirmModal
} = pendingOrderSlice.actions;

export default pendingOrderSlice.reducer;
