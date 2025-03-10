import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import shiprocketService from "./shiprocketService";

// Thunks for Shiprocket credentials
export const getShiprocketCredentials = createAsyncThunk(
    "shiprocket/get-credentials",
    async (thunkAPI) => {
        try {
            return await shiprocketService.getCredentials();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateShiprocketCredentials = createAsyncThunk(
    "shiprocket/update-credentials",
    async (data, thunkAPI) => {
        try {
            return await shiprocketService.updateCredentials(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const shiprocketSlice = createSlice({
    name: "shiprocket",
    initialState: {
        credentials: null,
        isLoading: false,
        addModal: false,
        editModal: false,
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.addModal = action.payload;
        },
        toggleEditModal: (state, action) => {
            state.editModal = action.payload;
        },
        editShiprocketData: (state, action) => {
            state.editItem = action.payload;
            state.editModal = !state.editModal;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShiprocketCredentials.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getShiprocketCredentials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.credentials = action.payload;
            })
            .addCase(getShiprocketCredentials.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(updateShiprocketCredentials.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateShiprocketCredentials.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(updateShiprocketCredentials.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    },
});

export const { toggleAddModal, toggleEditModal, editShiprocketData } = shiprocketSlice.actions;

export default shiprocketSlice.reducer;
