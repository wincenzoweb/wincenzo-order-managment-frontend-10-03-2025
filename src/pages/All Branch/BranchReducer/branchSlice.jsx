import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BranchService from "./branchService";
import { toast } from "react-toastify";

// Async thunk for adding branch
export const addBranch = createAsyncThunk(
    "branches/addBranch",
    async (branchData, thunkAPI) => {
        try {
            const response = await BranchService.addBranch(branchData);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for branch login
export const branchLogin = createAsyncThunk(
    "branches/branchLogin",
    async (loginData, thunkAPI) => {
        try {
            const response = await BranchService.branchLogin(loginData);
            if (response) {
                localStorage.setItem("loggedInBranch", JSON.stringify(response));
            }
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting all branches
export const getAllBranch = createAsyncThunk(
    "branches/getAllBranch",
    async (thunkAPI) => {
        try {
            const response = await BranchService.getAllBranch();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for getting branch by Id
export const getBranchById = createAsyncThunk(
    "branches/getBranch",
    async (thunkAPI) => {
        try {
            const response = await BranchService.getBranchById();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for deleting a branch
export const deleteBranch = createAsyncThunk(
    "branches/deleteBranch",
    async (branchId, thunkAPI) => {
        try {
            const response = await BranchService.deleteBranch(branchId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for updating a branch
export const updateBranch = createAsyncThunk(
    "branches/updateBranch",
    async (branch, thunkAPI) => {
        try {
            const response = await BranchService.updateBranch(branch);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const branchSlice = createSlice({
    name: "branch",
    initialState: {
        branches: [],
        editItem: {},
        detailItem: {},
        branch: {},
        isLoading: false,
        addModel: false,
        editModal: false,
        detailModal: false,
        confirmModel: false,
        itemId: null,
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.addModel = action.payload;
        },
        toggleEditModal: (state, action) => {
            state.editModal = action.payload;
            state.editItem = {}
        },
        editBranch: (state, action) => {
            state.editItem = action.payload;
            state.editModal = !state.editModal;
        },
        toggleDetailModal: (state, action) => {
            state.detailItem = action.payload;
            state.detailModal = !state.detailModal;
        },
        closeDetailModal: (state, action) => {
            state.detailModal = action.payload;
            state.detailItem = {}
        },
        toggleConfirmModal: (state, action) => {
            state.confirmModel = !state.confirmModel;
            state.itemId = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            // add
            .addCase(addBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(addBranch.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getAll
            .addCase(getAllBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.branches = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(getAllBranch.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // getSingle
            .addCase(getBranchById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBranchById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.branch = action.payload?.branch;
                toast.success(action.payload.message);
            })
            .addCase(getBranchById.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // delete
            .addCase(deleteBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload.message);
            })
            .addCase(deleteBranch.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            // update
            .addCase(updateBranch.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBranch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editItem = {};
                toast.success(action.payload.message);
            })
            .addCase(updateBranch.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    },
});

export const {
    toggleAddModal,
    toggleEditModal,
    toggleDetailModal,
    closeDetailModal,
    editBranch,
    toggleConfirmModal,
} = branchSlice.actions;
export default branchSlice.reducer;
