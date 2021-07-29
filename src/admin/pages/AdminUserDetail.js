import React, { Component } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { get, post } from '../../httpHelper';

export default class AdminUserDetail extends Component {

    state = {
        name: '',
        phone: '',
        address: ''
    }

    componentDidMount() {
        this.fetchUserDetail();
    }

    fetchUserDetail() {
        get(`/userDetails/${this.props.match.params.userId}`)
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

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            userId: this.props.match.params.userId,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
        };

        post("/userDetails", formData)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    alert('Cập nhật thành công!')
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange(e, key) {
        this.setState({ [key]: e.target.value })
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3 style={{ color: "#ee4d2d" }}>Thông tin cá nhân</h3>
                <hr></hr>
                <Row className="text-center justify-content-center p-5">
                    <Col className="p-3" xs="12" md="6">
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
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
                            <Form.Group className="mt-3" as={Col} controlId="address">
                                <Form.Control type="text" required placeholder="Nhập địa chỉ"
                                    value={this.state.address}
                                    onChange={(e) => this.handleChange(e, 'address')}
                                />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">
                                Cập nhật
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
