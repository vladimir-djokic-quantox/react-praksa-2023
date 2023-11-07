import { Outlet, Navigate } from 'react-router-dom';
import useLogStore from '../store/useLogStore';

const ProtectedRoute = () => {
  const { isLoggedin } = useLogStore();

  return isLoggedin ? <Outlet /> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
