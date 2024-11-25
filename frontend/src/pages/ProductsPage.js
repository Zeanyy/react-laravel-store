import { Link, useLoaderData } from "react-router-dom";
import ProductImage from "../component/ProductImage";
import Button from "../component/ActionButton";

const handleBuyNow = (id) => {
    alert(`kupiono ${id}`)
}

const handleAddToCart = (id) => {
    alert(`dodano ${id} do koszyka`)
}

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
                        <Button handleEvent={() => {handleAddToCart(product.id)}} text='Dodaj do koszyka'/>
                        <Button handleEvent={() => {handleBuyNow(product.id)}} text='Kup teraz!'/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products;