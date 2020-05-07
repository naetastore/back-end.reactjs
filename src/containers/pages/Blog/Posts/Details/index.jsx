import React, { Fragment } from 'react';
import Ul from '../../../../../components/molecules/ListItem/Ul';
import Li from '../../../../../components/molecules/ListItem/Li';

function Details(props) {
    return (
        <Fragment>
            <div className="pb-3 post-tag">
                <span className="color-primary-dark">
                    {props.data.category}
                </span>
            </div>
            <Ul>
                <Li>{props.data.author}</Li>
                <Li>{props.data.created}</Li>
                <Li>{props.data.viewer} Views</Li>
                <Li>{props.data.comments} Comments</Li>
            </Ul>
        </Fragment>
    );
}

export default Details;