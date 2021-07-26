import React, { Component } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { get, post, put } from '../../httpHelper';
import { Link } from 'react-router-dom';

export default class Products extends Component {

    state = {
        product: {},
        products: [],
        show: false,
        isEdit: false,
        name: '',
        description: ''
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProduct(productId) {
        get(`/products/${productId}`)
            .then((res) => this.setState({ product: res.data }))
            .catch((error) => console.log(error));
    }

    fetchProducts() {
        get('/products')
            .then((res) => this.setState({ products: res.data }))
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
                    }
                });
        }
    }
    

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Sản phẩm</h3>
                <hr></hr>
                <Link className="btn btn-success" to="/add-product"><FontAwesomeIcon icon={faPlus}/> Thêm</Link>
                <Table bordered={false} striped={false} hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Quy cách</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img width="40px" src={product.images[0].url} alt="pic img[0]" /> {product.name}
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat().format(product.price)} (VNĐ)
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.unit}</td>
                                    <td>{product.status === 'NOT_AVAILABLE' ? 'Đang bán' : 'Ngừng bán'}</td>
                                    <td>
                                        <Button onClick={() => this.handleEdit(product.id)}><FontAwesomeIcon icon={faEdit} /></Button>
                                    </td>
                                    <td>
                                        <Button variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
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
