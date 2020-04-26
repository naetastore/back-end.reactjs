import React, { useState, useEffect } from 'react';
import { Badge } from 'react-bootstrap';

function OrderStatus(props) {

    const [status, setStatus] = useState({ variant: '', label: '' });
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized && props.data.purchased) {
            checkStatus();
        }
    });

    const checkStatus = () => {

        if (Number(props.data.purchased) > 0) {
            setStatus({ variant: 'info', label: 'Dibayar' });
        } else {
            if (Number(props.data.canceled) > 0) {
                setStatus({ variant: 'dark', label: 'Dibatalkan' });
            } else {
                setStatus({ variant: 'success', label: 'Pemesanan' });
            }
        }

        setInitialized(true);
    }

    return (
        <Badge className={props.className} variant={status.variant}>{status.label}</Badge>
    )
}

export default OrderStatus;