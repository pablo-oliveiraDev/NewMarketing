import React, { useContext } from 'react';
import { Navbar, Container, Nav,  NavbarBrand } from 'react-bootstrap';
import './header.css';
import { AiOutlineUser } from 'react-icons/ai';
import {GiPoliceOfficerHead} from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Auth';




export default function Header() {
  const{signed,superSigned}=useContext(AuthContext);

    return (

        <Navbar bg="dark" variant="dark" expand="lg" >
            <Container className='navBody'>
                <Navbar.Brand ><Link to='/' className='titulo'>New Marketing </Link></Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navItem">
                        <Link className='navItems' to='/' >Home</Link>
                        <Link className='navItems' to="/loginUser">Login</Link>
                        <Link className='navItems' to="/CadUser">Cadastrar</Link>
                        {superSigned && (
                            <Link className='navItems' to="/novoProduto">Novos Produtos</Link>                            
                        )}
                        {superSigned && (
                            <Link className='navItems' to="/status">Status</Link>
                        )}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                 
                </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                <NavbarBrand> {superSigned?< GiPoliceOfficerHead size={25} color='#FFD700' /> :< AiOutlineUser size={25} color='#fff' /> }{signed ? <span className='on'>ON</span> : <span className={superSigned?'on':'off'}>{superSigned?'ON':'OFF'}</span>}</NavbarBrand>
                {/* <NavbarBrand>{signed ? <button onClick={signOut}>logout</button> : ''}</NavbarBrand> */}
            </Container>
        </Navbar>

    )
}
