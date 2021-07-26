import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { get } from '../httpHelper';
import ProductCard from '../components/ProductCard';


export default class Products extends Component {

    state = {
        products: []
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        get('/products')
            .then((response) => this.setState({ products: response.data.sort((a, b) => b.id - a.id) }));
    }

    render() {
        return (
            <div>
                <Container>
                    <h2>Sản phẩm</h2>
                    <Row>
                        {this.state.products.map((product) => (
                            <Col key={product.id} xs="12" sm="6" md="3">
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}
