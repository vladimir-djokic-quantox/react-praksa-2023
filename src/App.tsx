import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import Navbar from './components/layout/Navbar';
import ProductList from './components/product/ProductList';
import ProtectedRoute from './components/ProtectedRoute';
import CartList from './components/cart/CartList';
import Account from './components/Account';
import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <main className="grid justify-items-center">
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/search/:query" element={<ProductList />} />
            <Route path="/products/details/:id" element={<ProductDetails />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<CartList />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
