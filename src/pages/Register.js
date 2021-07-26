import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { post } from '../httpHelper';

export default class Register extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            username: this.username,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        };

        post("/auth/signup", formData)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.accessToken);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.props.history.replace('/login');
                }
            });
    }

    render() {
        return (
            <Container>
                <Row className="text-center justify-content-center p-5">
                    <Col xs="3">
                        <h3 className="mb-3">Đăng kí</h3>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Tài khoản" onChange={(e) => this.username = e.target.value} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Email" onChange={(e) => this.email = e.target.value} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Mật khẩu" onChange={(e) => this.password = e.target.value} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Control type="password" placeholder="Gõ lại mật khẩu" onChange={(e) => this.confirmPassword = e.target.value} />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Đăng kí
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
