import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import { get } from '../httpHelper';
import ProductCard from '../components/ProductCard';

class ProductCategories extends Component {

    state = {
        category: {},
        products: []
    }

    componentDidMount() {
        this.fetchCategory();
        this.fetchProducts();
    }

    fetchCategory() {
        get(`/categories/${this.props.match.params.categoryId}`)
            .then((response) => this.setState({ category: response.data }));
    }

    fetchProducts() {
        get(`/product-categories/${this.props.match.params.categoryId}`)
            .then((response) => this.setState({ products: response.data }));
    }

    render() {
        return (
            <div>
                <Container>
                    <h2>{this.state.category.description}</h2>
                    <Row>
                        {this.state.products.map((product) => (
                            <Col key={product.id} xs="6" md="3" className="p-3">
                                <ProductCard product={product}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}
export default withRouter(ProductCategories)