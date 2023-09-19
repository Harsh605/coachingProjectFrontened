import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getCategories = createAsyncThunk("getCategories", async () => {
    let url = `http://localhost:5500/api/v1/admin/category/getCategory`
    const res = await fetch(url)
    const result = res.json()
    return result
})
export const addCategory = createAsyncThunk("addCategory", async ({ name, parentId }, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/admin/category/create`
    try {
        const response = await axios.post(url, { name, parentId }, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const deleteCategory = createAsyncThunk("deleteCategory", async (ids, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/admin/category/delete`
    try {
        const response = await axios.post(url, ids, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        isLoading : false,
        data: {},  
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getCategories.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getCategories.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(getCategories.rejected,(state)=>{
            state.isError=true
            state.data=null
            state.isLoading=false
        })
        .addCase(deleteCategory.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(deleteCategory.rejected,(state)=>{
            state.isError=true
            state.data=null
            state.isLoading=false
        })
        
    }
})

export default categoriesSlice.reducer