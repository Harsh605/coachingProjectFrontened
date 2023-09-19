import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const createOrderApi = createAsyncThunk("order/create", async (orderData, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/order/new`
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, orderData, config); // replace with your API endpoint and data
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const getSingleOrderApi = createAsyncThunk("singleOrder/get", async (id, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/order/${id}`
    try {
        const response = await axios.get(url); // replace with your API endpoint and data
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const getSingleOrderByPaymentIdApi = createAsyncThunk("singleOrderByPaymentId/get", async (id, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/order/pay/${id}`
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url,{},config); // replace with your API endpoint and data
        return response.data.order;
    }
    catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const myAllOrdersApi = createAsyncThunk("myOrders/get", async () => {
    let url = `http://localhost:5500/api/v1/orders/me`
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url,{},config); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        return console.log("error")
    }
})


//admin
export const singleUserAllOrdersByAdmin = createAsyncThunk("singleUserAllOrders/get", async (id, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/admin/selectedUser/orders/${id}`

    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }

    try {
        const response = await axios.post(url,{},config); // replace with your API endpoint and data
        return response.data.orders;
    }
    catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
//admin 
export const adminAllOrdersApi = createAsyncThunk("allOrders/admin", async () => {
    let url = `http://localhost:5500/api/v1/admin/orders`

    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url,{},config); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        return console.log("error")
    }
})
export const adminDeleteOrderApi = createAsyncThunk("deleteOrder/admin", async (id, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/admin/order/${id}`
    
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url,{},config); // replace with your API endpoint and data
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        isLoading: false,
        error: null,
        orderData: null,
        singleOrderData: null,
        singleOrderDataById: null,
        myAllOrders:[],
        adminAllOrders:[],
        singleUserAllOrders:[]
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrderApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrderApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.orderData = action.payload
            })
            .addCase(createOrderApi.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })

            .addCase(getSingleOrderApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleOrderApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.singleOrderData = action.payload
            })
            .addCase(getSingleOrderApi.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })

            .addCase(getSingleOrderByPaymentIdApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSingleOrderByPaymentIdApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.singleOrderDataById = action.payload
            })
            .addCase(getSingleOrderByPaymentIdApi.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })

            .addCase(myAllOrdersApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(myAllOrdersApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.myAllOrders = action.payload 
            })
            .addCase(myAllOrdersApi.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(singleUserAllOrdersByAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(singleUserAllOrdersByAdmin.fulfilled, (state, action) => {
                state.isLoading = false
                state.singleUserAllOrders = action.payload 
            })
            .addCase(singleUserAllOrdersByAdmin.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })



            .addCase(adminAllOrdersApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(adminAllOrdersApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.adminAllOrders = action.payload 
            })
            .addCase(adminAllOrdersApi.rejected, (state, action) => {
                state.isLoading = false
            })

            .addCase(adminDeleteOrderApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(adminDeleteOrderApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload 
            })
            .addCase(adminDeleteOrderApi.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    }
})


export default orderSlice.reducer

