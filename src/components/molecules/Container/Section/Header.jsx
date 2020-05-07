import React from 'react';

/**
 * 
 * @param {*} props 
 * title ex. 'our blogs'
 * children consumed as subtitle
 */
function Header(props) {
    return (
        <header className="brd-primary heading--bottom text-uppercase mb-4">
            <h4 className="h6">{props.title}</h4>
            <h2 className="h1">{props.children}</h2>
        </header>
    );
}

export default Header;