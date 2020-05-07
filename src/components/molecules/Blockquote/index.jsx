import React from 'react';

function Blockquote(props) {
    return (
        <div className="brd-x brd-y brd-3 brd-cyan-gradient-opacity-v1 text-center p-4">
            <blockquote className="font-size-30 mb-30">
                "{props.children}"
            </blockquote>
            <h4 className="h5 color-primary font-weight-700 text-uppercase mb-0">
                {props.by}
            </h4>
        </div>
    );
}

export default Blockquote;