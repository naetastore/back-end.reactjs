import React from 'react';
import Ul from '../../../../../components/molecules/ListItem/Ul';
import Li from '../../../../../components/molecules/ListItem/Li';
import { connect } from 'react-redux';
import { reduxActions } from '../../../../../config/redux/actions';

class PostsCategories extends React.Component {

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        if (this.props.categories.length) {
            return;
        }

        try {
            await reduxActions.setCategories();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <Ul>
                {this.props.categories.map((c, i) =>
                    <Li key={i}>
                        <div className="d-flex" style={{ justifyContent: "space-between" }}>
                            <span>{c.name}</span>
                            <span>{c.posts}</span>
                        </div>
                    </Li>
                )}
            </Ul>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories,
    posts: state.posts
});

export default connect(mapStateToProps)(PostsCategories);