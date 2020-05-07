import React from 'react';
import { Table, Button } from 'react-bootstrap';

function Post(props) {
    const { data, onShow } = props;
    return (
        <Table striped bordered hover className="mt-3">
            <thead>
                <tr>
                    <th style={{ width: "70px" }}>ID</th>
                    <th>Title</th>
                    <th>Created</th>
                    <th style={{ width: "67px" }}></th>
                </tr>
            </thead>
            <tbody>
                {
                    !data.length ? (
                        <tr>
                            <td>#0</td>
                            <td>Post could not be found.</td>
                            <td></td>
                            <td></td>
                        </tr>
                    ) : data.map((g, i) =>
                        <tr
                            className="cursor-pointer--hover"
                            key={i}
                            onClick={() => onShow(g.id)}
                        >
                            <td>#{g.id}</td>
                            <td>{g.title}</td>
                            <td>{g.created}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="outline-success"
                                >Edit</Button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}

export default Post;