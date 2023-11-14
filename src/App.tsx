import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import ProductList from './components/product/ProductList';
import ProtectedRoute from './components/ProtectedRoute';
import CartList from './components/cart/CartList';
import Account from './components/Account';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <main className="grid justify-items-center">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ProductList />} />
              <Route path="/acc" element={<Account />} />
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
