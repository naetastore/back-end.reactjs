import React from 'react';

function Li(props) {
    return (
        <li {...props} className={"py-2 brd-bottom brd-gray-light-v3 " + props.className}>
            {props.children}
        </li>
    );
}

export default Li;