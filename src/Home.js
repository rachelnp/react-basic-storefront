import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import { Link, Outlet, useNavigate } from "react-router-dom"


function Home() {
    let navigate = useNavigate()

    function handleChange(event) {
        if (event.target.value === "") return; 
        navigate("/search/" + event.target.value)
    }


    return (
        <>
            <Navbar bg="dark"  className='nav-container'>
                <Navbar bg="dark" variant="dark">
                    <Container >
                        <Navbar.Brand href="#home" >
                            <img
                                src="https://i.pinimg.com/originals/90/1e/70/901e7048b0b47f6bb719b7451d7b7f65.jpg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt=" "
                            />
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About Us</Link>
                            <Link to="/products" className="nav-link">View All</Link>
                            <Link to="/products/add" className="nav-link">Create</Link>
                        </Nav>
                    </Container>
                    <input placeholder="Search" onChange={handleChange} className='search-bar'/>
                </Navbar>
            </Navbar>
            <Stack gap={3} className="col-md-10 mx-auto mt-3">
                <Outlet />
            </Stack>

        </>


    )
}

export default Home