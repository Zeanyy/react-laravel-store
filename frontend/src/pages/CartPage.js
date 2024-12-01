import { Link, useLoaderData } from "react-router-dom";
import Button from "../component/Button";
import ProductImage from "../component/ProductImage";
import axios from "axios";
import { useState } from "react";

function Cart() {
    const { id, data } = useLoaderData();
    const [products, setProducts] = useState(data);

    const handleRemoveItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${id}/remove/${productId}`);
            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error("Error:", error.response.data.message);
        }
    };

    const handleChangeQuantity = async (productId, quantity) => {
        if (quantity <= 0) {
            handleRemoveItem(productId);
        } else {
            try {
                await axios.put(`http://localhost:8000/api/cart/${id}/update/${productId}/${quantity}`);
                const updatedProducts = products.map((product) =>
                    product.id === productId ? { ...product, quantity: quantity } : product
                );
                setProducts(updatedProducts);
            } catch (error) {
                console.error("Error:", error.response.data.message);
            }
        }
    };

    return (
        <>
            {products.length <= 0 ?
                <div className="container mx-auto p-8">
                    <div className="bg-white p-10 rounded-lg text-center">
                        <h1 className="text-2xl font-bold mb-6">Twój koszyk jest pusty</h1>
                        <p className="text-gray-600 mb-6">Nie dodałeś jeszcze żadnych produktów do koszyka.</p>
                        <Link to="/">
                            <button className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500">
                                Powrót do sklepu
                            </button>
                        </Link>
                    </div>
                </div> :
                <div className="container mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-8">Koszyk</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lista produktów */}
                        <div className="col-span-2 space-y-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white p-6 rounded-lg shadow-md flex items-center">
                                    <ProductImage productImagePath={product.image_url} className="w-24 h-24 rounded-lg mr-6" />
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                        <p className="text-sm text-gray-500">{product.description}</p>
                                        <p className="text-lg font-bold mt-2">
                                            {(Math.round(product.price * product.quantity * 100) / 100).toFixed(2)} PLN
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <Button handleEvent={() => handleChangeQuantity(product.id, --product.quantity)} text="-" className="text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-50" />
                                        <span className="text-lg font-medium px-4">{product.quantity}</span>
                                        <Button handleEvent={() => handleChangeQuantity(product.id, ++product.quantity)} text="+" className="text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-50" />
                                    </div>
                                    <Button handleEvent={() => handleRemoveItem(product.id)} text="×" className="ml-4 text-red-500" />
                                </div>
                            ))}
                        </div>
                        {/* Podsumowanie zamówienia */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Podsumowanie zamówienia</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Wartość koszyka</span>
                                    <span>99,00 PLN</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Koszt dostawy</span>
                                    <span>5,00 PLN</span>
                                </div>
                                <hr />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Łączna kwota</span>
                                    <span>112,32 PLN</span>
                                </div>
                                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-500">
                                    Przejdź do płatności
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    );
}

export default Cart;
