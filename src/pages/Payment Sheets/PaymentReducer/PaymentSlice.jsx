import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PaymentService from "./PaymentSevice";
import { toast } from "react-toastify";

// Async thunk for adding payment data
export const addNewFile = createAsyncThunk(
    "paymentdata/addNewFile",
    async (Data, thunkAPI) => {
        try {
            const response = await PaymentService.addNewFile(Data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting all payment data
// export const getAllPaymentData = createAsyncThunk(
//     "paymentdata/getAllPaymentData",
//     async (thunkAPI) => {
//         try {
//             const response = await PaymentService.getAllPaymentData();
//             return response;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );



export const getAllPaymentData = createAsyncThunk(
    "paymentdata/getAllPaymentData",
    async (_, thunkAPI) => { // Pass an underscore since no parameters are used
        try {
            const response = await PaymentService.getAllPaymentData();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);



















// Async thunk for getting payment data by id
export const getPaymentDataById = createAsyncThunk(
    "paymentdata/getPaymentDataById",
    async (dataId, thunkAPI) => {
        try {
            const response = await PaymentService.getPaymentDataById(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting payment data
export const deletePaymentData = createAsyncThunk(
    "paymentdata/deletePaymentData",
    async (dataId, thunkAPI) => {
        try {
            const response = await PaymentService.deletePaymentData(dataId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting payment data list
export const deletePaymentDataList = createAsyncThunk(
    "paymentdata/deletePaymentDataList",
    async (idList, thunkAPI) => {
        try {
            const response = await PaymentService.deletePaymentDataList(idList);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for updating payment data
export const updatePaymentData = createAsyncThunk(
    "paymentdata/updatePaymentData",
    async (data, thunkAPI) => {
        try {
            const response = await PaymentService.updatePaymentData(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting paginated booking data
export const getPaginatedPaymentData = createAsyncThunk(
    "paymentdata/getPaginatedPaymentData",
    async ({ page, limit, search, startDate, endDate, filterByDuplicateArticalNumber }, thunkAPI) => {
        try {
            const response = await PaymentService.getPaginatedPaymentData(page, limit, search, startDate, endDate, filterByDuplicateArticalNumber);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting get Duplicate Article Numbers
// export const getDuplicateArticleNumbers = createAsyncThunk(
//     "paymentdata/getDuplicateArticleNumbers",
//     async (thunkAPI) => {
//         try {
//             const response = await PaymentService.getDuplicateArticleNumbers();
//             return response;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );





export const getDuplicateArticleNumbers = createAsyncThunk(
    "paymentdata/getDuplicateArticleNumbers",
    async (thunkAPI) => {
        try {
            const response = await PaymentService.getDuplicateArticleNumbers();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);








const paymentSlice = createSlice({
    name: "paymentdata",
    initialState: {
        paymentdata: [],
        duplicateArticleNumbers: [],
        totalDuplicateNumbers: 0,
        totalPaymentDataCount: 0,
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
        editPaymentData: (state, action) => {
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
            .addCase(getAllPaymentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPaymentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentdata = action.payload?.data;
                state.totalPaymentDataCount = action.payload?.data.length; // Set total payment data count
                state.totalData = action.payload?.totalData || action.payload?.data.length; // Set total data count if available
                toast.success(action.payload.message);
            })
            .addCase(getAllPaymentData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getById
            .addCase(getPaymentDataById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaymentDataById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.detailItem = action.payload?.user;
                toast.success(action.payload.message);
            })
            .addCase(getPaymentDataById.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // delete
            .addCase(deletePaymentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePaymentData.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deletePaymentData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            //delete List
            .addCase(deletePaymentDataList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePaymentDataList.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deletePaymentDataList.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // update
            .addCase(updatePaymentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePaymentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updatePaymentData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getPaginatedPaymentData
            .addCase(getPaginatedPaymentData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaginatedPaymentData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.paymentdata = action.payload?.data;
                state.totalData = action.payload?.totalData;
                state.totalPages = action.payload?.totalPages;
                state.currentPage = action.payload?.currentPage;
            })
            .addCase(getPaginatedPaymentData.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // get Duplicate Article Numbers
            .addCase(getDuplicateArticleNumbers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getDuplicateArticleNumbers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.duplicateArticleNumbers = action.payload?.duplicates;
                state.totalDuplicateNumbers = action.payload?.duplicates.length; 
            })
            .addCase(getDuplicateArticleNumbers.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })


    },
});

export const {
    setPageLimit,
    toggleAddModal,
    toggleEditModal,
    editPaymentData,
    toggleDetailModal,
    closeDetailModal,
    toggleInfoModal,
    toggleConfirmModal
} = paymentSlice.actions;

export default paymentSlice.reducer;
