import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { get, post } from '../httpHelper';
import { CartContext } from '../contexts/CartContext'


class ProductDetail extends Component {
    state = {
        product: {},
        images: [],
        reviews: [],
        ratingProduct: null,
        rating: null,
        review: '',
        quantity: 1
    }

    componentDidMount() {
        this.fetchProduct();
        this.fetchReviews();
    }

    fetchProduct() {
        get(`/products/${this.props.match.params.productId}`)
            .then((response) => {
                this.setState({ product: response.data });
                this.setState({ images: response.data.images });
            });
    }

    fetchReviews() {
        get(`/products/${this.props.match.params.productId}/reviews`)
            .then((response) => {
                const data = response.data;
                const stars = Math.round(data.reduce((acc, curr) => acc + curr.rating, 0) / data.length);
                this.setState({ reviews: data });
                this.setState({ ratingProduct: stars });
            });
    }

    renderStarRating(stars) {
        return [...Array(5)].map((star, i) => {
            return (
                <FontAwesomeIcon key={i} icon={faStar} size="1x" color={i < stars ? "orange" : "null"} />
            )
        });
    }

    setRating(ratingValue) {
        console.log(ratingValue);
        this.setState({ rating: ratingValue });
    }

    handleFieldChange(e) {
        this.setState({ review: e.target.value });
    }

    handlePlus() {
        if (this.state.quantity < this.state.product.quantity) {
            this.setState({ quantity: (this.state.quantity + 1) })
        }
    }

    handleMinus() {
        if (this.state.quantity > 1) {
            this.setState({ quantity: (this.state.quantity - 1) })
        }

    }

    handleReview(e) {
        e.preventDefault();
        var user = null;
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'))
        }
        const comment = e.target.formBasicReview.value;
        const id = user !== null ? user.id : console.log('user not exists in localStorage');
        const formData = {
            rating: this.state.rating,
            description: comment,
            userId: id
        }

        post(`/products/${this.state.product.id}/reviews`, formData)
            .then((res) => {
                this.setState({ rating: null, review: '' });
                this.fetchReviews();
            });
    }

    render() {
        let buttons;
        if (this.state.product.quantity === 0 || this.state.product.status === 'NOT_AVAILABLE') {
            buttons = (
                <h3 style={{ color: "red", fontWeight: "bolder" }}>LIÊN HỆ</h3>
            )
        } else {
            buttons = (
                <>
                    <CartContext.Consumer>
                        {({ addToCart }) =>
                            <Button variant="primary" size="lg" onClick={() =>
                                addToCart(this.state.product, this.state.quantity)}>
                                Thêm vào giỏ
                            </Button>}
                    </CartContext.Consumer>
                    <CartContext.Consumer>
                        {({ addToCart }) =>
                            <Link to="../cart" >
                                <Button variant="danger" size="lg" style={{ marginLeft: "50px" }} onClick={() =>
                                    addToCart(this.state.product, this.state.quantity)
                                }>
                                    Mua ngay
                                </Button>
                            </Link>}
                    </CartContext.Consumer>
                </>
            )
        }

        return (
            <Container>
                <Row style={{ marginTop: 60 }}>
                    <Col xs="12" sm="6">
                        <Carousel interval={null}>
                            {this.state.images.map((image) => (
                                <Carousel.Item key={image.id}>
                                    <img
                                        className="d-block w-100"
                                        src={image.url}
                                        alt={image.description}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col>
                        <h3 style={{ textTransform: "uppercase", fontWeight: "bolder" }}>{this.state.product.name}</h3>
                        <p>
                            {this.renderStarRating(this.state.ratingProduct)}
                            <span style={{ padding: "10px" }}>({this.state.reviews.length} đánh giá)</span>
                        </p>
                        <p style={{ fontSize: "18px", marginBottom: "25px" }}>
                            <strong>Trạng thái: </strong>{this.state.product.status === 'AVAILABLE' ? 'Còn hàng' : 'Hết hàng'}
                        </p>
                        <p style={{ fontSize: "18px", marginBottom: "25px" }}>
                            <strong>Quy cách: </strong>{this.state.product.unit}
                        </p>
                        <h3 style={{ color: "#cd140a", fontWeight: "bolder" }}>
                            {new Intl.NumberFormat().format(this.state.product.price)} VNĐ ({this.state.product.unit})
                        </h3>
                        <InputGroup className="mb-3">
                            <Button variant="outline-secondary" onClick={() => this.handleMinus()}>-</Button>
                            <FormControl className="text-center" style={{ maxWidth: 60 }} readOnly={true} value={this.state.quantity} />
                            <Button variant="outline-secondary" onClick={() => this.handlePlus()}>+</Button>
                        </InputGroup>
                        {buttons}
                    </Col>
                </Row>
                <Row style={{ marginTop: 60 }}>
                    <h3>Chi tiết sản phẩm</h3>
                    <p>{this.state.product.description}</p>
                </Row>
                <Row style={{ marginTop: 60 }}>
                    <h3>Đánh giá</h3>
                    <div style={{ display: "inline-block" }}>
                        {
                            [...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label key={i}>
                                        <input style={{ display: "none" }} type="radio" name="rate" value={ratingValue} onClick={() =>
                                            this.setRating(ratingValue)} />
                                        <FontAwesomeIcon key={i} icon={faStar} size="2x" color={ratingValue <= this.state.rating ? "orange" : "null"} />
                                    </label>
                                )
                            })
                        }
                    </div>
                    <Form onSubmit={(e) => this.handleReview(e)}>
                        <InputGroup style={{ marginTop: "30px" }}>
                            <Form.Group controlId="formBasicReview">
                                <FormControl
                                    style={{ width: "400px", height: "100px" }}
                                    as="textarea" aria-label="With textarea"
                                    placeholder="Viết bình luận"
                                    value={this.state.review}
                                    onChange={(e) => this.handleFieldChange(e)} />
                            </Form.Group>
                            <Button type="submit" variant="outline-primary" id="button-addon2" >
                                Đánh giá
                            </Button>
                        </InputGroup>
                    </Form>
                    {
                        this.state.reviews.map((review) => {
                            return (
                                <div key={review.id} style={{ padding: "30px" }}>

                                    <p>{review.userId} - {this.renderStarRating(review.rating)}</p>
                                    <p style={{ fontStyle: "italic" }}>{review.description}</p>
                                </div>
                            );
                        })
                    }
                </Row>
            </Container>
        )
    }
}
export default withRouter(ProductDetail)