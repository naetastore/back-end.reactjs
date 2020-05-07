import React from 'react';
import { Col } from 'react-bootstrap';
import BoxCover from '../../../../components/molecules/BoxCover';
import { connect } from 'react-redux';
import { reduxActions } from '../../../../config/redux/actions';

class Categories extends React.Component {

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        if (this.props.globals.length) { return }

        try {
            await reduxActions.setGlobals();
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            this.props.globals.map((c, i) =>
                <Col lg={4} key={i}>
                    <BoxCover
                        image={c.image}
                        title={c.name}
                        description={c.description}
                        onClick={() => this.props.onClick(c.id)} />
                </Col>
            )
        );
    }
}

const mapStateToProps = state => ({
    globals: state.globals
});

export default connect(mapStateToProps)(Categories);