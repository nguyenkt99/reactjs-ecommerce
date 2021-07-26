import React, { Component } from 'react'
import Products from './Products'

export default class Home extends Component {

    render() {
        let welcome;
        if (localStorage.getItem('user')) {
            welcome = <h4 style={{textAlign: "center"}}>Xin chào, {JSON.parse(localStorage.getItem('user')).username}</h4>
        } else {
            welcome = <h4 style={{textAlign: "center"}}>Vui lòng đăng nhập để mua hàng</h4>
        }
        return (
            <>
                {welcome}
                <Products />
            </>
        )
    }
}
