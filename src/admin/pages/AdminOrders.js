import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap';
import { get, put } from '../../httpHelper';
import { Link } from 'react-router-dom';

export default class AdminOrders extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders() {
        get('/orders')
            .then((res) => this.setState({ orders: res.data.sort((a, b) => b.id - a.id) }))
            .catch((error) => console.log(error));
    }

    handleOrder(orderId, orderStatus) {
        put(`/orders/${orderId}`, JSON.stringify(orderStatus))
            .then((res) => {
                this.fetchOrders();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Các đơn hàng</h3>
                <hr></hr>
                <Table bordered={false} striped={false} hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Thông tin</th>
                            <th>Ngày tạo</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.userId}</td>
                                    <td>
                                        <p>{order.name}</p>
                                        <p>{order.phone}</p>
                                        <p>{order.address}</p>
                                    </td>
                                    <td>{order.createdDate}</td>
                                    <td>
                                        {new Intl.NumberFormat().format(order.total)} (VNĐ)
                                    </td>
                                    <td>
                                        {order.status === 'UNCONFIRMED' ?
                                            <span className="badge bg-danger">
                                                Chưa xác nhận
                                            </span>
                                            :
                                            order.status === 'CONFIRMED' ?
                                                <span className="badge bg-success">
                                                    Đã xác nhận
                                                </span>
                                                :
                                                <span className="badge bg-warning">
                                                    Đã hủy
                                                </span>
                                        }
                                    </td>
                                    <td>
                                        <Link className="btn btn-success" to={`/orders/${order.id}`}>Chi tiết</Link>
                                    </td>
                                    <td>
                                        <Button variant="primary"
                                            disabled={order.status === 'CONFIRMED' || order.status === 'CANCELED'}
                                            onClick={() => this.handleOrder(order.id, 'CONFIRMED')}>
                                            Xác nhận
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger"
                                            disabled={order.status === 'CONFIRMED' || order.status === 'CANCELED'}
                                            onClick={() => this.handleOrder(order.id, 'CANCELED')}>
                                            Hủy đơn
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
