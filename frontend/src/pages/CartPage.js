import { useLoaderData } from "react-router-dom";

function Cart() {
    
    const products = useLoaderData()
    console.log(products)

    return (
        <>
            <h1>Cart</h1>
        </>
    )
}

export default Cart;