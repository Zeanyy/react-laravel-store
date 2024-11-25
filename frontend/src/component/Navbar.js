import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return(
        <>
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/products"}>Products</Link></li>
                    <li><Link to={"/cart"}>Cart</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar