import React, { createContext, useState, useEffect } from "react"
import axios from "axios"


export const ProductContext = createContext()

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([])
    const myUrl = "http://localhost:3003/products"

    useEffect(() => {
        async function getProducts() {
            await refreshProducts()
        }
        getProducts()
    }, []);

    const BaseUrl = "http://localhost:3003/products"
  
    function refreshProducts() {
        return axios.get("http://localhost:3003/products")
            .then(response => {
                setProducts(response.data)
            })
    }

    function getProduct(id) {
        return axios.get(`http://localhost:3003/products/${id}`)
            .then(response =>
                new Promise((resolve) => resolve(response.data))
            )
            .catch((error) =>
                new Promise((_, reject) => reject(error.response.statusText))
            )
    }

    function deleteProduct(id) {
        axios.delete(`http://localhost:3003/products/${id}`)
          .then(refreshProducts)
      }

    function addProduct(products) {
        return axios.post("http://localhost:3003/products", products)
            .then(response => {
                refreshProducts()
                return new Promise((resolve) => resolve(response.data))
            })
    }

    function updateProduct(products) {
        return axios.put(`http://localhost:3003/products/${products.id}`, products)
        .then(response => {
            refreshProducts()
          return new Promise((resolve) => resolve(response.data))
        })
      }

      function filter(param) { 
        return axios.get(`${myUrl}/?q=${param}`).then(response => {
          return new Promise((resolve) => resolve(response.data))
        })
      }

      return (
        <ProductContext.Provider
          value={{
            products,
            getProduct,
            deleteProduct,
            addProduct,
            updateProduct,
            filter,
          }}
        >
          {props.children}
        </ProductContext.Provider>
      )


}