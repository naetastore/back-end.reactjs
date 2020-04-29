import React from 'react';
import { Row, Col, Figure } from 'react-bootstrap';
import FigureImage from 'react-bootstrap/FigureImage';
import FigureCaption from 'react-bootstrap/FigureCaption';
import dummy from '../../../assets/img/icon/avatar-icon.svg';

function UserBlock(props) {
    return (
        <Row>
            {props.data.map((u, i) =>
                <Col md={4} xs={6} key={i}>
                    <Figure className="text-center rounded-sm" style={{ border: "1px solid #0000001a" }}>
                        <div className="py-4 px-2">
                            <FigureImage
                                roundedCircle src={u.avatar ? u.avatar : dummy}
                                height="100px" width="100px"
                                className="my-3"
                                style={{
                                    backgroundColor: "#f7f7f7"
                                }} />
                            <FigureCaption>
                                <h4 className="h5">{u.username}</h4>
                            </FigureCaption>
                        </div>
                        <hr className="my-0" />
                        <ul className="row list-inline py-3 px-2 m-0">
                            <li className="col">
                                Profil
                                </li>
                            <li className="col">
                                Pesan
                                </li>
                            <li className="col">
                                Telepon
                                </li>
                        </ul>
                    </Figure>
                </Col>
            )}
        </Row>
    );
}

UserBlock.defaultProps = {
    data: [{ avatar: dummy, username: 'username' }]
}

export default UserBlock;