import React, { Component } from 'react'

export const CartContext = React.createContext();

export default class CartProvider extends Component {

    state = {
        cart: {}
    };

    componentDidMount() {
        if (localStorage.getItem('cart')) {
            this.setState({ cart: JSON.parse(localStorage.getItem('cart')) });
        }
    }

    addToCart = async (p, quantity = 1) => {
        let cartTemp = this.state.cart;
        if(cartTemp[p.id]) {
            cartTemp[p.id].quantity += quantity;
        } else {
            cartTemp[p.id] = {
                product: p,
                quantity: quantity
            }
        }
        await this.setState({
            cart: cartTemp
        });
        localStorage.setItem('cart', JSON.stringify(this.state.cart));
    }

    removeItem = async (productId) => {
        let cartTemp = this.state.cart;
        delete cartTemp[productId];
        await this.setState({
            cartItems: cartTemp
        });
        localStorage.setItem('cart', JSON.stringify(this.state.cartItems));
    }

    handleMinus = async (productId) => {
        let cartTemp = this.state.cart;
        if(cartTemp[productId].quantity > 1) {
            cartTemp[productId].quantity -= 1;
            await this.setState({
                cartItems: cartTemp
            });
            localStorage.setItem('cart', JSON.stringify(this.state.cartItems));
        }
    }

    handlePlus = async (productId) => { // !!! nên check quantity từ api
        let cartTemp = this.state.cart;
        if(cartTemp[productId].quantity < cartTemp[productId].product.quantity) {
            cartTemp[productId].quantity += 1;
            await this.setState({
                cartItems: cartTemp
            });
            localStorage.setItem('cart', JSON.stringify(this.state.cartItems));
        }
    }

    clearCart() {
        this.setState({cart: {}});
    }

    render() {
        return (
            <CartContext.Provider value={{
                cart: this.state.cart,
                addToCart: (product, quantity) => this.addToCart(product, quantity),
                removeItem: (productId) => this.removeItem(productId),
                handleMinus: (productId) => this.handleMinus(productId),
                handlePlus: (productId) => this.handlePlus(productId),
                clearCart: () => this.clearCart()
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}