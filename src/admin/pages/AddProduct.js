import React, { Component } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { get, post, put } from '../../httpHelper';

class AddProduct extends Component {
    state = {
        category: {},
        categories: [],
        isEdit: false,
        categoryId: null,
        name: '',
        price: 0,
        unit: '',
        quantity: 0,
        status: '',
        description: '',
        dataUrl1: null,
        dataUrl2: null,
        dataUrl3: null,
        image1: null,
        image2: null,
        image3: null
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories() {
        get('/categories')
            .then((res) => this.setState({ categories: res.data }))
            .catch((error) => console.log(error));
    }

    handleChange(e, key) {
        this.setState({ [key]: e.target.value });
    }

    handlePreview1 = async () => {
        // await this.setState({ image: event.target.files[0] });
        if (this.state.image1) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ dataUrl1: reader.result });
            };
            await reader.readAsDataURL(this.state.image1);
        } else {
            this.setState({ dataUrl1: null });
        }
    }

    handlePreview2 = async () => {
        // await this.setState({ image: event.target.files[0] });
        if (this.state.image2) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ dataUrl2: reader.result });
            };
            await reader.readAsDataURL(this.state.image2);
        } else {
            this.setState({ dataUrl2: null });
        }
    }

    handlePreview3 = async () => {
        // await this.setState({ image: event.target.files[0] });
        if (this.state.image3) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({ dataUrl3: reader.result });
            };
            await reader.readAsDataURL(this.state.image3);
        } else {
            this.setState({ dataUrl3: null });
        }
    }

    handleSubmit() {
        let imgs = [];
        if(this.state.dataUrl1) {
            imgs.push({url: this.state.dataUrl1});
        }
        if(this.state.dataUrl2) {
            imgs.push({url: this.state.dataUrl2});
        }
        if(this.state.dataUrl3) {
            imgs.push({url: this.state.dataUrl3});
        }

        const formData = {
            categoryId: this.state.categoryId,
            name: this.state.name,
            price: this.state.price,
            unit: this.state.unit,
            quantity: this.state.quantity,
            status: this.state.status,
            description: this.state.description,
            images: imgs
        }

        console.log(formData);

        if (this.state.isEdit) {
            put(`/products/${this.state.product.id}`, {
                formData
            })
                .then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm sản phẩm thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.props.history.push({
                            pathname: '/products',
                            // state: {
                            //     orderId: res.data.id
                            // }
                        });
                    }
                });
        } else {
            console.log(formData);
            post(`/products`, formData)
                .then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thêm sản phẩm thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.props.history.push({
                            pathname: '/products',
                        });
                    }
                });

        }
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Sản phẩm</h3>
                <hr></hr>

                <Form>
                    <Col xs="6">
                        <Form.Group className="mb-3" controlId="id">
                            <Form.Label>Nhãn hiệu</Form.Label>
                            <Form.Control type="text" as="select" aria-label="Default select example" onChange={(e) => this.handleChange(e, 'categoryId')}>
                                <option>Chọn thương hiệu</option>
                                {this.state.categories.map((category) =>
                                    <option key={category.id}
                                        value={category.id}

                                    >
                                        {category.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="id">
                            <Form.Label>Mã sản phẩm</Form.Label>
                            <Form.Control type="text" disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control type="text"
                                value={this.state.name}
                                onChange={(e) => this.handleChange(e, 'name')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control type="number"
                                value={this.state.price}
                                onChange={(e) => this.handleChange(e, 'price')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="unit">
                            <Form.Label>Quy cách</Form.Label>
                            <Form.Control type="text"
                                onChange={(e) => this.handleChange(e, 'unit')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="quantity">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control type="number"
                                value={this.state.quantity}
                                onChange={(e) => this.handleChange(e, 'quantity')}
                            />
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={6}>
                                Trạng thái
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Đang bán"
                                    name="formHorizontalRadios"
                                    id="available"
                                    value="AVAILABLE"
                                    onChange={(e) => this.handleChange(e, 'status')}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Ngừng bán"
                                    name="formHorizontalRadios"
                                    id="notAvailable"
                                    value="NOT_AVAILABLE"
                                    onChange={(e) => this.handleChange(e, 'status')}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label as="legend" column sm={6}>
                                Mô tả chi tiết
                            </Form.Label>
                            <Form.Control
                                style={{ width: "400px", height: "100px" }}
                                as="textarea" aria-label="With textarea"
                                placeholder="Viết mô tả chi tiết"
                                value={this.state.description}
                                onChange={(e) => this.handleChange(e, 'description')}
                            />
                        </Form.Group>
                    </Col>
                    <Row className="mt-5">
                        <Image style={{ width: "100px" }} src={this.state.dataUrl1} roundedCircle />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (event) => {
                                const file = event.target.files[0];
                                if (file && file.type.substr(0, 5) === "image") {
                                    await this.setState({ image1: file });
                                } else {
                                    await this.setState({ image1: null });
                                }
                                this.handlePreview1();
                            }}
                        />
                    </Row>
                    <Row className="mt-5">
                        <Image style={{ width: "100px" }} src={this.state.dataUrl2} roundedCircle />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (event) => {
                                const file = event.target.files[0];
                                if (file && file.type.substr(0, 5) === "image") {
                                    await this.setState({ image2: file });
                                } else {
                                    await this.setState({ image2: null });
                                }
                                this.handlePreview2();
                            }}
                        />
                    </Row>
                    <Row className="mt-5">
                        <Image style={{ width: "100px" }} src={this.state.dataUrl3} roundedCircle />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (event) => {
                                const file = event.target.files[0];
                                if (file && file.type.substr(0, 5) === "image") {
                                    await this.setState({ image3: file });
                                } else {
                                    await this.setState({ image3: null });
                                }
                                this.handlePreview3();
                            }}
                        />
                    </Row>
                    <Button variant="primary" onClick={() => this.handleSubmit()}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
export default withRouter(AddProduct)