import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { get } from '../../httpHelper';

export default class AdminUsers extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        get('/users')
            .then((res) => this.setState({ users: res.data.sort((a, b) => b.id - a.id) }))
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h3>Người dùng</h3>
                <hr></hr>
                <Table bordered={false} striped={false} hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tài khoản</th>
                            <th>Email</th>
                            <th>Quyền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles[0]}</td>
                                    <td>
                                        <Link className="btn btn-success" to={`/users/${user.id}`}>Chi tiết</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
