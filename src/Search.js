import React, { useState, useEffect, useContext } from 'react'
import { Stack, Card, Button } from 'react-bootstrap/'
import { Link, useParams,useNavigate  } from 'react-router-dom'
import { ProductContext } from './ProductContext'

const Search = () => {
  const [products, setProducts] = useState([]);
  let params = useParams();
  let navigate = useNavigate()

  let { filter } = useContext(ProductContext);

  let { getProduct, deleteProduct } = useContext(ProductContext)
  let [product, setProduct] = useState()
  let [error, setError] = useState()

  useEffect(() => {
    async function fetch() {
      await filter(params.filter).then(response => {
        setProducts(response)
      })
    }
    fetch();
    console.log(params.filter)

  }, [params.filter])

  function handleDeleteProduct(id) {
    deleteProduct(id)
    navigate('/products')
  }

  function productList() {
    if (products === null) return //
    return products.map((product) => (
      <Card style={{ width: '18rem' }} key={product.id} className='col-6 .col-md-4 card text-white justify-content-center'>
        <Card.Img variant="top" src={product.imageURL} className="img" />
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
    ))
  }

  return (
    <>
      <h1> Welcome to Fig & Fern </h1>
      <Stack direction="horizontal" gap={3}>
        <div className='search-card-group' >
          {productList()}
        </div>
      </Stack>
    </>
  )
}

export default Search;

