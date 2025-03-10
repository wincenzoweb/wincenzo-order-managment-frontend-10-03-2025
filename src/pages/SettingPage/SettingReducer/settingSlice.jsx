import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import settingService from "./settingService";

// Settings Thunks
export const getAllsettings = createAsyncThunk(
    "setting/get-settings",
    async (thunkAPI) => {
        try {
            return await settingService.getAllsettings();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const AddNewSettings = createAsyncThunk(
    "setting/Add-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.AddSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateSettings = createAsyncThunk(
    "setting/update-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.updateSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteSettings = createAsyncThunk(
    "setting/delete-settings",
    async (data, thunkAPI) => {
        try {
            return await settingService.deleteSettings(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// ReceiverMail Thunks
export const getAllReceiverMails = createAsyncThunk(
    "setting/get-receiverMails",
    async (thunkAPI) => {
        try {
            return await settingService.getAllReceiverMails();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addReceiverMail = createAsyncThunk(
    "setting/add-receiverMail",
    async (data, thunkAPI) => {
        try {
            return await settingService.addReceiverMail(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateReceiverMail = createAsyncThunk(
    "setting/update-receiverMail",
    async (data, thunkAPI) => {
        try {
            return await settingService.updateReceiverMail(data.id, data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteReceiverMail = createAsyncThunk(
    "setting/delete-receiverMail",
    async (data, thunkAPI) => {
        try {
            return await settingService.deleteReceiverMail(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const settingSlice = createSlice({
    name: "settings",
    initialState: {
        settings: [],
        receiverMails: [],
        isLoading: false,
        addModal: false,
        editItem: {},
        editModal: false,
        addMailModel: false,
        editMailModel: false,
        confirmModel: false,
        itemId: null,
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.addModal = action.payload;
        },
        toggleEditModal: (state, action) => {
            state.editModal = action.payload;
            state.editItem = {};
        },
        editSettingData: (state, action) => {
            state.editItem = action.payload;
            state.editModal = !state.editModal;
        },
        toggleAddMailModal: (state, action) => {
            state.addMailModel = action.payload;
        },
        toggleEditMailModal: (state, action) => {
            state.editMailModel = action.payload;
            state.editItem = {};
        },
        editMail: (state, action) => {
            state.editItem = action.payload;
            state.editMailModel = !state.editModal;
        },
        toggleConfirmModal: (state, action) => {
            state.confirmModel = !state.confirmModel;
            state.itemId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Settings
            .addCase(getAllsettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllsettings.fulfilled, (state, action) => {
                state.isLoading = false;
                state.settings = action.payload;
            })
            .addCase(getAllsettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(AddNewSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddNewSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(AddNewSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(updateSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(updateSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(deleteSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSettings.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(deleteSettings.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })

            // ReceiverMail
            .addCase(getAllReceiverMails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReceiverMails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.receiverMails = action.payload;
            })
            .addCase(getAllReceiverMails.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(addReceiverMail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReceiverMail.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(addReceiverMail.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(updateReceiverMail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateReceiverMail.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(updateReceiverMail.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            })
            .addCase(deleteReceiverMail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteReceiverMail.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success(action.payload?.message);
            })
            .addCase(deleteReceiverMail.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload?.response?.data?.message);
            });
    },
});

export const {
    toggleAddModal,
    toggleEditModal,
    editSettingData,
    toggleAddMailModal,
    toggleEditMailModal,
    editMail,
    toggleConfirmModal,
} = settingSlice.actions;

export default settingSlice.reducer;





// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import settingService from "./settingService";

// export const getAllsettings = createAsyncThunk(
//     "setting/get-settings",
//     async (thunkAPI) => {
//         try {
//             return await settingService.getAllsettings();
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );
// export const AddNewSettings = createAsyncThunk(
//     "setting/Add-settings",
//     async (data, thunkAPI) => {
//         try {
//             return await settingService.AddSettings(data);
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );


// export const updateSettings = createAsyncThunk(
//     "setting/update-settings",
//     async (data, thunkAPI) => {
//         try {
//             return await settingService.updateSettings(data);
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );

// export const deleteSettings = createAsyncThunk(
//     "setting/delete-settings",
//     async (data, thunkAPI) => {

//         try {
//             return await settingService.deleteSettings(data);
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );




// export const settingSlice = createSlice({
//     name: "settings",
//     initialState: {
//         settings: [],
//         receiverMail: [],
//         isLoading: false,
//         addModal: false,
//         editItem: {},
//         editModal: false,

//     },
//     reducers: {
//         toggleAddModal: (state, action) => {
//             state.addModal = action.payload;
//         },
//         toggleEditModal: (state, action) => {
//             state.editModal = action.payload;
//             state.editItem = {};
//         },
//         editSettingData: (state, action) => {
//             state.editItem = action.payload;
//             state.editModal = !state.editModal;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllsettings.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getAllsettings.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.settings = action.payload
//             })
//             .addCase(getAllsettings.rejected, (state, action) => {
//                 state.isLoading = false;
//                 toast.error(action.payload?.response?.data?.message);
//             })
//             .addCase(AddNewSettings.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(AddNewSettings.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 toast.success(action.payload?.message);
//             })
//             .addCase(AddNewSettings.rejected, (state, action) => {
//                 state.isLoading = false;
//                 toast.error(action.payload?.response?.data?.message);
//             })
//             .addCase(updateSettings.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(updateSettings.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 toast.success(action.payload?.message)
//             })
//             .addCase(updateSettings.rejected, (state, action) => {
//                 state.isLoading = false;
//                 toast.error(action.payload?.response?.data?.message);
//             })
//             .addCase(deleteSettings.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(deleteSettings.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 toast.success(action.payload?.message);
//             })
//             .addCase(deleteSettings.rejected, (state, action) => {
//                 state.isLoading = false;
//                 toast.error(action.payload?.response?.data?.message);
//             })
//     }
// })

// export const {
//     toggleAddModal,
//     toggleEditModal,
//     editSettingData,
// } = settingSlice.actions;

// export default settingSlice.reducer