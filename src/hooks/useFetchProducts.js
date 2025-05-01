import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export default function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let isMounted = true; // cleanup için

    axios.get(API_URL)
      .then(res => {
        if (isMounted) {
          setProducts(res.data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
