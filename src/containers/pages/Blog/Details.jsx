import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RightSidebar from './RightSidebar';
import PostDetails from './Posts/Details';
import Post from './Posts/Post';
import { connect } from 'react-redux';
import Navigation from './Posts/Navigation';
import Banner from '../../../components/molecules/Banner';
import data from '../../../data.json';
import Comments from './Posts/Comments';
import CommentForm from './Posts/Comments/Form';
import session from '../../../config/session';
import { NavLink } from 'react-router-dom';
import { api } from '../../../services/api';

class Details extends React.Component {

    state = {
        post: {},
        comments: []
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        const { params } = this.props.match;
        const { post } = this.state;
        if (
            post.id !== params.id && Number(post.id) > 0
        ) {
            this.getData();
        }
    }

    getData = async () => {
        const id = this.props.match.params.id;

        this.props.setLoading(true);

        try {
            const res = await api.post('posts/viewers', { id });
            console.log(res.data.message);
        } catch (err) {
            console.error(err);
        }

        try {
            const res = await api.get('posts', { id })
            this.setState({ post: res.data });
        } catch (err) {
            console.error(err);
        }

        try {
            const res = await api.get('posts/comments', { id })
            let post = { ...this.state.post };
            post['comments'] = res.data.length;

            this.setState({ comments: res.data, post });
            this.props.setLoading(false);
        } catch (err) {
            console.error(err);
        }

        this.props.setLoading(false);
    }

    submit = async data => {

        data['username'] = session.get('username');
        data['password'] = session.get('password');
        data['id'] = this.state.post.id;

        try {
            const res = await api.post('posts/comments', data);
            const comments = this.state.comments.concat(res.data);

            let post = { ...this.state.post };
            post['comments'] = post.comments + 1;

            this.setState({ comments, post });
        } catch (err) {
            console.error(err);
        }
    }

    deleteComment = async s => {
        try {
            await api.get('posts/comments', s);
            let newData = this.state.comments.filter(c => c.id !== s.id);
            if (!newData.length) { newData = [] }

            let post = { ...this.state.post };
            post['comments'] = post.comments - 1;

            this.setState({ comments: newData, post });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { post, comments } = this.state;
        const { params } = this.props.match;
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

                <section id="blogpost" className="bg-white m-0 py-40">
                    <Container>
                        <Row>
                            <Col lg={8}>
                                <Row className="mb-3">
                                    <Col md={3} className="pt-3 text-right">
                                        <PostDetails data={post} />
                                    </Col>
                                    <Col md={9} className="blog-post">
                                        <Post data={post} />
                                        {/* <Image className="w-100" src={post.image_details} alt="post" />
                                        <div className="mt-3">
                                            {post.body_details !== undefined ? (
                                                post.body_details.split('\n').map((p, i) =>
                                                    <p key={i} className="font-weight-400">{p}</p>
                                                )
                                            ) : false}
                                        </div> */}
                                    </Col>
                                </Row>
                                {/* <Row>
                                    <Col md={12}>
                                    </Col>
                                </Row> */}
                                <hr className="mt-4" />
                                <div className="mt-4">
                                    <Navigation {...this.props} />
                                </div>

                                <div className="brd-around brd-gray-light bg-light-v2 p-3 mt-40">
                                    <h4 className="font-weight-400 text-center h5">{comments.length} Komentar</h4>
                                    <Comments data={comments} onDelete={this.deleteComment} />
                                </div>

                                <div className="brd-around brd-gray-light bg-light-v2 p-3 mt-40">
                                    <h4 className="font-weight-400 text-center mb-4 h5">Buat Komentar</h4>
                                    {session.get('username') ? (
                                        <CommentForm {...this.props} onSubmit={this.submit} />
                                    ) : (
                                            <NavLink
                                                className="font-weight-600
                                                    bg-linear-gradient
                                                    bg-linear-gradient-v2--hover
                                                    text-white
                                                    rounded-sm
                                                    py-2
                                                    w-100
                                                    d-inline-block
                                                    text-center"
                                                to={`/auth?blog/post/${params.id}`}
                                            >Log In</NavLink>
                                        )
                                    }
                                </div>
                            </Col>
                            <Col lg={4}>
                                <RightSidebar {...this.props} />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Fragment>
        );
    }
}

const reduxDispatch = dispatch => ({
    setLoading: data => dispatch({ type: 'SET_LOADING', data }),
    setPosts: data => dispatch({ type: 'SET_POSTS', data })
});

export default connect(null, reduxDispatch)(Details);