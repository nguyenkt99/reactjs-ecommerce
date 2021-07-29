import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { del, get } from '../../httpHelper';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class AdminProducts extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        get('/products')
            .then((res) => this.setState({ products: res.data.sort((a, b) => b.id - a.id) }))
            .catch((error) => console.log(error));
    }

    handleDelete(productId) {
        Swal.fire({
            title: 'Bạn có chắc chắn xóa?',
            text: "Bạn sẽ không thể khôi phục!",
            icon: 'warning',
            cancelButtonText: 'Hủy',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa sản phẩm này'
        }).then((result) => {
            if (result.isConfirmed) {
                del(`/products/${productId}`)
                    .then((res) => {
                        if (res.status === 200) {
                            this.fetchProducts();
                            Swal.fire(
                                'Đã xóa',
                                'Xóa thành công',
                                'success'
                            );
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Sản phẩm</h3>
                <hr></hr>
                <Link className="btn btn-success" to="/add-product"><FontAwesomeIcon icon={faPlus} /> Thêm</Link>
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
                                        <Link className="btn btn-primary" to={`/edit-product/${product.id}`}><FontAwesomeIcon icon={faInfoCircle} /></Link>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => this.handleDelete(product.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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
