import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk("addItemsToCart", async ({ id, qty }, { getState, rejectWithValue }) => {

    const { custom4 } = getState();
    const { items } = custom4;                   //already cart items

    let existingProduct = items.find(
        (item) => item.productId === id
    )

    if (existingProduct) {
        // existingProduct.quantity += qty;          //We can't do like this
        const updatedCartItems = items.map(item =>
            item.productId === id ? { ...item, quantity: item.quantity + qty } : item
        );
        return updatedCartItems;
    }
    else {
        const res = await axios.get(`http://localhost:5500/api/v1/product/${id}`)
        const newProduct = {
            productId: res.data.product._id,
            name: res.data.product.name,
            price: res.data.product.price,
            image: res.data.product.images[0].url,
            stock: res.data.product.stock,
            category: res.data.product.category,
            quantity: qty
        }
        const updatedCartItems = [...items, newProduct]
        return updatedCartItems
    }

})



export const removeItemsFromCart = createAsyncThunk("removeItemsFromCart", ({ id }, { getState, rejectWithValue }) => {
    const { custom4 } = getState();
    const { items } = custom4;
    const updatedCartItems = items.filter(product => product.productId !== id);

    return updatedCartItems

})

export const saveEnrollInfo = createAsyncThunk("EnrollInfo/save", ({name,aadharNo,fName,DOB,email,phoneNo, country, state,city,address,pinCode,avatar,scholarship,admitCard,sex }) => {
    const EnrollInfo = {name,aadharNo,fName,DOB,email,phoneNo, country, state,city,address,pinCode,avatar,scholarship,admitCard,sex}
    return EnrollInfo
})



export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        isLoading: false,
        error: null,
        EnrollInfo: localStorage.getItem("EnrollInfo")? JSON.parse(localStorage.getItem("EnrollInfo"))
        : {},
    },

    extraReducers: (builder) => {
        builder
            .addCase(addItemsToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
                localStorage.setItem('cartItems', JSON.stringify(action.payload));
            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(removeItemsFromCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeItemsFromCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
                localStorage.setItem('cartItems', JSON.stringify(action.payload));
            })
            .addCase(removeItemsFromCart.rejected, (state, action) => {
                state.error = "error"
                state.isLoading = false
            })
            .addCase(saveEnrollInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(saveEnrollInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.EnrollInfo = action.payload
                localStorage.setItem("EnrollInfo", JSON.stringify(action.payload));
            })
            .addCase(saveEnrollInfo.rejected, (state, action) => {
                state.error = "error"
                state.isLoading = false
            })

    }

})

export default cartSlice.reducer;