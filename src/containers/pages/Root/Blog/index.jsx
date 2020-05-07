import React from 'react';
import Ul from '../../../../components/molecules/ListItem/Ul';
import Li from '../../../../components/molecules/ListItem/Li';
import Devider from '../../../../components/molecules/Devider';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { reduxActions } from '../../../../config/redux/actions';

class Blog extends React.Component {

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        if (this.props.globals.length && this.props.categories.length) { return }
        reduxActions.setGlobals();
        reduxActions.setCategories();
    }

    render() {
        return (
            this.props.globals.map((g, i) =>
                <Col key={i} md={6} lg={3}
                    className="rounded-sm mr-2 brd-around brd-gray-light-v3">
                    <div className="px-2 py-5">
                        <h3 className="h5 text-uppercase">{g.name}</h3>
                        <p>{g.description}</p>
                        <Devider width={40} variant="primary" />
                        <Ul>
                            {this.props.categories.filter(c => c.global_id === g.id).map((c, cindex) =>
                                <Li key={cindex} className="color-primary--hover">
                                    {c.name}
                                </Li>
                            )}
                        </Ul>
                    </div>
                </Col>
            )
        );
    }
}

const mapStateToProps = state => ({
    globals: state.globals,
    categories: state.categories
});

export default connect(mapStateToProps)(Blog);