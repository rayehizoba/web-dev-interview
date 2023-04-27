import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteProductMutation } from "@/features/api/productApi";

const Product = ({
    product,
    setSelectedProduct,
    setIsSelectedProduct,
    refetch,
}) => {
    const [deleteProduct] = useDeleteProductMutation();

    const confirmDelete = async () => {
        const c = confirm("Are you sure you want to delete this product?");
        if (c) {
            await deleteProduct(product.id);
            refetch();
        }
    };

    const editProduct = () => {
        setIsSelectedProduct(true);
        setSelectedProduct(product);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
    };
    return (
        <>
            {product ? (
                <>
                    <div className="scale-100 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none flex motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
                        <div className="w-full d-grid p-6">
                            <div className="h-full">
                                <a href="">
                                    <img
                                        className="w-full"
                                        style={{
                                            minHeight: "8rem",
                                            maxHeight: "10rem",
                                        }}
                                        src={
                                            product.image
                                                ? product.image.startsWith(
                                                      "https"
                                                  )
                                                    ? product.image
                                                    : `/storage/images/products/${product.image}`
                                                : "/no_product_image.jpg"
                                        }
                                        alt={product.name}
                                    />

                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">
                                            {product.name}
                                        </div>
                                        <div className="d-flex">
                                            <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                GHC
                                            </span>
                                            <span className="font-bold text-gray-900">
                                                {product.amount}
                                            </span>
                                        </div>
                                    </div>
                                </a>
                                <div className="mt-4 flex justify-between">
                                    <div className="text-left flex justify-between">
                                        <div className="cursor-pointer px-1 mx-1">
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                onClick={confirmDelete}
                                            />
                                        </div>
                                        <div className="cursor-pointer px-1 mx-1">
                                            <FontAwesomeIcon
                                                icon={faPen}
                                                onClick={editProduct}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        {new Date(
                                            product.created_at
                                        ).toLocaleDateString("en-Us", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>No product availbale</div>
            )}
        </>
    );
};

export default Product;
