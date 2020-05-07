import React from 'react';
import { Alert, CloseButton } from 'react-bootstrap';

function AlertOrg(props) {
    return (
        <Alert variant={props.variant} style={{ position: "absolute", top: "59px" }} className="mt-3 ml-3">
            {props.children}
            <CloseButton onClick={props.onHide} className="ml-2" style={{ position: "relative", top: "-2px" }} />
        </Alert>
    );
}

export default AlertOrg;