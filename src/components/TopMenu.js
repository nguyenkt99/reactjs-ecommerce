import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { get } from '../httpHelper';
import { CartContext } from '../contexts/CartContext'

class TopMenu extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        get('/categories')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({ categories: response.data })
                }
            });
    }

    render() {
        let buttons;
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            buttons = (
                <NavDropdown title={user.username}>
                    <NavDropdown.Item href="/edit-profile">
                        Sửa thông tin
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/orders">
                        Đơn hàng
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        onClick={() => this.props.onLogoutSuccess()}
                    >
                        Đăng xuất
                    </NavDropdown.Item>
                </NavDropdown>
            )
        } else {
            buttons = (
                <Link to="/login">
                    <Button variant="outline-primary">
                        Đăng nhập
                    </Button>
                </Link>
            )
        }

        return (
            <Navbar bg="light" variant="light" expand="lg" sticky="top">
                <Link className="navbar-brand nav-link" to="/">
                    <img
                        src="/logo.png"
                        width="150px"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav style={{ fontWeight: "700" }}>
                        <Link className="nav-link" to="/">TRANG CHỦ</Link>
                        <NavDropdown title="THƯƠNG HIỆU">
                            {
                                this.state.categories.map((category) => (
                                    <NavDropdown.Item
                                        key={category.id}
                                        href={`/product-categories/${category.id}`}>
                                        {category.description}
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-right">
                    <Form className="d-flex" >
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-info">Tìm</Button>
                    </Form>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {buttons}
                    </Nav>
                    <Nav>
                        <CartContext.Consumer>
                            {({ cart }) => (
                                <Link className="px-3" to="/cart"><FontAwesomeIcon icon={faShoppingCart} />{Object.keys(cart).reduce((acc, key) => acc + cart[key].quantity, 0)}</Link>
                            )}
                        </CartContext.Consumer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default withRouter(TopMenu)