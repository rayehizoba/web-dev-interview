import React, { useEffect, useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";
import axios from "axios";
import PaginationLinks from "@/Components/PaginationLinks";

const ListProducts = () => {
    const [products, setProducts] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const handleChangePerPage = (val) =>{
        setItemsPerPage(val)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `/api/react_interview/${itemsPerPage}/?page=${pageNumber + 1}`
            );
            setProducts(response.data.products);
            console.log(response.data.products);
        };
        fetchData();
    }, [pageNumber, itemsPerPage]);

    return (
        <div className="relative sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
            <h1 className="font-900 text-4xl bg-white w-full text-center mt-4 py-4">
                List of Products
            </h1>
            <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="relative w-48 ml-auto">
                    <input
                        type="checkbox"
                        id="showbox"
                        className="hidden absolute"
                    />
                    <label
                        htmlFor="showbox"
                        className="flex items-center space-x-1 cursor-pointer"
                    >
                        <span className="text-lg">Show</span>
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
                        className="absolute mt-1 top-full min-w-max shadow rounded opacity-0 bg-gray-300 border border-gray-400 transition delay-75 ease-in-out z-10"
                    >
                        <ul className="block text-gray-900" style={{minWidth:'100px'}}>
                            <li className="block px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setItemsPerPage(20)}>
                                20                                
                            </li>
                            <li className="block px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setItemsPerPage(30)}>
                                30                                
                            </li>
                            <li className="block px-3 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => setItemsPerPage(40)}>
                                40                               
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-4">
                    {products?.data?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {products?.data?.map((product) => {
                                return (
                                    <Product
                                        key={product.id}
                                        product={product}
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
                        data={products}
                        setPageNumber={setPageNumber}
                        itemsPerPage={itemsPerPage}
                    />
                </div>

                <div className="py-8 mt-8 bg-gray-100 justify-center">
                    <div className="container max-w-screen-lg mx-auto">
                        <AddProduct />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProducts;
