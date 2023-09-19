import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const uploadBankDetails = createAsyncThunk("uploadBankDetails", async ({ bankName, accountNo, ifscCode }, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/bankDetails/upload`
    try {
        const response = await axios.post(url, { bankName, accountNo, ifscCode }, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const uploadUpiDetails = createAsyncThunk("uploadUpiDetails", async ({ upiId, upiName }, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/upiDetails/upload`
    try {
        const response = await axios.post(url, { upiId, upiName  }, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const getAllUserBankDetails = createAsyncThunk("getAllUserBankDetails", async () => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/admin/bankDetails/allUser/get`
    try {
        const response = await axios.post(url, {}, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return console.log("error")
    }
})
export const getAllUserUpiDetails = createAsyncThunk("getAllUserUpiDetails", async () => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/admin/upiDetails/allUser/get`
    try {
        const response = await axios.post(url, {}, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return console.log("error")
    }
})
// ...

export const uploadScholarship = createAsyncThunk("uploadScholarship", async ({ title, courseName, pdf }) => {
    console.log(title,pdf,courseName,pdf)
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
  
    let url = `http://localhost:5500/api/v1/admin/upload/scholarship`;
  
    try {
      const response = await axios.post(url, {title,pdf,courseName}, config);
      return response.data;
    } catch (error) {
      return console.log("error");
    }
  });
  
export const getScholarshipSlice = createSlice({
    name: "scholarship",
    initialState: {
        isLoading: false,
        isSuccess: false,
        allUserBankDetails: [],
        allUserUpiDetails: [],
        scholarshipPdf: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadBankDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadBankDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(uploadBankDetails.rejected, (state) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
            })
            .addCase(uploadUpiDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadUpiDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(uploadUpiDetails.rejected, (state) => {
                state.isError = true
                state.isSuccess = false
                state.isLoading = false
            })
            .addCase(getAllUserBankDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUserBankDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.allUserBankDetails= action.payload
                state.isSuccess = true
            })
            .addCase(getAllUserBankDetails.rejected, (state) => {
                state.isError = true
                state.allUserBankDetails= []
                state.isSuccess = false
                state.isLoading = false
            })
            .addCase(getAllUserUpiDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUserUpiDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.allUserUpiDetails= action.payload
                state.isSuccess = true
            })
            .addCase(getAllUserUpiDetails.rejected, (state) => {
                state.isError = true
                state.allUserUpiDetails= []
                state.isSuccess = false
                state.isLoading = false
            })
            .addCase(uploadScholarship.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadScholarship.fulfilled, (state, action) => {
                state.isLoading = false
                state.scholarshipPdf= action.payload
                state.isSuccess = true
            })
            .addCase(uploadScholarship.rejected, (state) => {
                state.isError = true
                state.scholarshipPdf= []
                state.isSuccess = false
                state.isLoading = false
            })

    }
})

export default getScholarshipSlice.reducer