import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import SingleProduct from './pages/SingleProductPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-indigo-600">Top Products</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;