import { useAuth } from '../context/AuthContext';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {!isAuthenticated ? 
            <li><Link to="/signin">Logowanie</Link></li> : 
            <li><Link to="/signout">Wyloguj</Link></li>
          }
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
