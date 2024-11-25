import { useLoaderData } from "react-router-dom";

function Product() {
    const product = useLoaderData()[0];
    
    return (
        <>
            <h1>{product.name}</h1>
        </>
    )
}

export default Product;