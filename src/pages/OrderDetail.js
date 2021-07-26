import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { get, put } from '../httpHelper';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

class OrderDetail extends Component {

    state = {
        order: {},
        orderDetails: []
    }

    componentDidMount() {
        this.fetchOrder();
    }


    fetchOrder = async () => {
        await get(`/users/${JSON.parse(localStorage.getItem('user')).id}/orders/${this.props.match.params.orderId}`)
            .then((res) => {
                this.setState({ order: res.data });
                if (res.status === 200) {
                    this.setState({ order: res.data });
                    this.setState({ orderDetails: res.data.orderDetails });
                }
            })
            .catch((error) => {
                this.props.history.push({
                    pathname: '/'
                });
            });
    }

    onCancelOrder(orderId) {
        put(`/users/${JSON.parse(localStorage.getItem('user')).id}/orders/${orderId}`)
            .then((res) => {
                this.setState({
                    order: res.data
                })
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
            <div className="p-3">
                <h3 style={{ color: "#ee4d2d" }}>Chi tiết đơn hàng</h3>
                <hr></hr>
                <Container>
                    <Row className="bg-light">
                        <h5 style={{ color: "#ee4d2d" }}><FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ nhận hàng</h5>
                        <p>
                            <span className="px-3" style={{ fontSize: "16px", fontWeight: "bold" }}>
                                {this.state.order.name}
                                <span className="px-3">
                                    {this.state.order.phone}
                                </span>
                            </span>
                            {this.state.order.address}
                        </p>
                    </Row>
                    <Row className="mt-3">
                        <Row>
                            <Col>
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>Đơn hàng #{this.state.order.id}</p>
                            </Col>
                            <Col>
                                <p style={{ fontSize: "20px", fontStyle: "italic" }}>{new Date(this.state.order.createdDate).toLocaleDateString('en-US', options)}</p>
                            </Col>
                            <Col>
                                {
                                    this.state.order.status === 'UNCONFIRMED' ?
                                        <span className="badge bg-danger float-end">
                                            Chưa xác nhận
                                        </span>
                                        :
                                        this.state.order.status === 'CONFIRMED' ?
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
                        {this.state.orderDetails.map((orderDetail) => {
                            return (
                                <div className="mt-2" key={orderDetail.id}>
                                    <Link style={{ textDecoration: "none", color: "black" }} to={`/products/${orderDetail.product.id}`}>
                                        <Row className="bg-light p-3">
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
                                        this.state.order.status === 'UNCONFIRMED' ?
                                            <Button variant="danger" onClick={() => this.onCancelOrder(this.state.order.id)}>Hủy đơn</Button>
                                            :
                                            <Button variant="success">Mua lại</Button>
                                    }
                                </Col>
                                <Col>
                                    <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ef5739" }}>
                                        Tổng số tiền: {new Intl.NumberFormat().format(this.state.order.total)} (VNĐ)
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default withRouter(OrderDetail)
