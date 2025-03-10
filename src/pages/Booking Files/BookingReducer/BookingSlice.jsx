import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookingService from "./BookingService";
import { toast } from "react-toastify";

// Async thunk for adding booking data
export const addNewFile = createAsyncThunk(
    "bookingdata/addNewFile",
    async (Data, thunkAPI) => {
        try {
            const response = await BookingService.addNewFile(Data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting all booking data
export const getAllBookingData = createAsyncThunk(
    "bookingdata/getAllBookingData",
    async (thunkAPI) => {
        try {
            const response = await BookingService.getAllBookingData();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting booking data by id
export const getBookingDataById = createAsyncThunk(
    "bookingdata/getBookingDataById",
    async (dataId, thunkAPI) => {
        try {
            const response = await BookingService.getBookingDataById(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting booking data
export const deleteBookingData = createAsyncThunk(
    "bookingdata/deleteBookingData",
    async (dataId, thunkAPI) => {
        try {
            const response = await BookingService.deleteBookingData(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting booking data list
export const deleteBookingDataList = createAsyncThunk(
    "bookingdata/deleteBookingDataList",
    async (idList, thunkAPI) => {
        try {
            const response = await BookingService.deleteBookingDataList(idList);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for updating booking data
export const updateBookingData = createAsyncThunk(
    "bookingdata/updateBookingData",
    async (data, thunkAPI) => {
        try {
            const response = await BookingService.updateBookingData(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting paginated booking data
export const getPaginatedBookingData = createAsyncThunk(
    "bookingdata/getPaginatedBookingData",
    async ({ page, limit, search, startDate, endDate, filterByDuplicateBarcode, filterByUnknownBarcode }, thunkAPI) => {
        try {
            const response = await BookingService.getPaginatedBookingData(page, limit, search, startDate, endDate, filterByDuplicateBarcode, filterByUnknownBarcode);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getDuplicateBookingBarcodeNumbers = createAsyncThunk(
    "bookingfile/getDuplicateBookingBarcodeNumbers",
    async (_, thunkAPI) => {
        try {
            const response = await BookingService.getDuplicateBookingBarcodeNumbers();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


const bookingSlice = createSlice({
    name: "bookingdata",
    initialState: {
        bookingdata: [],
        duplicateBarcodeNumbers: [],
        totalSameDuplicateNumbers: 0,
        totalUnknownBarcodeNumbers: 0, // Count of duplicate numbers
        totalBookingDataCount: 0,  // Total number of booking records
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
        infoModel: false,
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
        editBookingData: (state, action) => {
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
        toggleInfoModal: (state, action) => {
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
                toast.error(action.payload?.message);
            })
            // getAll
            .addCase(getAllBookingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBookingData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookingdata = action.payload?.data;
                toast.success(action.payload.message);
            })
            .addCase(getAllBookingData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getById
            .addCase(getBookingDataById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBookingDataById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detailItem = action.payload?.user;
                toast.success(action.payload.message);
            })
            .addCase(getBookingDataById.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // delete
            .addCase(deleteBookingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBookingData.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteBookingData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            //delete List
            .addCase(deleteBookingDataList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBookingDataList.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteBookingDataList.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(getDuplicateBookingBarcodeNumbers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDuplicateBookingBarcodeNumbers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.duplicateBarcodeNumbers = action.payload?.duplicates; // assuming API returns an array
                state.totalSameDuplicateNumbers = action.payload?.duplicates.length; 
            })
            .addCase(getDuplicateBookingBarcodeNumbers.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // update
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
            //     toast.error(action.payload?.response?.data?.message);
            // })



            .addCase(updateBookingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBookingData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updateBookingData.rejected, (state, action) => {
                state.isLoading = false;
                
                // Capture and display error message
                const errorMessage = action.error?.response?.data?.message || 'Failed to update data';
                toast.error(errorMessage);
            })
            // getPaginatedBookingData
            .addCase(getPaginatedBookingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaginatedBookingData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookingdata = action.payload?.data;
                state.totalData = action.payload?.totalData;
                state.totalPages = action.payload?.totalPages;
                state.currentPage = action.payload?.currentPage;
                // state.totalSameDuplicateNumbers = action.payload?.duplicates.length;
                // state.totalUnknownBarcodeNumbers = action.payload.totalUnknownBarcodeNumbers;
                // state.totalDuplicateNumbers = action.payload?.duplicates.length;
            })
            .addCase(getPaginatedBookingData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            

    },
});

export const {
    setPageLimit,
    toggleAddModal,
    toggleEditModal,
    editBookingData,
    toggleDetailModal,
    closeDetailModal,
    toggleInfoModal,
    toggleConfirmModal
} = bookingSlice.actions;

export default bookingSlice.reducer;
