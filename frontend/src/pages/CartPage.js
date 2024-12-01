import { Link, useLoaderData } from "react-router-dom";
import Button from "../component/Button";
import ProductImage from "../component/ProductImage";
import axios from "axios";
import { useState } from "react";

function Cart() {
    const { id, data } = useLoaderData();
    const [products, setProducts] = useState(data)

    const handleRemoveItem = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${id}/remove/${productId}`)
            const updatedProducts = products.filter(product => product.id !== productId)
            setProducts(updatedProducts)
        } catch (error) {
            console.error('Error:', error.response.data.message)
        }
    }
    
    const handleChangeQuantity = async (productId, quantity) => {
        if(quantity === 0) {
            handleRemoveItem(productId)
        } else {
            try {
                await axios.put(`http://localhost:8000/api/cart/${id}/update/${productId}/${quantity}`)
                const updatedProducts = products.map(product => 
                    product.id === productId 
                    ? { ...product, quantity: quantity }
                    : product
                )
                setProducts(updatedProducts)
            } catch (error) {
                console.error('Error:', error.response.data.message)
            }
        }
    }
    return (
        <>
            {products.length > 0 ?
                <div className="container">
                    {products.map((product) => (
                        <div className="product" key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <ProductImage productImagePath={product.image_url} />
                                <h1>{(Math.round(product.quantity * product.price*100) / 100).toFixed(2)} pln</h1>
                                <h2>{product.name}</h2>
                            </Link>
                            <div>
                                <Button handleEvent={() => {handleChangeQuantity(product.id, --product.quantity)}} text='-'/>
                                <h4>{product.quantity}</h4>
                                <Button handleEvent={() => {handleChangeQuantity(product.id, ++product.quantity)}} text='+'/>
                            </div>
                            <Button handleEvent={() => {handleRemoveItem(product.id)}} text='usuń'/>
                        </div>
                    ))}
                </div> :
                <div>
                    <h1>Koszyk jest pusty :c</h1>
                </div>
            }
        </>
    )
}

export default Cart;