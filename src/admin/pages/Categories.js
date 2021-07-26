import React, { Component } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { get, post, put } from '../../httpHelper';

export default class Categories extends Component {

    state = {
        category: {},
        categories: [],
        show: false,
        isEdit: false,
        name: '',
        description: ''
    }

    componentDidMount() {
        this.fetchCategories();
        this.handleShow();
        this.setState({ show: false });

    }

    fetchCategory(categoryId) {
        get(`/categories/${categoryId}`)
            .then((res) => this.setState({ category: res.data }))
            .catch((error) => console.log(error));
    }

    fetchCategories() {
        get('/categories')
            .then((res) => this.setState({ categories: res.data }))
            .catch((error) => console.log(error));
    }

    handleChange(e, key) {
        this.setState({ [key]: e.target.value });
    }

    handleEdit(categoryId) {
        this.setState({ isEdit: true });
        this.fetchCategory(categoryId);
        this.setState({ name: this.state.category.name });
        this.setState({ description: this.state.category.description });
        this.handleShow();
    }

    handleSubmit() {
        if (this.state.isEdit) {
            put(`/categories/${this.state.category.id}`, {
                name: this.state.name,
                description: this.state.description
            })
                .then((res) => {
                    if (res.status === 200) {
                        this.fetchCategories();
                        this.handleClose();
                    }
                });
        } else {
            post(`/categories`, {
                name: this.state.name,
                description: this.state.description
            })
                .then((res) => {
                    if (res.status === 200) {
                        this.fetchCategories();
                        this.handleClose();
                    }
                });
        }
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ isEdit: false });
        this.setState({ show: false });
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Thương hiệu</h3>
                <hr></hr>
                <Button variant="success" onClick={() => this.handleShow()}><FontAwesomeIcon icon={faPlus} /> Thêm</Button>
                <Table bordered={false} striped={false} hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên thương hiệu</th>
                            <th>Mô tả</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map((category) => {
                            return (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <Button onClick={() => this.handleEdit(category.id)}><FontAwesomeIcon icon={faEdit} /></Button>
                                    </td>
                                    <td>
                                        <Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thương hiệu</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control type="text" placeholder="Nhập tên thương hiệu" value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control type="text" placeholder="Nhập mô tả" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>Đóng</Button>
                        <Button variant="primary" onClick={() => this.handleSubmit()}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
