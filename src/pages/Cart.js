import React, { Component } from 'react';
import { Button, Container, FormControl, InputGroup, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default class Cart extends Component {
    renderItems(cart) {
        return Object.keys(cart).map((key, index) => {
            return (
                <tr key={index}>
                    <td>{key}</td>
                    <td>
                        <Link
                            style={{ textDecoration: "inherit", color: "black", fontSize: "16px", fontWeight: "bold" }}
                            to={`products/${key}`}>
                            <img width="60px" src={cart[key].product.images[0].url} alt="pic img[0]" /> {cart[key].product.name}
                        </Link>
                    </td>
                    <td>{new Intl.NumberFormat().format(cart[key].product.price)} (VNĐ)</td>
                    <td>
                        <InputGroup className="mb-3">
                            <CartContext.Consumer>
                                {({ handleMinus }) => <Button variant="outline-secondary" onClick={() => handleMinus(key)}>-</Button>}
                            </CartContext.Consumer>
                            <FormControl className="text-center" style={{ maxWidth: 60 }} readOnly={true} value={cart[key].quantity} />
                            <CartContext.Consumer>
                                {({ handlePlus }) => <Button variant="outline-secondary" onClick={() => handlePlus(key)}>+</Button>}
                            </CartContext.Consumer>
                        </InputGroup>
                    </td>
                    <td style={{ fontStyle: "-moz-initial" }}>{new Intl.NumberFormat().format(cart[key].product.price * cart[key].quantity)} (VNĐ)</td>
                    <td>
                        <CartContext.Consumer>
                            {({ removeItem }) => <Button variant="danger" onClick={() => removeItem(key)}><FontAwesomeIcon icon={faTrash} /></Button>}
                        </CartContext.Consumer>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3 style={{ color: "#ee4d2d" }}>Giỏ hàng</h3>
                <hr></hr>
                <Container>
                    <Table bordered={false} striped={false} borderless hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Số tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <CartContext.Consumer>
                                {({ cart }) => {
                                    return this.renderItems(cart)
                                }}
                            </CartContext.Consumer>
                        </tbody>
                    </Table>
                    <div className="float-end">
                        <CartContext.Consumer>
                            {({ cart }) =>
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    Tổng số tiền: {new Intl.NumberFormat().format(Object.keys(cart).reduce((acc, key) =>
                                        acc + cart[key].quantity * cart[key].product.price, 0))} (VNĐ)
                                </p>
                            }
                        </CartContext.Consumer>
                        <Link className="btn btn-danger float-end" to="/checkout">Mua hàng</Link>
                    </div>
                </Container>
            </div>
        )
    }
}
