import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ReturnAndPendingService from "./ReturnAndPendingService"
import { toast } from "react-toastify";

// Async thunk for adding returnandpending data
export const addNewFile = createAsyncThunk(
    "returnandpending/addNewFile",
    async (Data, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.addNewFile(Data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting all returnandpending data
export const getAllReturnAndPendingData = createAsyncThunk(
    "returnandpending/getAllReturnAndPendingData",
    async (thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.getAllReturnAndPendingData();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting returnandpending data by id
export const getReturnAndPendingDataById = createAsyncThunk(
    "returnandpending/getReturnAndPendingDataById",
    async (dataId, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.getReturnAndPendingDataById(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// Async thunk for deleting returnandpending data
export const deleteReturnAndPendingData = createAsyncThunk(
    "returnandpending/deleteReturnAndPendingData",
    async (dataId, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.deleteReturnAndPendingData(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting returnandpending data list
export const deleteReturnAndPendingDataList = createAsyncThunk(
    "returnandpending/deleteReturnAndPendingDataList",
    async (idList, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.deleteReturnAndPendingDataList(idList);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for updating returnandpending data
export const updateReturnAndPendingData = createAsyncThunk(
    "returnandpending/updateReturnAndPendingData",
    async (data, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.updateReturnAndPendingData(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting paginated returnandpending data
export const getPaginatedReturnData = createAsyncThunk(
    "returnandpending/getPaginatedReturnData",
    async ({ page, limit, search, startDate, endDate, filterByDuplicateBarcode, filterByUnknownBarcode }, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.getPaginatedReturnData(page, limit, search, startDate, endDate, filterByDuplicateBarcode, filterByUnknownBarcode);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting get Duplicate Barcode Numbers
export const getDuplicateBarcodeNumbers = createAsyncThunk(
    "returnandpending/getDuplicateBarcodeNumbers",
    async (_, thunkAPI) => {
        try {
            const response = await ReturnAndPendingService.getDuplicateBarcodeNumbers();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const returnAndPendingSlice = createSlice({
    name: "returnandpending",
    initialState: {
        returnAndPendingData: [],
        duplicateBarcodeNumbers: [],
         totalSameDuplicateNumbers: 0, // State to track the total number of same duplicate barcode numbers
        totalUnknownBarcodeNumbers: 0,
        totalData: 0,
        totalPages: 0,
        currentPage: 0,
        pageLimit: 10,
        editItem: {},
        detailItem: {},
        isLoading: false,
        addModel: false,
        editModal: false,
        detailModal: false,
        infoModel:false,
        confirmModel: false,
        itemId: null,
    },
    reducers: {
        setPageLimit: (state, action) => {
            state.pageLimit = action.payload;
        },
        toggleAddModal: (state, action) => {
            state.addModel = action.payload;
        },
        toggleEditModal: (state, action) => {
            state.editModal = action.payload;
            state.editItem = {};
        },
        editReturnAndPendingData: (state, action) => {
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
        toggleInfoModal:(state,action) => {
            state.infoModel = action.payload;
        },
        toggleConfirmModal: (state, action) => {
            state.confirmModel = !state.confirmModel;
            state.itemId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // add
            .addCase(addNewFile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewFile.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(addNewFile.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.error, { closeOnClick: true, autoClose: false, theme: "colored", });
            })
            // getAll
            .addCase(getAllReturnAndPendingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReturnAndPendingData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.returnAndPendingData = action.payload?.data;
                toast.success(action.payload.message);
            })
            .addCase(getAllReturnAndPendingData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getById
            .addCase(getReturnAndPendingDataById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReturnAndPendingDataById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detailItem = action.payload?.user;
                toast.success(action.payload.message);
            })
            .addCase(getReturnAndPendingDataById.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // delete
            .addCase(deleteReturnAndPendingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReturnAndPendingData.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteReturnAndPendingData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            //delete List
            .addCase(deleteReturnAndPendingDataList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReturnAndPendingDataList.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteReturnAndPendingDataList.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // update
            .addCase(updateReturnAndPendingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReturnAndPendingData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updateReturnAndPendingData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getPaginatedReturnData
            .addCase(getPaginatedReturnData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaginatedReturnData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.returnAndPendingData = action.payload?.data;
                state.totalData = action.payload?.totalData;
                state.totalPages = action.payload?.totalPages;
                state.currentPage = action.payload?.currentPage;
                // state.totalSameDuplicateNumbers = action.payload.totalSameDuplicateNumbers;
                state.totalUnknownBarcodeNumbers = action.payload.totalUnknownBarcodeNumbers;

            })
            .addCase(getPaginatedReturnData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // get Duplicate Barcode Numbers
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
            });
    },
});

export const {
    setPageLimit,
    toggleAddModal,
    toggleEditModal,
    toggleInfoModal,
    editReturnAndPendingData,
    toggleDetailModal,
    closeDetailModal,
    toggleConfirmModal,
} = returnAndPendingSlice.actions;

export default returnAndPendingSlice.reducer;
