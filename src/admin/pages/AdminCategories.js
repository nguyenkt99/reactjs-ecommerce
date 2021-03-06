import React, { Component } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { del, get, post, put } from '../../httpHelper';
import Swal from 'sweetalert2';

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

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ isEdit: false });
        this.setState({ show: false });
    }

    handleEdit(categoryId) {
        this.setState({ isEdit: true });
        this.fetchCategory(categoryId);
        setTimeout(() => {
            this.setState({ name: this.state.category.name });
            this.setState({ description: this.state.category.description });
            this.handleShow();
        }, 100)
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

    handleDelete(categoryId) {
        Swal.fire({
            title: 'B???n c?? ch???c ch???n x??a?',
            text: "B???n s??? kh??ng th??? kh??i ph???c!",
            icon: 'warning',
            cancelButtonText: 'H???y',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'C??, x??a th????ng hi???u n??y!'
        }).then((result) => {
            if (result.isConfirmed) {
                del(`/categories/${categoryId}`)
                    .then((res) => {
                        if (res.status === 200) {
                            this.fetchCategories();
                            Swal.fire(
                                '???? x??a',
                                'X??a th??nh c??ng',
                                'success',
                            );
                        }
                    })
            }
        });
    }


    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Th????ng hi???u</h3>
                <hr></hr>
                <Button variant="success" onClick={() => this.handleShow()}><FontAwesomeIcon icon={faPlus} /> Th??m</Button>
                <Table bordered={false} striped={false} hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>T??n th????ng hi???u</th>
                            <th>M?? t???</th>
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
                                        <Button variant="danger" onClick={() => this.handleDelete(category.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Th????ng hi???u</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form id="addCategoryForm" onSubmit={() => this.handleSubmit()}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control type="text" required placeholder="Nh???p t??n th????ng hi???u" value={this.state.name} onChange={(e) => this.handleChange(e, 'name')} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control type="text" required placeholder="Nh???p m?? t???" value={this.state.description} onChange={(e) => this.handleChange(e, 'description')} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>????ng</Button>
                        <Button variant="primary" type="submit" form="addCategoryForm">OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
