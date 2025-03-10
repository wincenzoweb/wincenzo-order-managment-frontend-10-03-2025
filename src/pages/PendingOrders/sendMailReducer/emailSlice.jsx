import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailService from "./emailService";
import { toast } from "react-toastify";



// Async thunk to send email
export const sendMail = createAsyncThunk(
    "email/sendMail",
    async (data, thunkAPI) => {
        console.log("first", data)
        try {
            const response = await emailService.sendMail(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Slice
const emailSlice = createSlice({
    name: "email",
    initialState: {
        isLoading: false,
        isError: false,
        emailModal: false,
        emailItem: {}
    },
    reducers: {
        toggleEmailModal: (state, action) => {
            state.emailModal = !state.emailModal
            state.emailItem = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(sendMail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                toast.success(action.payload?.body?.message);
            })
            .addCase(sendMail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                toast.error(action.payload?.body?.message)
            });
    },
});


export const {

    toggleEmailModal,

} = emailSlice.actions;
export default emailSlice.reducer;
