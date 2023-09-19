import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getProductsApi = createAsyncThunk("getProducts", async () => {
    let url = `http://localhost:5500/api/v1/product`
    const res = await fetch(url)
    const result = res.json()
    return result
})
export const createProduct = createAsyncThunk("createProduct", async ({name, description,price,category,duration },{ rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }

    let url =`http://localhost:5500/api/v1/admin/product/new`
    try {
        const response = await axios.post(url, { name, description,price,category,duration}, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const updateProduct = createAsyncThunk("updateProduct", async ({name, description,price,category,duration,id },{ rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }

    let url =`http://localhost:5500/api/v1/admin/product/update/${id}`
    try {
        const response = await axios.put(url, { name, description,price,category,duration}, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const deleteProduct = createAsyncThunk("deleteProduct", async (id,{ rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }

    let url =`http://localhost:5500/api/v1/admin/product/delete/${id}`
    try {
        const response = await axios.post(url, {}, config); // replace with your API endpoint and data
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const getFilterProductsApi = createAsyncThunk("getFilterProducts", async ({keyword="",currentPage=1,price=[0, 500000],category,ratings=0}) => {
    let url = `http://localhost:5500/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

    if(category){
        url = `http://localhost:5500/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }
    const res = await fetch(url)
    const result = res.json()
    return result
})

export const getSingleProductsApi = createAsyncThunk("getSingleProducts", async (id) => {
    const res = await fetch(`http://localhost:5500/api/v1/product/${id}`)
    const result = res.json()
    return result
})

export const getCoursesUsingCategoryApi = createAsyncThunk("getCoursesUsingCategoryApi", async (id, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/product/cat/${id}`
    try {
        const response = await axios.get(url); // replace with your API endpoint and data
        return response.data.product;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const getProductsSlice = createSlice({
    name: "products",
    initialState: {
        isLoading : false,
        data: [],
        filterProductsdata: [],
        singleProductData:{},
        singleProductCatData:[],
        isError: false,
        newProductData:[],
        updateProductData:[],
        isSuccess:false,
        error:null,
        isSuccess:false
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getProductsApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getProductsApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(getProductsApi.rejected,(state)=>{
            state.isError=true
            state.data=null
            state.isLoading=false
        })
        .addCase(getFilterProductsApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getFilterProductsApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.filterProductsdata=action.payload
        })
        .addCase(getFilterProductsApi.rejected,(state)=>{
            state.isError=true
            state.filterProductsdata=null
            state.isLoading=false
        })
        .addCase(getSingleProductsApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleProductsApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.singleProductData=action.payload
        })
        .addCase(getSingleProductsApi.rejected,(state)=>{
            state.isError=true
            state.singleProductData=null
        })
        .addCase(getCoursesUsingCategoryApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getCoursesUsingCategoryApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.singleProductCatData=action.payload
        })
        .addCase(getCoursesUsingCategoryApi.rejected,(state,action)=>{
            state.error = action.payload
            state.singleProductCatData=[]
        })

        .addCase(createProduct.pending,(state)=>{
            state.isLoading=true
            state.isSuccess=false
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.newProductData=action.payload
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isError= action.payload
            state.isSuccess=false
            state.newProductData=null
            
        })
        .addCase(updateProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.updateProductData=action.payload
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isError= action.payload
            state.updateProductData=null
            
        })
        .addCase(deleteProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=action.payload.success
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isError= action.payload
            state.isSuccess = false
            
        })
    }
})

export default getProductsSlice.reducer