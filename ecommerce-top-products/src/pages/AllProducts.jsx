

import  { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

const initialFilters = {
  company: 'AMZ',
  category: 'Laptop',
  minPrice: 1,
  maxPrice: 10000,
  topN: 10,
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);

// const products = [

//     {
    
//     "productName": "Laptop 1",
    
//     "price": 2236,
    
//     "rating": 4.7,
    
//     "discount": 63,
    
//     "availability": "yes"
    
//     },{
    
//     "productName": "Laptop 13",
    
//     "price": 1244,
    
//     "rating": 4.5,
    
//     "discount": 45,
    
//     "availability": "out-of-stock"},{
    
//     "productName": "Laptop 3",
    
//     "price": 9102,
    
//     "rating": 4.44,
    
//     "discount": 98,
    
//     "availability": "out-of-stock"},{
    
//     "productName": "Laptop 11",
    
//     "price": 2652,
    
//     "rating": 4.12,
    
//     "discount": 70,
    
//     "availability": "yes"}];
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (error) {
        setError('Error loading products. Please try again.');
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8">Top Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="md:w-3/4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && <ProductList products={products} />}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;