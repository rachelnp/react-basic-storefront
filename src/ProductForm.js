import { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from './ProductContext'

function ProductForm() {
    let params = useParams()
    let [product, setProduct] = useState({
        id: params.productId,
        itemName: "",
        description: "",
        price: "",
        size:"",
        imageURL:""
    })

    let { getProduct, addProduct, updateProduct } = useContext(ProductContext)
    let navigate = useNavigate()
    let { id, itemName, description, price, size, imageURL } = product

    useEffect(() => {
        if (id === undefined) return
        async function fetch() {
            await getProduct(id)
                .then((product) => setProduct(product))
        }
        fetch()
    }, [params.productId])

    function handleChange(event) {
        setProduct((preValue) => {
            return { ...preValue, [event.target.name]: event.target.value }
        })
    }

    function addOrUpdate() {
        if (id === undefined) {
            return addProduct(product)
        } else {
            return updateProduct(product)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        addOrUpdate().then((product) =>
            navigate(`/products`)
        )
    }

    return (
        <div>
        <h1 className='h1-add'>Add New Product Information</h1>
        <p className='product-p'>When signed in as a shop owner, input new products here.</p>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" name="itemName" value={itemName} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="price" value={price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Size</Form.Label>
                <Form.Control type="text" name="size" value={size} onChange={handleChange} />
            </Form.Group> <Form.Group className="mb-3" >
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="imageURL" value={imageURL} onChange={handleChange} />
            </Form.Group>
            <Button className="btn btn-outline-info save-button" type="submit">Save</Button>
        </Form>
        </div>
        
    )
}


export default ProductForm