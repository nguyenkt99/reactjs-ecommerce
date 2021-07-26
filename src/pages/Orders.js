import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { get, put } from '../httpHelper';

export default class Orders extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders() {
        get(`/users/${this.props.userId}/orders`)
            .then((res) => {
                this.setState({ orders: res.data.sort((a, b) => b.id - a.id) });
            });
    }

    onCancelOrder(orderId) {
        put(`/users/${this.props.userId}/orders/${orderId}`)
            .then((res) => {
                this.setState({ orders: this.state.orders.map((order) => order.id === orderId ? res.data : order) })
            })
    }

    render() {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        }

        return (
            <div style={{ padding: "30px" }}>
                <h3 style={{ color: "#ee4d2d" }}>Các đơn hàng</h3>
                <hr></hr>
                <Container>
                    {this.state.orders.map((order) => {
                        return (
                            <div key={order.id}>
                                <Row>
                                    <Row>
                                        <Col>
                                            <Link style={{ textDecoration: "inherit" }} to={`/orders/${order.id}`}>
                                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>Đơn hàng #{order.id}</p>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <p style={{ fontSize: "20px", fontStyle: "italic" }}>{new Date(order.createdDate).toLocaleDateString('en-US', options)}</p>
                                        </Col>
                                        <Col>
                                            {
                                                order.status === 'UNCONFIRMED' ?
                                                    <span className="badge bg-danger float-end">
                                                        Chưa xác nhận
                                                    </span>
                                                    :
                                                    order.status === 'CONFIRMED' ?
                                                        <span className="badge bg-success float-end">
                                                            Đã xác nhận
                                                        </span>
                                                        :
                                                        <span className="badge bg-warning float-end">
                                                            Đã hủy
                                                        </span>
                                            }
                                        </Col>
                                    </Row>
                                    {order.orderDetails.map((orderDetail) => {
                                        return (
                                            <div className="mt-2" key={orderDetail.id}>
                                                <Link style={{ textDecoration: "none", color: "black" }} to={`/products/${orderDetail.product.id}`}>
                                                    <Row className="bg-light p-1">
                                                        <Col xs="2">
                                                            <img width="100%" src={orderDetail.product.images[0].url} alt="pic img[0]" />
                                                        </Col>
                                                        <Col>
                                                            <p style={{ fontWeight: "bold" }}>{orderDetail.product.name}</p>
                                                            <p>x{orderDetail.quantity}</p>
                                                        </Col>
                                                        <Col className="my-auto">
                                                            <p className="float-end">{new Intl.NumberFormat().format(orderDetail.price)} (VNĐ)</p>
                                                        </Col>
                                                    </Row>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                    <div>
                                        <Row className="float-end row-cols-auto mt-2">
                                            <Col>
                                                {
                                                    order.status === 'UNCONFIRMED' ?
                                                        <Button variant="danger" onClick={() => this.onCancelOrder(order.id)}>Hủy đơn</Button>
                                                        :
                                                        <Button variant="success">Mua lại</Button>
                                                }
                                            </Col>
                                            <Col>
                                                <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ef5739" }}>
                                                    Tổng số tiền: {new Intl.NumberFormat().format(order.total)} (VNĐ)
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                                <hr className="mt-5"></hr>
                            </div>
                        )
                    })}
                </Container>
            </div>
        )
    }
}
