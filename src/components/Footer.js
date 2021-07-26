import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faPinterest, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default class Footer extends Component {
    render() {
        return (
            <div style={{ backgroundColor: 'whitesmoke', marginTop: "200px"}}>
                <Container>
                    <Row>
                        <Col className="text-center mt-5">
                            <img
                                src="/logo.png"
                                width="50%"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </Col>
                        <Col className="mt-5">
                            <Row>
                                <Col>
                                    <h5>About</h5>
                                    <p><Link to="#">Contact Us</Link></p>
                                    <p><Link to="#">Legal</Link></p>
                                    <p><Link to="#">Term</Link></p>
                                    <p><Link to="#">Policy</Link></p>
                                </Col>
                                <Col className="text-center">
                                    <h5>Social</h5>
                                    <Col>
                                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                                        <FontAwesomeIcon icon={faInstagram} size="lg" />
                                        <FontAwesomeIcon icon={faFacebook} size="lg" />
                                        <FontAwesomeIcon icon={faYoutube} size="lg" />
                                        <FontAwesomeIcon icon={faPinterest} size="lg" />
                                        <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                    </Col>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}
