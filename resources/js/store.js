import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer from './redux/slices/productSlice'
import { productApiService } from './features/api/productApi';


export const store = configureStore({
    composeWithDevTools,
    reducer: {
        products: productReducer,
        [productApiService.reducerPath]: productApiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            productApiService.middleware,
        ]),
    //middleware: getDefaultMiddleware => getDefaultMiddleware().concat([authBaseApi.middleware, unauthBaseApi.middleware])
});

setupListeners(store.dispatch);