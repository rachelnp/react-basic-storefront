import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from './ProductContext'
import { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";


function Product(props) {

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
    function loading() {
        return <div className="w-25 text-center"><Spinner animation="border" /></div>
    }

    function productCard() {
        let { id, itemName, description, price, size, imageURL } = product
        return (
            <div>
                <h1>{itemName}</h1>
                <div>
                    <Card >
                        <Card.Body>
                            <Card.Img variant="top" src={imageURL} className='product_img' />
                            <Card.Title><h2>{itemName}</h2></Card.Title>
                            <Card.Subtitle className="mb-2 text-muted"><p>{description}</p></Card.Subtitle>
                            <Card.Text>
                                <strong>Price:</strong> <span>{price}</span>
                                <br></br>
                                <strong>Size:</strong> <span>{size}</span>
                            </Card.Text>
                            <Link to={`/edit/${id}`} className="btn btn-primary mx-3">Edit</Link>
                            <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
    if (error) return errorMessage()
    if (product === undefined) return loading()
    return product.id !== parseInt(params.productId) ? loading() : productCard()

}

export default Product