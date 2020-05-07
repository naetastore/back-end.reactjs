import React, { Fragment } from 'react';
import { Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Post(props) {
    return (
        <Fragment>
            <Image className="w-100" src={props.data.image} alt="post" />
            <div className="mt-3">
                <NavLink to={`/blog/post/${props.data.id}`}>
                    <h1 className="h3 font-weight-400 color-primary--hover color-primary-dark">
                        {props.data.title}
                    </h1>
                </NavLink>
                {props.data.body !== undefined ? (
                    props.data.body.split('\n').map((p, i) =>
                        <p key={i} className="font-weight-400">{p}</p>
                    )
                ) : false}
            </div>
        </Fragment>
    );
}

export default Post;