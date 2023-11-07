import useFetchStore from '../store/useFetchStore';
import { useEffect } from 'react';

function useFetchData() {
  const { fetchProducts, fetchUsers } = useFetchStore();

  useEffect(() => {
    fetchProducts(1);
    fetchUsers();
  }, [fetchProducts, fetchUsers]);
}

export default useFetchData;
