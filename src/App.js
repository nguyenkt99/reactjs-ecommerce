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
import AdminCategories from './admin/pages/AdminCategories';
import AdminProducts from './admin/pages/AdminProducts';
import AddProduct from './admin/pages/AddProduct';
import EditProduct from './admin/pages/EditProduct';
import AdminOrders from './admin/pages/AdminOrders';
import AdminOrderDetail from './admin/pages/AdminOrderDetail';
import EditProfile from './pages/EditProfile';
import AdminUsers from './admin/pages/AdminUsers';
import AdminUserDetail from './admin/pages/AdminUserDetail';

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
                    <Route exact path="/categories" component={AdminCategories} />
                    <Route exact path="/products" component={AdminProducts} />
                    <Route exact path="/add-product" component={AddProduct} />
                    <Route exact path="/edit-product/:productId" component={EditProduct} />
                    <Route exact path="/orders" component={AdminOrders} />
                    <Route exact path="/orders/:orderId" component={AdminOrderDetail} />
                    <Route exact path="/users" component={AdminUsers} />
                    <Route exact path="/users/:userId" component={AdminUserDetail} />
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
                  <Route path="/product-categories/:categoryId">
                    <ProductCategories />
                  </Route>
                  <Route exact path="/products/:productId">
                    <ProductDetail />
                  </Route>
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" render={() =>
                    !this.state.isLogin ? <Login onLoginSuccess={() => this.onLoginSuccess()} /> : <Redirect to="/" />
                  } />
                  <Route exact path="/" render={() =>
                    (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).roles[0] === 'ROLE_ADMIN') ?
                      <AdminHome /> : <Home />
                  } />

                  {(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).roles[0] === 'ROLE_USER') ?
                    <>
                      <Route exact path="/cart" component={Cart} />
                      <Route exact path="/edit-profile" component={EditProfile} />
                      <Route exact path="/thankyou" component={ThankYou} />
                      <Route exact path="/orders" render={() =>
                        <Orders userId={JSON.parse(localStorage.getItem('user')).id} />
                      } />
                      <Route exact path="/orders/:orderId" component={OrderDetail} />
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
                    </>
                    :
                    <Redirect to='/login' />
                  }

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
