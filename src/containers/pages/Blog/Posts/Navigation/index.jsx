import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxActions } from '../../../../../config/redux/actions';

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            prev: {},
            next: {}
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate() {
        const id = this.props.match.params.id;
        if (this.state.id !== id) { this.getNavigation(id) }
    }

    getData = async () => {
        const id = this.props.match.params.id;
        this.getNavigation(id);

        if (this.props.posts.length) { return }

        try {
            await reduxActions.setPosts();
            this.getNavigation(id);
        } catch (err) {
            console.error(err);
        }
    }

    getNavigation = (id) => {
        this.setState({ id });
        const i = this.props.posts.findIndex(p => p.id === id);

        let prev = {};
        let next = {};

        this.props.posts[i - 1] ? prev = this.props.posts[i - 1] : prev = {};
        this.props.posts[i + 1] ? next = this.props.posts[i + 1] : next = {};

        this.setState({ prev, next });
    }

    render() {
        return (
            <Row>
                <Col lg={6} md={6} className="align-items-center d-flex justify-content-start text-left">
                    <div className="mr-3 bg-primary">
                        <NavLink to={`/blog/post/${this.state.prev.id}`}>
                            <Image height="60px" src={this.state.prev.image} />
                        </NavLink>
                    </div>
                    <div className="details">
                        <p className="mb-1">Prev Post</p>
                        <NavLink className="color-primary-dark color-primary--hover" to={`/blog/post/${this.state.prev.id}`}>
                            <h3 className="h6">
                                {this.state.prev.title}
                            </h3>
                        </NavLink>
                    </div>
                </Col>
                <Col lg={6} md={6} className="align-items-center d-flex justify-content-end text-right">
                    <div className="details">
                        <p className="mb-1">Next Post</p>
                        <NavLink className="color-primary-dark color-primary--hover" to={`/blog/post/${this.state.next.id}`} onClick={this.getNavigation}>
                            <h3 className="h6">
                                {this.state.next.title}
                            </h3>
                        </NavLink>
                    </div>
                    <div className="ml-3 bg-primary">
                        <NavLink to={`/blog/post/${this.state.next.id}`}>
                            <Image height="60px" src={this.state.next.image} />
                        </NavLink>
                    </div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps)(Navigation);