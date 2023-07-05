import React from 'react'
import { Card, Stack, Button } from 'react-bootstrap'
import { Outlet, Link } from 'react-router-dom'
import { ProductContext } from './ProductContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import './Styles.css'



function ProductList(props) {
  let params = useParams()
  let navigate = useNavigate()
  let { getProduct, deleteProduct } = useContext(ProductContext)

  let [product, setProduct] = useState()
  let [error, setError] = useState()

  function handleDeleteProduct(id) {
    deleteProduct(id)
    navigate('/products')
  }

  function productList(products) {
    if (products === null) return
    return products.slice(0, 3).map((product) =>
        <Card style={{ width: '18rem' }}  key={product.id} className='col-md-3 card text-white'>
          <Card.Img variant="top" src={product.imageURL} className="img"/>
          <Card.Body  className='bg-dark indiv'>
            <Card.Title className='mbsc-card-title'> {product.itemName}</Card.Title>
            <Card.Text>{product.description}
              <br></br> <strong>Price: ${product.price}</strong>
            </Card.Text>
            <Link className='btn btn-outline-light' to={`/products/${product.id}`} key={product.id}>View</Link>{' '}
            <Link className='btn btn-outline-info' to={`/edit/${product.id}`} key={product.id}>Edit</Link>{' '}
            <Button className='btn btn-outline-info' onClick={handleDeleteProduct.bind(this, product.id)}>Delete</Button>{' '}
          </Card.Body>
        </Card>
    )
  }

  return (
    <>
      <h1 className='home-h1'>Welcome to Fig & Fern</h1>
      {/* <img className='homepage_img' src='https://i.pinimg.com/originals/90/1e/70/901e7048b0b47f6bb719b7451d7b7f65.jpg' alt='flowers'></img> */}
      <p className='home_paragraph'>At Fig & Fern, our heart is to design floral arrangements to add an extra dose of life to any space, place, or occasion! There's no wrong time to buy flowers. 
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
       pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu 
       pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
        viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas
         tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec
      . Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>

      <p className='home_paragraph'>Check out our story and fall in love with flowers all over again, like we did.</p>

      <Stack direction="horizontal" gap={3}>
        <div className="container" >
        <div className="row">
          <ProductContext.Consumer>
            {({ products }) => (
              productList(products)
            )}
          </ProductContext.Consumer>
        </div>
        </div>
        <Outlet />
      </Stack>
    </>
  )
}

export default ProductList;

