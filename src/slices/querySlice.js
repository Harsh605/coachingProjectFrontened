import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const sendQuery = createAsyncThunk("sendQuery", async ({name, message,sender },{ rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }

    let url =`http://localhost:5500/api/v1/query/send`
    try {
        const response = await axios.post(url, { name, message,sender}, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})



export const querySlice = createSlice({
    name: "query",
    initialState: {
        isLoading : false,
        isError:true,
        data: null

    },
    extraReducers: (builder)=>{
        builder
        .addCase(sendQuery.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(sendQuery.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(sendQuery.rejected,(state)=>{
            state.isError=true
        })
    
    }
})

export default querySlice.reducer