import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default class Sidebar extends Component {
    render() {
        return (
            <>
                <nav className="col-md-2  d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="/categories">
                                    Thương hiệu
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">
                                    Đơn hàng
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">
                                    Người dùng
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </>
        )
    }
}
