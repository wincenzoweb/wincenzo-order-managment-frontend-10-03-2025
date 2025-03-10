import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import PaidUserService from "./paidUserService";
//####################### Payment Data with Userdata ####################//
// Async thunk for getting paginated booking data
export const getPaginatedPaidUserInfos = createAsyncThunk(
    "paymentdata/getPaginatedPaymentData",
    async ({ page, limit, search, startDate, endDate, filterByDuplicateBarcode }, thunkAPI) => {
        try {
            const response = await PaidUserService.getPaginatedPaidUserInfos(page, limit, search, startDate, endDate, filterByDuplicateBarcode);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting get Duplicate Barcode Numbers
export const getDuplicateBarcodesData = createAsyncThunk(
    "paymentdata/getDuplicateBarcodeNumbers",
    async (_, thunkAPI) => {
        try {
            const response = await PaidUserService.getDuplicateBarcodesData();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAllPaymentInfo = createAsyncThunk(
    "UserPaymentdata/getAllPaymentInfo",
    async (thunkAPI) => {
        try {
            const response = await PaidUserService.getAllUserPaymentInfo();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting payment data
export const deletePaymentInfo = createAsyncThunk(
    "UserPaymentdata/deletePaymentInfo",
    async (dataId, thunkAPI) => {
        try {
            const response = await PaidUserService.deleteUserPaymentInfo(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting payment data list
export const deletePaymentInfoList = createAsyncThunk(
    "UserPaymentdata/deletePaymentInfoList",
    async (idList, thunkAPI) => {
        try {
            const response = await PaidUserService.deleteUserPaymentInfoList(idList);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const paidUserSlice = createSlice({
    name: "paiduserdata",
    initialState: {
        totalData: 0,
        totalPages: 0,
        currentPage: 0,
        pageLimit: 10,
        paidUserInfos: [],
        totalPaymentsDataCount:0,
        duplicateBarcodeNumbers:[],
        totalDuplicateBarcodeNumbers: 0,
        detailItem: {},
        isLoading: false,
        detailModal: false,
        confirmModel: false,
        itemId: null,
    },
    reducers: {
        setPageLimit: (state, action) => {
            state.pageLimit = action.payload;
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
            //Userdata of Payment Complete
            // getPaginatedPaymentData
            .addCase(getPaginatedPaidUserInfos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaginatedPaidUserInfos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paidUserInfos = action.payload?.data;
                state.totalData = action.payload?.totalRecords;
                state.totalPages = action.payload?.totalPages;
                state.currentPage = action.payload?.Page;
            })
            .addCase(getPaginatedPaidUserInfos.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getAllUser
            .addCase(getAllPaymentInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPaymentInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paidUserInfos = action.payload?.data;
                state.totalPaymentsDataCount = action.payload?.data.length;
                state.totalData = action.payload?.totalData || action.payload?.data.length;
                toast.success(action.payload.message);
            })
            .addCase(getAllPaymentInfo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // delete
            .addCase(deletePaymentInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePaymentInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deletePaymentInfo.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            //delete List
            .addCase(deletePaymentInfoList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePaymentInfoList.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deletePaymentInfoList.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(getDuplicateBarcodesData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDuplicateBarcodesData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.duplicateBarcodeNumbers = action.payload?.duplicates;
                state.totalDuplicateBarcodeNumbers = action.payload?.duplicates.length;
            })
            .addCase(getDuplicateBarcodesData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    },
});

export const {
    setPageLimit,
    toggleDetailModal,
    closeDetailModal,
    toggleConfirmModal
} = paidUserSlice.actions;

export default paidUserSlice.reducer;
