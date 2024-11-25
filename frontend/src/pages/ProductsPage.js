import { Link, useLoaderData } from "react-router-dom";

function Products() {
    const products = useLoaderData()
    
    return (
        <>
            <ul>
                {products.map((product, id) => (
                    <li key={id}><Link to={`/products/${product.id}`}>{product.name}</Link></li>
                ))}
            </ul>
        </>
    )
}

export default Products;