import { useLoaderData } from "react-router-dom";
import ProductImage from "../component/ProductImage";
import Button from "../component/Button";


function Product() {
    const product = useLoaderData()[0]

    return (
        <>
            <div className="container">
                <div className="product">
                    <ProductImage productImagePath={product.image_url} />
                    <h1>{product.price} pln</h1>
                    <h2>{product.name}</h2>
                    <h5>{product.description}</h5>
                    {
                    (product.stock > 0) ? 
                    <div>
                        <Button handleEventName="addToCart" id={product.id}  text='Dodaj do koszyka'/>
                        <Button handleEventName="buyNow" id={product.id} text='Kup teraz!'/>
                    </div> :
                    <div>
                        Out Of Stock
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Product;