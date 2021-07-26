import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

class ThankYou extends Component {
    render() {
        return (
            <Container>
                <div className="text-center pt-5">
                    <h3><FontAwesomeIcon color="green" size="lg" icon={faCheckCircle}/> Đặt hàng thành công</h3>
                    <h4 className="mt-3">Mã đơn hàng của bạn là #{this.props.location.state.orderId}</h4>
                    <Link className="btn btn-outline-danger mt-3" to="/">Tiếp tục mua sắm</Link>
                </div>
            </Container>
        )
    }
}
export default withRouter(ThankYou)