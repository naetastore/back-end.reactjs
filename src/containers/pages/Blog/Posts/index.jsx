import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Details from './Details';
import Post from './Post';

function BlogPosts(props) {
    return (
        props.posts.map((p, i) =>
            <Row className="mb-3" key={i}>
                <Col md={3} className="pt-3 text-right">
                    <Details data={p} />
                </Col>
                <Col md={9} className="blog-post">
                    <Post data={p} {...props} />
                    <Button
                        variant="light"
                        className="color-primary-dark color-primary--hover py-2 px-4"
                        onClick={() => props.history.push('/blog/post/' + p.id)}
                    >View More</Button>
                </Col>
            </Row>
        )
    );
}

export default BlogPosts;