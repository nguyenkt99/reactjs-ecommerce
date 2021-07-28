import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { post } from '../httpHelper';

export default class Register extends Component {

    state = {
        validationErrors: {},
        messageError: null
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            username: this.username,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
        };

        if(this.password !== this.confirmPassword) {
            this.setState({
                messageError: 'Mật khẩu xác nhận không đúng'
            });
            return;
        }

        post("/auth/signup", formData)
            .then((res) => {
                if (res.status === 200) {
                    this.props.history.replace('/login');
                }
            })
            .catch((error) => {
                if (error.response.data.validationErrors) {
                    this.setState({
                        validationErrors: error.response.data.validationErrors,
                        messageError: null
                    });
                } else {
                    this.setState({
                        validationErrors: null,
                        messageError: error.response.data.message
                    });
                }
            });
    }

    render() {
        return (
            <Container>
                <Row className="text-center justify-content-center p-5">
                    <Col xs="12" md="6">
                        <h3 className="mb-3">Đăng kí</h3>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control type="text" required placeholder="Tài khoản" onChange={(e) => this.username = e.target.value} />
                                {this.state.validationErrors &&
                                    <Form.Control.Feedback className="d-block" type="invalid">
                                        {this.state.validationErrors.username}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" required placeholder="Email" onChange={(e) => this.email = e.target.value} />
                                {this.state.validationErrors &&
                                    <Form.Control.Feedback className="d-block" type="invalid">
                                        {this.state.validationErrors.email}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" required placeholder="Mật khẩu" onChange={(e) => this.password = e.target.value} />
                                {this.state.validationErrors &&
                                    <Form.Control.Feedback className="d-block" type="invalid">
                                        {this.state.validationErrors.password}
                                    </Form.Control.Feedback>
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Control type="password" required placeholder="Gõ lại mật khẩu" onChange={(e) => this.confirmPassword = e.target.value} />
                            </Form.Group>
                            {this.state.messageError &&
                                <Form.Control.Feedback className="d-block" type="invalid">
                                    {this.state.messageError}
                                </Form.Control.Feedback>
                            }
                            <Button className="mt-3" variant="success" type="submit">
                                Đăng kí
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
