import React, { Component } from 'react';
import { Form, Button, Row, Container, ButtonGroup, Col } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";
import { post } from '../httpHelper';

class Login extends Component {

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            username: this.username,
            password: this.password
        };

        post("/auth/signin", formData)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.accessToken);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.props.onLoginSuccess();
                    this.props.history.replace('/');
                }
            });
    }

    render() {
        return (
            <Container>
                <Row className="text-center justify-content-center p-5">
                    <Col xs="4">
                        <h3 className="mb-5">Đăng nhập</h3>
                        <Form onSubmit={(e) => this.handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Username" onChange={(e) => this.username = e.target.value} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={(e) => this.password = e.target.value} />
                            </Form.Group>
                            <ButtonGroup className="me-5">
                                <Button variant="primary" type="submit">
                                    Đăng nhập
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Link className="btn btn-success" to="/register">
                                    Đăng kí
                                </Link>
                            </ButtonGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default withRouter(Login);
