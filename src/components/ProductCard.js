import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default class ProductCard extends Component {
    render() {
        let buttons;
        if (this.props.product.quantity === 0 || this.props.product.status === 'NOT_AVAILABLE') {
            buttons = (
                <p style={{ color: "red", fontWeight: "bolder", fontSize: "18px" }}>Liên hệ</p>
            )
        } else {
            buttons = (
                <>
                    <CartContext.Consumer>
                        {({ addToCart }) =>
                            <Button variant="primary" size="sm" onClick={() =>
                                addToCart(this.props.product)}>
                                Thêm vào giỏ
                            </Button>}
                    </CartContext.Consumer>
                    <CartContext.Consumer>
                        {({ addToCart }) =>
                            <Link to="../cart" >
                                <Button variant="danger" size="sm" style={{ marginLeft: "10px" }} onClick={() =>
                                    addToCart(this.props.product, this.props.quantity)
                                }>
                                    Mua ngay
                                </Button>
                            </Link>}
                    </CartContext.Consumer>
                </>
            )
        }

        return (
            <Card style={{ width: '100%', border: "none" }} className="text-center mb-2">
                <Link to={`../products/${this.props.product.id}`}>
                    <Card.Img variant="top" src={this.props.product.images[0].url} />
                </Link>
                <Card.Body>
                    <Link to={`../products/${this.props.product.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <Card.Title style={{ textTransform: "uppercase", fontWeight: "bolder" }}>{this.props.product.name}</Card.Title>
                    </Link>
                    <Card.Text style={{ color: "#4b3a38", fontSize: "16px" }}>
                        {new Intl.NumberFormat().format(this.props.product.price)} VNĐ ({this.props.product.unit}) 
                    </Card.Text>
                    {/* {this.props.product.status === 'UNAVAILABLE'}
                    <CartContext.Consumer>
                        {({ addToCart }) => <Button variant="primary" size="md" onClick={() => addToCart(this.props.product)}>Thêm vào giỏ</Button>}
                    </CartContext.Consumer> */}
                    {buttons}
                </Card.Body>
            </Card>
        )
    }
}
