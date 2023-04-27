import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products:null,
    product:null,
}




const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        products(state, action) {
            const products = action.payload.products;
            state.products = products;
        },
        product(state, action) {
            const product = action.payload.product;
            state.product = product;
        },
    }

})

export const productActions = productSlice.actions;

export default productSlice.reducer;