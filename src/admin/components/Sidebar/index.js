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
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">
                                    Orders
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">
                                    Users
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

            </>
        )
    }
}
