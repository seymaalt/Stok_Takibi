import React from 'react'
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navi(props) {
  return (
    <Navbar bg="dark" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav>
   
    <NavLink className="d-inline p-2 bg-dark text-white h4" to="/Category">
        Kategori
    </NavLink>
    <NavLink className="d-inline p-2 bg-dark text-white h4" to="/Products">
        Ürünler
    </NavLink>

    </Nav>
    </Navbar.Collapse>
</Navbar>
  )
}

export default Navi