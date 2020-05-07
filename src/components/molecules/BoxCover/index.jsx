import React from 'react';
import './index.css';

function BoxCover(props) {
    return (
        <div className="category-post" {...props}>
            <img src={props.image} alt="post" />
            <div className="details bg-linear-gradient--hover parent">
                <div className="text">
                    <a href="#blogdetail" className="text-uppercase color-primary-dark color-white--parent-hover">
                        <h5>{props.title}</h5>
                    </a>
                    <div className="border-line"></div>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default BoxCover;