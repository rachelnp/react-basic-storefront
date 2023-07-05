import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductHomeList from './ProductHomeList';
import ProductForm from './ProductForm.js';
import AllProducts from './AllProducts.js'
import Product from './Product.js';
import Home from './Home';
import AboutUs from './AboutUs.js';
import Search from './Search.js';
import Footer from './Footer';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<ProductHomeList />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/edit/:productId" element={<ProductForm />} /> 
          <Route path="add" element={<ProductForm />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/search/:filter" element={<Search />} />
          <Route path="*" element={<h1>Product Not Found</h1>} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer/>
    </BrowserRouter>

  );
}

export default App;
