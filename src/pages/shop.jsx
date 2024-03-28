import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/products");
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category.id === parseInt(selectedCategory))
    : products;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Welcome to Our Shop</h1>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
          View Cart ({cart.length})
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="border border-gray-200 rounded p-4 shadow-md shop-container">
            <Link href={`/${product.id}`}>
              <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover mb-4" />
            </Link>
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-sm mb-4">{product.description}</p>
            <div className="flex justify-between">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <p className="text-gray-500 p-2">{product.category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
