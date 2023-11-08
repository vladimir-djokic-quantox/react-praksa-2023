import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
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
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 font-semibold rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className=' className="block py-2 pl-3 pr-4 text-white bg-blue-700 font-semibold rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"'
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
