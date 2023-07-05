import React from 'react'
import { Card, Alert, Stack } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { ProductContext } from './ProductContext'
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import './Styles.css'


function AllProducts() {
    let params = useParams()
    let navigate = useNavigate()
  
    let { getProduct, deleteProduct } = useContext(ProductContext)
    let [product, setProduct] = useState()
    let [error, setError] = useState()

    useEffect(() => {
        setError(null)
        async function fetch() {
            await getProduct(params.productId)
                .then((product) => setProduct(product))
                .catch((message) => setError(message))
        }
        fetch()
    }, [params.productId, getProduct])

    function errorMessage() {
        return <Alert variant="danger">There was an error attempting to load this product: {error}</Alert>
    }
  
    function handleDeleteProduct(id) {
        deleteProduct(id)
        navigate('/products')
      }


    function allProducts(products) {
        if (products === null) return
        return products.map((product) =>
                <Card style={{ width: '18rem' }}  key={product.id} className='col-md-4 card text-white justify-content-center'>
                    <Card.Img variant="top" src={product.imageURL} className="img"/>
                    <Card.Body className='bg-dark indiv'>
                        <Card.Title className="mbsc-card-title"> {product.itemName}</Card.Title>
                        <Card.Text>{product.description}
                            <br></br> <strong>Price: ${product.price}</strong>
                            <br></br> <strong>Size: {product.size}</strong>
                        </Card.Text>
                        <Link className='btn btn-outline-light' to={`/products/${product.id}`}>View</Link>{' '}
                        <Link className='btn btn-outline-info' to={`/edit/${product.id}`}>Edit</Link>{' '}
                        <Button className='btn btn-outline-info' onClick={handleDeleteProduct.bind(this, product.id)}>Delete</Button>{' '}
                    </Card.Body>
                </Card> 
        )
    }

    return (
        <>
        <h1 className='product-h1'>Products</h1>
        <p className='product-p'>Arrangements vary by seasonal availability. For inquiry on specific flowers, please call 1(800)FIG-FERN</p>
            <Stack direction="horizontal" gap={3} >
                <div className="container">
                <div className="row">
                    <ProductContext.Consumer>
                        {({ products }) => (
                            allProducts(products)
                        )}
                    </ProductContext.Consumer>
                </div>
                </div>
                <Outlet />
            </Stack>
        </>
    )
}

export default AllProducts;

