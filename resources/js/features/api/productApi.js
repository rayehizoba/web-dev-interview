import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../Constants";

export const productApiService = createApi({
    reducerPath: "productApiService",
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        }),

        getPaginatedProducts: builder.query({
            query: (a) => ({
                url: `/react_interview/${a.itemsPerPage}?sort=${a.sort}&page=${a.pageNumber}`,
            }),
        }),

        getProduct: builder.query({
            query: (id) => `/product/${id}`,
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/react_interview/${id}`,
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            }),
        }),

        createProduct: builder.mutation({
            query: (data) => ({
                url: "/react_interview",
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            }),
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/react_interview/update/${data.id}`,
                method: "PATCH",
                body: data,
                headers: {
                    Accept: "application/json",
                },
                
            }),
        }),
    }),
});

export const {
    useGetPaginatedProductsQuery,
    useGetProductQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productApiService;
