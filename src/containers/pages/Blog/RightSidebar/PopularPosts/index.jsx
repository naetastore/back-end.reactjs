import React from 'react';
import { Media, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../../../../../services/api';

class PopularPosts extends React.Component {

    state = {
        popular: []
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        this.props.setLoading(true);

        try {
            const res = await api.get('posts', { popular: 4 });
            this.setState({ popular: res.data });
            this.props.setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            this.state.popular.map((p, i) =>
                <Media key={i} className="parent cursor-pointer--hover mb-3">
                    <Image
                        src={p.image}
                        alt="post"
                        width="30%"
                        onClick={() => this.props.history.push(`/blog/post/${p.id}`)} />
                    <Media.Body className="ml-2">
                        <NavLink to={`/blog/post/${p.id}`}>
                            <h4 className="h6 color-black color-primary-dark--parent-hover">
                                {p.title}
                            </h4>
                            <p className="text-muted">
                                {p.created}
                            </p>
                        </NavLink>
                    </Media.Body>
                </Media>
            )
        );
    }
}

const reduxDispatch = dispatch => ({
    setLoading: data => dispatch({ type: 'SET_LOADING', data })
});

export default connect(null, reduxDispatch)(PopularPosts);