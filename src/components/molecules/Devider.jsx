import React from 'react';

/**
 * 
 * @param {*} props 
 * width ex. 30
 * variant ex.'primary'
 */
function Devider(props) {
    return (
        <div className={`d-inline-block brd-bottom width-${props.width} brd-2 brd-${props.variant} my-3`}></div>
    );
}

export default Devider;