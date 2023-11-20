import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useCartStore from '../../store/useCartStore';
import useLogStore from '../../store/useLogStore';

function Navbar() {
  const { userCart } = useCartStore();
  const { isLoggedin } = useLogStore();

  const itemsInCart = userCart ? Object.keys(userCart?.products).length : 0;

  return (
    <div>
      <nav className="bg-white border-gray-200 shadow-xl dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold  whitespace-nowrap dark:text-white">
            E-Commerce
          </span>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 pl-3 pr-4 text-white  font-semibold  rounded md:bg-transparent md:p-0  hover:text-blue-700 "
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/acc"
                  className="block py-2 pl-3 pr-4 text-white  font-semibold rounded md:bg-transparent md:p-0  hover:text-blue-700"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className='className="block py-2 pl-3 pr-4 text-white  font-semibold rounded md:bg-transparent md:p-0  hover:text-blue-700'
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> {itemsInCart}
                </a>
              </li>
              {!isLoggedin && (
                <li>
                  <a
                    href="/login"
                    className="block py-2 pl-3 pr-4 text-white font-semibold rounded md:bg-transparent md:p-0 hover:text-blue-700"
                  >
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
