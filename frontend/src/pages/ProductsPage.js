import { Link, useLoaderData, useLocation } from "react-router-dom";
import ProductImage from "../component/ProductImage";

const pages = (currentPage, lastPage) => {
  if (lastPage === 1) {
    return [1]
  }

  if (currentPage === 1) {
    if (lastPage === 2) {
      return [1, 2]
    } else {
      return [1, 2, 3]
    }
  }

  if (currentPage === lastPage) {
    if (lastPage === 2) {
      return [1, 2]
    } else {
      return [lastPage - 2, lastPage - 1, lastPage]
    }
  }

  return [currentPage - 1, currentPage, currentPage + 1]
}

const handleClick = (e, isDisabled) => {
  if (isDisabled) {
    e.preventDefault()
  }
}

function Products() {
  const response = useLoaderData()
  const location = useLocation()

  const addPageToUrl = (page) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', page)
    return `${location.pathname}?${searchParams.toString()}`
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {response.data.map((product) => (
            <Link to={`/products/${product.id}`} className="group" key={product.id}>
              <ProductImage productImagePath={`${product.image_url}`} className="w-72 h-72 rounded-lg mr-6" />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-lg mx-auto mt-10">
        <div className="flex justify-center items-center space-x-4">
          {/* Przycisk "Poprzednia" */}
          <Link
            to={addPageToUrl(response.current_page - 1)}
            className={`text-gray-600 cursor-pointer hover:text-blue-600 ${response.current_page === 1 ? 'disabled:opacity-50 cursor-not-allowed' : ''
              }`}
            aria-disabled={response.current_page === 1}
            onClick={(e) => handleClick(e, response.current_page === 1)}
          >
            Poprzednia
          </Link>

          {/* Numery stron */}
          {pages(response.current_page, response.last_page).map((page) => (
            <Link to={addPageToUrl(page)} key={page}>
              <span
                className={`cursor-pointer hover:text-blue-600 ${page === response.current_page ? 'text-blue-600' : 'text-gray-600'
                  }`}
              >
                {page}
              </span>
            </Link>
          ))}

          {/* Przycisk "Następna" */}
          <Link
            to={addPageToUrl(response.current_page + 1)}
            className={`text-gray-600 cursor-pointer hover:text-blue-600 ${response.current_page === response.last_page ? 'disabled:opacity-50 cursor-not-allowed' : ''
              }`}
            aria-disabled={response.current_page === response.last_page}
            onClick={(e) => handleClick(e, response.current_page === response.last_page)}
          >
            Następna
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Products;