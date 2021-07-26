import React, { Component } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default class AddProduct extends Component {
    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Sản phẩm</h3>
                <hr></hr>
                <Col xs="6">
                    <Form>
                        {/* <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select> */}
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nhãn hiệu</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Quy cách</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </div>
        )
    }
}
