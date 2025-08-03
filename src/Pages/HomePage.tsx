import React, { useEffect, useState } from 'react';
import { useTheme } from '../Contexts/ThemeContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const pageClasses = {
    theme1: 'bg-theme1-bg text-theme1-text font-sans-theme1 min-h-screen p-8 pt-20 md:pt-8', 
    theme2: 'bg-theme2-bg text-theme2-text font-serif-theme2 min-h-screen flex flex-col md:flex-row pt-16',
    theme3: 'bg-theme3-bg text-theme3-text font-google-theme3 min-h-screen p-8 pt-20 md:pt-8', 
  };

  const contentClasses = {
    theme1: 'max-w-4xl mx-auto space-y-6',
    theme2: `flex-1 p-4 md:p-8 ${isSidebarOpen ? 'ml-[250px] md:ml-0' : 'md:ml-[250px]'}`, 
    theme3: 'max-w-6xl mx-auto space-y-8',
  };

  const buttonClasses = {
    theme1: 'bg-theme1-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300',
    theme2: 'bg-theme2-primary text-theme2-text py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300',
    theme3: 'bg-theme3-primary text-white py-2 px-4 rounded-full hover:bg-pink-700 transition-colors duration-300',
  };

  const cardClasses = {
    theme1: 'bg-white shadow-md rounded-lg p-4 transition-all duration-300',
    theme2: 'bg-gray-800 shadow-lg rounded-lg p-6 text-theme2-text border border-gray-700 transition-all duration-300',
    theme3: 'bg-theme3-card-bg shadow-xl rounded-2xl p-6 text-theme3-text transform hover:scale-105 transition-all duration-300',
  };

  return (
    <div className={`transition-all duration-500 ${pageClasses[theme]}`}>
      {theme === 'theme2' && (
        <>
          <button
            className="md:hidden fixed top-20 left-4 z-40 bg-gray-700 text-white p-2 rounded-full shadow-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
          <aside
            className={`fixed md:static top-16 md:top-auto left-0 w-[250px] h-[calc(100vh-64px)] bg-gray-900 text-white p-4 shadow-xl transition-all duration-300 z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`} 
          >
            <h3 className="text-xl font-bold mb-4">Sidebar</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="block hover:text-blue-400" onClick={() => setIsSidebarOpen(false)}>Sidebar Link 1</Link></li>
              <li><Link to="#" className="block hover:text-blue-400" onClick={() => setIsSidebarOpen(false)}>Sidebar Link 2</Link></li>
              <li><Link to="#" className="block hover:text-blue-400" onClick={() => setIsSidebarOpen(false)}>Sidebar Link 3</Link></li>
            </ul>
          </aside>
        </>
      )}

      <div className={`${contentClasses[theme]} transition-all duration-300 pt-8`}>
        <h1 className={`text-4xl font-bold mb-4 ${theme === 'theme3' ? 'text-center' : ''}`}>
          Welcome to Our Multi-Theme App
        </h1>
        <p className="mb-6 leading-relaxed text-lg">
          This is a dummy paragraph demonstrating how the text content adapts to different themes. The font, spacing, and overall layout will change based on your selection from the header dropdown. We aim to show distinct visual experiences for each theme.
        </p>
        <button className={buttonClasses[theme]}>
          Click Me!
        </button>

        <h2 className={`text-3xl font-semibold mt-10 mb-6 ${theme === 'theme3' ? 'text-center' : ''}`}>
          Sample Products
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <div className={`grid gap-6 ${theme === 'theme3' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {products.map((product) => (
              <div key={product.id} className={cardClasses[theme]}>
                <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4 rounded-md" />
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm line-clamp-3">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;