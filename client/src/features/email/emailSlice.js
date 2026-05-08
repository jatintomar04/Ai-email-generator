import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import emailService from "./emailService";

const initialState = {

    emails: [],
    generatedEmail: null,
    singleEmail: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

// GENERATE EMAIL
export const generateEmail = createAsyncThunk(
    "EMAIL/GENERATE",

    async (formData, thunkAPI) => {
       

        try {

            const token =
                thunkAPI.getState().auth.user.token;

            return await emailService.generateEmail(
                formData,
                token
            );

        } catch (error) {

            const message =
                error.response?.data?.message ||
                error.message;

            return thunkAPI.rejectWithValue(message);
        }
    }
);



export const getAllEmails = createAsyncThunk("ALLEMAIL", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const id = thunkAPI.getState().auth.user._id;

        return await emailService.AllEmails(id, token)
    } catch (error) {
        error.response?.data?.message ||
            error.message;
        return thunkAPI.rejectWithValue(message);

    }
})

export const getsingleEmail = createAsyncThunk("SINGLEEMAIL", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await emailService.singleEmail(id, token)
    } catch (error) {
        error.response?.data?.message ||
            error.message;
        return thunkAPI.rejectWithValue(message);

    }
})

export const DeleteEmail = createAsyncThunk("DELETE/EMAIL", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;

        return await emailService.deleteEmail(id, token)
    } catch (error) {
        error.response?.data?.message ||
            error.message;
        return thunkAPI.rejectWithValue(message);

    }
})



const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        builder

            // generate
            .addCase(generateEmail.pending, (state) => {

                state.isLoading = true;
            })

            .addCase(generateEmail.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

                state.generatedEmail = action.payload;

                state.isError = false;
            })

            .addCase(generateEmail.rejected, (state, action) => {

                state.isLoading = false;

                state.isSuccess = false;

                state.isError = true;

                state.message = action.payload;
            })

            // get Allemails
            .addCase(getAllEmails.pending, (state) => {

                state.isLoading = true;
            })

            .addCase(getAllEmails.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

                state.emails = action.payload;

                state.isError = false;
            })

            .addCase(getAllEmails.rejected, (state, action) => {

                state.isLoading = false;

                state.isSuccess = false;

                state.isError = true;

                state.message = action.payload;
            })
            // get singleEmail
            .addCase(getsingleEmail.pending, (state) => {

                state.isLoading = true;
            })

            .addCase(getsingleEmail.fulfilled, (state, action) => {

                state.isLoading = false;

                state.isSuccess = true;

                state.singleEmail = action.payload;

                state.isError = false;
            })

            .addCase(getsingleEmail.rejected, (state, action) => {

                state.isLoading = false;

                state.isSuccess = false;

                state.isError = true;

                state.message = action.payload;
            })
            .addCase(DeleteEmail.fulfilled, (state, action) => {

                state.isLoading = false;

                state.emails = state.emails.filter(
                    email => email._id !== action.payload.id
                );
            })
    }

});


export default emailSlice.reducer;