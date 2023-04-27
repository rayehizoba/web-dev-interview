import React, { useEffect, useState } from "react";
import { useUpdateProductMutation } from "@/features/api/productApi";
import { useFormik } from "formik";
import * as Yup from "yup";

const UpdateProduct = ({
    selectedProduct,
    setSelectedProduct,
    isSelectedProduct,
    setIsSelectedProduct,
    refetch,
}) => {
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");
    const [image_name, setImageName] = useState("");

    const [updateProduct, { data, isLoading, isError, error, isSuccess }] =
        useUpdateProductMutation();

    //on File change
    const onFileChange = (e) => {
        setImageName(e.target.files[0]);
    };

    const addNewProduct = () => {
        setIsSelectedProduct(false);
        setSelectedProduct(null);
    };

    const formik = useFormik({
        initialValues: {
            name: selectedProduct?.name ? selectedProduct.name : "",
            amount: selectedProduct?.amount
                ? parseInt(selectedProduct?.amount)
                : "",
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required("The name field is required")
                .min(2, "The name field must not be less than 2 characters")
                .max(75, "The name field must not be more than 75 characters"),
            amount: Yup.number().required().min(0),
        }),

        enableReinitialize: true,

        onSubmit: async (values, { setSubmitting, resetForm }) => {
            
            await updateProduct({ ...values, image:image_name, id: selectedProduct.id });
            await refetch();
            setIsSelectedProduct(false);
            setSelectedProduct(null);
            setSubmitting(false);
            resetForm();

            window.scrollTo({
                top: document.body.scrollTop,
                behavior: "smooth",
            });
        },
    });

    /* const submitProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        //append fields to form data
        formData.append("name", productName);
        formData.append("amount", amount);
        formData.append("image", image_name);
        formData.append("id", selectedProduct.id);

        await updateProduct(formData);
        //refetch(itemsPerPage, pageNumber);
    }; */

    return (
        <div className="bg-white rounded shadow-lg p-4 px-4 md:px-8 mb-6">
            <h2 className="text-center py-2 text-3xl font-600 mb-12">
                Update Product
            </h2>

            {isError ? (
                <>
                    {error.status === 402 ? (
                        Object.keys(error.data.errors).map((k, i) => {
                            return (
                                <div className="text-red-400" key={i}>
                                    {error.data.errors[k][0]}
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-red-400">
                            something went wrong... Refresh and try again
                        </div>
                    )}
                </>
            ) : isSuccess ? (
                <div className="text-green-400 text-2xl">{data?.message}</div>
            ) : null}

            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 mt-4">
                    <div className="lg:col-span-3">
                        <div className="grid gap-8 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div className="md:col-span-5">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="image">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image_name"
                                    onChange={onFileChange}
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={formik.values.amount}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-5 mt-4 text-right">
                            <div className="inline-flex items-end">
                                <button
                                    type="submit"
                                    disabled={isLoading ? true : false}
                                    className={`w-48 bg-${
                                        isLoading ? "gray" : "blue"
                                    }-500 hover:bg-${
                                        isLoading ? "gray" : "blue"
                                    }-700 
                                    text-white font-bold py-2 px-4 rounded ${
                                        isLoading
                                            ? "cursor:disabled"
                                            : "cursor:pointer"
                                    }`}
                                >
                                    Update
                                </button>
                                {isSelectedProduct ? (
                                    <button
                                        onClick={addNewProduct}
                                        className={`w-32 bg-blue-500 hover:bg-blue-700 
                                    text-white font-bold py-2 px-4 ml-2 rounded`}
                                    >
                                        Add New
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
