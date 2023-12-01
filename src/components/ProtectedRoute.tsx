import { Outlet, Navigate } from 'react-router-dom';
import useSessionStore from '../store/useSessionStore';

const ProtectedRoute = () => {
  const { isLoggedin } = useSessionStore();

  return isLoggedin() ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
