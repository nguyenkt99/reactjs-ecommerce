import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import TopMenu from './components/TopMenu';
import Footer from './components/Footer'
import ProductCategories from './pages/ProductCategories';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Home from './pages/Home';
import CartProvider, { CartContext } from './contexts/CartContext'
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Orders from './pages/Orders';
import Register from './pages/Register';
import OrderDetail from './pages/OrderDetail';
import Sidebar from './admin/components/Sidebar';
import AdminHome from './admin/pages/AdminHome';
import Categories from './admin/pages/Categories';
import Products from './admin/pages/Products';
import AddProduct from './admin/pages/AddProduct';

export default class App extends Component {

  state = {
    isLogin: false
  }

  componentDidMount() {
    if (localStorage.getItem('token')) { // !!! Nên gọi API xác thực JWT để lấy quyền đăng nhập + thông tin user
      this.setState({ isLogin: true });
    }

  }

  onLoginSuccess() {
    this.setState({ isLogin: true });
  }

  onLogoutSuccess() {
    this.setState({ isLogin: false });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div>
        {(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).roles[0] === 'ROLE_ADMIN') ?
          <Router>
            <div>
              <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <Link className="navbar-brand col-sm-3 col-md-2 mr-0 px-2" to="#">Administrator</Link>
                <ul className="navbar-nav px-3 d-flex flex-row">
                  <li className="nav-item text-nowrap px-4">
                    <Link className="nav-link" style={{ fontWeight: "bolder" }} to="#">{JSON.parse(localStorage.getItem('user')).username}</Link>
                  </li>
                  <li className="nav-item text-nowrap">
                    <Link className="nav-link" to="/login" onClick={() => this.onLogoutSuccess()}>Sign out</Link>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid">
                <div className="row">
                  <Sidebar />
                  <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <Route path="/categories" component={Categories} />
                    <Route path="/products" component={Products} />
                    <Route path="/add-product" component={AddProduct} />
                  </main>
                </div>
              </div>
            </div>

          </Router>
          :
          <CartProvider>
            <Router>
              <div className="App">
                <TopMenu onLogoutSuccess={() => this.onLogoutSuccess()} />
                <Switch>
                  <Route exact path="/login" render={() =>
                    !this.state.isLogin ? <Login onLoginSuccess={() => this.onLoginSuccess()} /> : <Redirect to="/" />
                  } />
                  <Route exact path="/" render={() =>
                    (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).roles[0] === 'ROLE_ADMIN') ? <AdminHome /> : <Home />} />
                  <Route path="/product-categories/:categoryId">
                    <ProductCategories />
                  </Route>
                  <Route exact path="/products/:productId">
                    <ProductDetail />
                  </Route>
                  <Route exact path="/cart" render={() => { // Nếu là user thì cho vào giỏ hàng
                    const user = localStorage.getItem('user');
                    return (user && JSON.parse(user).roles[0] === 'ROLE_USER') ?
                      <Cart />
                      :
                      <Redirect to='/login' />
                  }} />
                  <Route exact path="/checkout" render={() => // Nếu giỏ hàng có sản phẩm thì mới cho checkout
                    <CartContext.Consumer>
                      {({ cart }) => (
                        Object.keys(cart).reduce((acc, key) => acc + cart[key].quantity, 0) > 0 ?
                          <Checkout />
                          :
                          <Redirect to='/cart' />
                      )}
                    </CartContext.Consumer>
                  } />
                  <Route exact path="/thankyou" component={ThankYou} />
                  <Route exact path="/orders" render={() => {
                    const user = localStorage.getItem('user');
                    return (user && JSON.parse(user).roles[0] === 'ROLE_USER') ?
                      <Orders userId={JSON.parse(user).id} />
                      :
                      <Redirect to='/login' />
                  }} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/orders/:orderId" component={OrderDetail} />
                </Switch>
                <Footer />
              </div>
            </Router>
          </CartProvider>
        }
      </div>
    );
  }
}
