import { useAuth } from '../context/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <nav className="bg-neutral-950 text-white p-4" onMouseLeave={() => { setDropDown(false) }}>
        {/* Logo */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <Link to="/">
              <h1>store</h1>
            </Link>
          </div>
          {/* Searchbar */}
          <div className="relative ml-auto w-1/2 md:w-1/3 lg:w-1/4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="search-navbar" className="w-full rounded-lg border p-2 pl-10 text-sm text-gray-900 focus:border-blue-500" placeholder="Search..." />
          </div>
          {/* Other */}
          <div className="flex ml-auto">
            <ul className="flex space-x-6">
              <li className="relative">
                <button
                  className="hover:text-green-300 flex items-center" onMouseEnter={() => { setDropDown(true) }}>
                  Kategoria
                  <svg className="ms-2.5 h-2.5 w-2.5" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                {dropDown && (
                  <div className="absolute top-full left-0 mt-2 bg-neutral-950 w-48 text-left z-10" onMouseLeave={() => { setDropDown(false) }}>
                    <ul>
                      <li className="hover:bg-neutral-800">
                        <Link to="products/category/1" className="block px-4 py-2 text-white hover:text-green-300">Elektronika</Link>
                      </li>
                      <li className="hover:bg-neutral-800">
                        <Link to="products/category/2" className="block px-4 py-2 text-white hover:text-green-300">Moda</Link>
                      </li>
                      <li className="hover:bg-neutral-800">
                        <Link to="products/category/3" className="block px-4 py-2 text-white hover:text-green-300">Biżuteria i ogród</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="hover:text-green-300">
                <Link to="/cart">Koszyk</Link>
              </li>
              {!isAuthenticated ? (
                <li className="hover:text-green-300">
                  <Link to="/signin">Logowanie</Link>
                </li>
              ) : (
                <li className="hover:text-green-300">
                  <Link to="/signout">Wyloguj</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
