import React from 'react';

function Ul(props) {
    return (
        <ul className="list-unstyled text-uppercase mb-0">
            {props.children}
        </ul>
    );
}

export default Ul;