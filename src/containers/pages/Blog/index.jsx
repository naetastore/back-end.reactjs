import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import store from '../../../config/redux/store';
import Categories from './Categories';
import RightSidebar from './RightSidebar';
import BlogPost from './Posts';
import Banner from '../../../components/molecules/Banner';
import data from '../../../data.json';
import { reduxActions } from '../../../config/redux/actions';

function Blog(props) {

    const [posts, setPosts] = useState([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });

    const state = store.getState;

    const getData = async () => {
        if (state().posts.length) {
            setPosts(state().posts);
            setInitialized(true);
            return;
        }
        try {
            await reduxActions.setPosts();
            const { params } = props.match;
            if (params.global_id) { filterData(params.global_id) } else {
                setPosts(state().posts);
            }
        } catch (err) {
            console.error(err);
        }
        setInitialized(true);
    }

    const filterData = global_id => {
        const state = store.getState;
        setPosts(state().posts.filter(p => p.global_id === global_id));
    }

    return (
        <Fragment>
            <section id="banner" className={data.blog.bgClassName + " bg-img-hero g-mt-60 mb-0"}>
                <Banner>
                    <h1 className="color-primary font-weight-700 font-size-40 font-size-50--md mb-30">
                        {data.blog.title}
                    </h1>
                    <h2 className="mb-0 color-white-opacity-0_8 font-weight-300 font-size-20 font-size-25--sm font-size-35--md">
                        {data.blog.description}
                    </h2>
                </Banner>
            </section>

            <section id="categories" className="bg-white m-0 py-60">
                <Container>
                    <Row className="justify-content-center">
                        <Categories onClick={filterData} />
                    </Row>
                </Container>
            </section>

            <section id="blog" className="bg-white m-0 pb-60">
                <Container>
                    <Row>
                        <Col lg={8}>
                            <div className="blog-left-sidebar">
                                <BlogPost {...props} posts={posts} />
                            </div>
                        </Col>
                        <Col lg={4}>
                            <RightSidebar {...props} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
}

export default Blog;