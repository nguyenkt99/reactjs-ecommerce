import React, { Component } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { get, post } from '../httpHelper';
import { withRouter } from 'react-router-dom';


class Checkout extends Component {
    static contextType = CartContext;

    state = {
        name: '',
        phone: '',
        address: ''
    }

    componentDidMount() {
        this.fetchUserDetail();
    }

    fetchUserDetail() {
        get(`/userDetails/${JSON.parse(localStorage.getItem('user')).id}`)
            .then((res) => {
                this.setState({
                    name: res.data.name,
                    phone: res.data.phone,
                    address: res.data.address
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange(e, key) {
        this.setState({ [key]: e.target.value })
    }

    renderItems(cart) {
        return Object.keys(cart).map((key, index) => {
            return (
                <tr key={index}>
                    <td>{key}</td>
                    <td><img width="40px" src={cart[key].product.images[0].url} alt="pic img[0]" /> {cart[key].product.name}</td>
                    <td>{new Intl.NumberFormat().format(cart[key].product.price)} (VNĐ)</td>
                    <td>{cart[key].quantity} ({cart[key].product.unit})</td>
                    <td style={{ fontStyle: "-moz-initial" }}>{new Intl.NumberFormat().format(cart[key].product.price * cart[key].quantity)} (VNĐ)</td>
                </tr>
            )
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const cart = this.context.cart;
        const result = Object.keys(cart).map((key, index) => {
            const orderDetail = {
                product: {
                    id: key
                },
                quantity: cart[key].quantity
            };
            return orderDetail;
        });
        const formData = {
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            userId: JSON.parse(localStorage.getItem('user')).id,
            orderDetails: result
        }

        console.log(formData);

        post('/orders', formData)
            .then((res) => {
                this.props.history.push({
                    pathname: '/thankyou',
                    state: {
                        orderId: res.data.id
                    }
                });
                this.context.clearCart();
                localStorage.removeItem('cart');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3 style={{ color: "#ee4d2d" }}>Thanh toán</h3>
                <hr></hr>
                <h5 style={{ color: "#ee4d2d" }}><FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ nhận hàng</h5>
                <Col className="p-3" xs="6">
                    <Form id="checkoutForm" onSubmit={(e) => this.handleSubmit(e)} >
                        <Row className="mb-3">
                            <Form.Group className="mt-3" as={Col} controlId="name">
                                <Form.Control type="text" required placeholder="Nhập họ tên"
                                    value={this.state.name}
                                    onChange={(e) => this.handleChange(e, 'name')}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3" as={Col} controlId="phone">
                                <Form.Control type="text" required placeholder="Nhập số điện thoại"
                                    value={this.state.phone}
                                    onChange={(e) => this.handleChange(e, 'phone')}
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mt-3" as={Col} controlId="address">
                            <Form.Control type="text" required placeholder="Nhập địa chỉ"
                                value={this.state.address}
                                onChange={(e) => this.handleChange(e, 'address')}
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Container className="mt-5">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Số tiền</th>
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
                        <p style={{ fontSize: "20px", fontStyle: "italic" }}>Phí vận chuyển: Miễn phí</p>
                        <CartContext.Consumer>
                            {({ cart }) =>
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    Tổng thanh toán: {new Intl.NumberFormat().format(Object.keys(cart).reduce((acc, key) =>
                                        acc + cart[key].quantity * cart[key].product.price, 0))} (VNĐ)
                                </p>
                            }
                        </CartContext.Consumer>
                        <Button className="btn btn-danger float-end" type="submit" form="checkoutForm">Đặt hàng</Button>
                    </div>
                </Container>
            </div>
        )
    }
}
export default withRouter(Checkout)