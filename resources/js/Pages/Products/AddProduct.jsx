import React, { useState } from "react";
import axios from "axios";

const AddProduct = ({ getProducts }) => {
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");
    const [image_name, setImageName] = useState("");
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);

    //on File change
    const onFileChange = (e) => {
        setImageName(e.target.files[0]);
    };

    const submitProduct = (e) => {
        e.preventDefault();
        var formData = new FormData();
        //append fields to form data
        formData.append("name", productName);
        formData.append("amount", amount);
        formData.append("image", image_name);

        axios
            .post("/api/react_interview", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setErrors(null);
                setSuccess(res.data.message);
            })
            .catch((err) => {
                setSuccess(null);
                setErrors(Object.values(err.response.data.errors));
            });
    };

    return (
        <div className="bg-white rounded shadow-lg p-4 px-4 md:px-8 mb-6">
            <h2 class="text-center py-2 text-3xl font-600 mb-12">
                Add New Product
            </h2>

            {errors?.length ? (
                <>
                    {errors?.map((error, index) => {
                        return (
                            <div className="text-red-400" key={index}>
                                {error[0]}
                            </div>
                        );
                    })}
                </>
            ) : null}

            {success ? (
                <>
                    <div className="text-green-400 text-2xl">{success}</div>
                </>
            ) : null}

            <form onSubmit={submitProduct} encType="multipart/form-data">
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
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
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
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-5 mt-4 text-right">
                            <div className="inline-flex items-end">
                                <button
                                    type="submit"
                                    className="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
