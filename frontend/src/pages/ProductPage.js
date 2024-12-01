import { useLoaderData } from "react-router-dom";
import ProductImage from "../component/ProductImage";
import Button from "../component/Button";


function Product() {
    const product = useLoaderData()[0]

    return (
        <div className="container mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Zdjęcie produktu */}
                <div className="flex justify-center items-center">
                    <div className="w-full max-w-sm h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                        <ProductImage
                            productImagePath={product.image_url}
                            className="w-96 h-96 object-contain"
                        />
                    </div>
                </div>

                {/* Informacje o produkcie */}
                <div className="flex flex-col justify-between h-[400px]">
                    <div>
                        <h3 className="text-sm text-gray-500">{product.category_name}</h3>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            <span className="text-2xl font-bold">{product.price} PLN</span>
                        </div>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        <div className="flex items-center mb-6">
                            {product.stock ? (
                                <span className="text-green-600 font-medium">
                                    ✓ W magazynie i gotowy do wysyłki
                                </span>
                            ) : (
                                <span className="text-red-600 font-medium">
                                    × Produkt niedostępny w magazynie
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Przyciski */}
                    {product.stock > 0 && (
                        <div className="mt-auto">
                            <div className="flex space-x-4">
                                <Button handleEventName="addToCart" id={product.id} text='Dodaj do koszyka' className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-500" />
                                <Button handleEventName="buyNow" id={product.id} text='Kup teraz!' className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Product;