

import ProductCard from './ProductCard';
import { generateUniqueId } from '../utils/helper';



const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={generateUniqueId(product)} product={product} />
      ))}
    </div>
  );
};

export default ProductList;