import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col items-center h-screen ">
        <main>
          <Routes>
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<ProductList />} />
            {/* </Route> */}
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
