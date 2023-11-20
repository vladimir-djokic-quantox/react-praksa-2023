import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
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
            <Route path="/" element={<ProductList />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/acc" element={<Account />} />
              <Route path="/cart" element={<CartList />} />
              <Route path="/details/:id" element={<ProductDetails />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
