

import { Link } from 'react-router-dom';
import { generateUniqueId } from '../utils/helper';



const ProductCard = ({ product }) => {
  const uniqueId = generateUniqueId(product);

  return (
    <Link to={`/product/${uniqueId}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={"https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
      <div className="mt-1 flex items-center">
        <span className="text-yellow-400">{'\u2605'.repeat(Math.round(product.rating))}</span>
        <span className="ml-1 text-sm text-gray-500">({product.rating.toFixed(1)})</span>
      </div>
      <p className="mt-1 text-sm text-green-600">{product.availability ? 'In Stock' : 'Out of Stock'}</p>
    </Link>
  );
};

export default ProductCard;