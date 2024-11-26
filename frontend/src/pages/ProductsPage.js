import { Link, useLoaderData } from "react-router-dom";
import ProductImage from "../component/ProductImage";
import Button from "../component/Button";

function Products() {
    const products = useLoaderData()

    return (
        <>
            <div className="container">
                {products.map((product) => (
                    <div className="product" key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <ProductImage productImagePath={product.image_url} />
                            <h1>{product.price} pln</h1>
                            <h2>{product.name}</h2>
                        </Link>
                        <Button handleEvent="addToCart" id={product.id} text='Dodaj do koszyka'/>
                        <Button handleEvent="buyNow" id={product.id} text='Kup teraz!'/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products;