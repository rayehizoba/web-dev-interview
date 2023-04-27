import React, { useEffect, useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";
import PaginationLinks from "@/Components/PaginationLinks";
import { useGetPaginatedProductsQuery } from "@/features/api/productApi";
import UpdateProduct from "./UpdateProduct";

const ListProducts = () => {
    /* const [products, setProducts] = useState(null); */
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sort, setSort] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSelectedProduct, setIsSelectedProduct] = useState(false);
    const { data, refetch, isLoading, isFetching, isError, error, isSuccess } =
        useGetPaginatedProductsQuery({ itemsPerPage, sort, pageNumber });

    useEffect(() => {
        refetch({ itemsPerPage, sort, pageNumber });
    }, [sort, pageNumber, itemsPerPage]);

    return (
        <div className="relative sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
            <h1 className="font-900 text-4xl bg-white w-full text-center mt-4 py-4">
                List of Products
            </h1>
            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="flex justify-end">
                    <div className="relative w-48">
                        <input
                            type="checkbox"
                            id="showbox"
                            className="hidden absolute"
                        />
                        <label
                            htmlFor="showbox"
                            className="flex items-center space-x-1 cursor-pointer justify-between border-2 rounded-md px-1"
                        >
                            <span className="text-lg">show By</span>
                            <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </label>
                        <div
                            id="showboxmenu"
                            className="shadow absolute w-full rounded opacity-0 bg-gray-300 border border-gray-400 transition delay-75 ease-in-out z-10"
                        >
                            <ul className="block text-gray-900">
                                <li
                                    className="block px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setItemsPerPage(10)}
                                >
                                    10
                                </li>
                                <li
                                    className="block px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setItemsPerPage(20)}
                                >
                                    20
                                </li>
                                <li
                                    className="block px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setItemsPerPage(30)}
                                >
                                    30
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative w-48 ml-2">
                        <input
                            type="checkbox"
                            id="sortbox"
                            className="hidden absolute"
                        />
                        <label
                            htmlFor="sortbox"
                            className="flex items-center space-x-1 cursor-pointer justify-between border-2 rounded-md px-1"
                        >
                            <span className="text-lg">Sort By</span>
                            <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </label>
                        <div
                            id="sortboxmenu"
                            className="p-2 shadow-md absolute w-full rounded opacity-0 bg-gray-50 border border-gray-400 transition delay-75 ease-in-out z-10"
                        >
                            <div className="block">
                                <div className="bg-gray-100 text-red-800">
                                    Name
                                </div>
                                <div className="block">
                                    <div
                                        className="block pl-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setSort("name_ASC")}
                                    >
                                        Asc A_Z
                                    </div>
                                    <div
                                        className="block pl-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setSort("name_DESC")}
                                    >
                                        Desc Z_A
                                    </div>
                                </div>
                            </div>
                            <div className="block">
                                <div className="bg-gray-100 text-red-800">
                                    Price
                                </div>
                                <div className="block">
                                    <div
                                        className="block pl-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setSort("amount_ASC")}
                                    >
                                        Low to High
                                    </div>
                                    <div
                                        className="block pl-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setSort("amount_DESC")}
                                    >
                                        High to Low
                                    </div>
                                </div>
                            </div>
                            <div className="block">
                                <div className="bg-gray-100 text-red-800">
                                    Date
                                </div>
                                <div className="block">
                                    <div
                                        className="block pl-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setSort("date_latest")}
                                    >
                                        Latest
                                    </div>
                                    <div
                                        className="block pl-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => setSort("date_oldest")}
                                    >
                                        Oldest
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading || isFetching ? (
                    <div className="w-full py-48 text-center text-lg text-gray-400">
                        Please wait... Loading products
                    </div>
                ) : (
                    <>
                        <div className="mt-4">
                            {data?.products?.data?.length ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                    {data?.products?.data?.map((product) => {
                                        return (
                                            <Product
                                                key={product.id}
                                                product={product}
                                                setSelectedProduct={
                                                    setSelectedProduct
                                                }
                                                setIsSelectedProduct={
                                                    setIsSelectedProduct
                                                }
                                                refetch={refetch}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="w-full text-center rounded overflow-hidden shadow-lg py-8 px-4 bg-white">
                                    <p className="font-700 text-2xl capitalize">
                                        No products availbale
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 px-4">
                            <PaginationLinks
                                data={data?.products}
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    </>
                )}

                <div className="py-8 mt-8 bg-gray-100 justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        {isSelectedProduct ? (
                            <UpdateProduct
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                isSelectedProduct={isSelectedProduct}
                                setIsSelectedProduct={setIsSelectedProduct}
                                refetch={refetch}
                                itemsPerPage={itemsPerPage}
                                pageNumber={pageNumber}
                            />
                        ) : (
                            <AddProduct
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                                isSelectedProduct={isSelectedProduct}
                                setIsSelectedProduct={setIsSelectedProduct}
                                refetch={refetch}
                                itemsPerPage={itemsPerPage}
                                pageNumber={pageNumber}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProducts;
