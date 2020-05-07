import React, { useState } from 'react';
import config from '../../../../../config.json';
import avatar from '../../../../../assets/img/avatar/29-02-2020.jpg';
import avatarScnd from '../../../../../assets/img/avatar/naeta.jpg';
import { Image } from 'react-bootstrap';

function Bio() {

    let [current, setCurrent] = useState({ name: config.bio.name.split(' ')[0], image: avatar });
    let [next, setNext] = useState({ name: config.bio.name.split(' ')[1], image: avatarScnd });

    const asAvatar = () => {
        [current, next] = [next, current];

        setCurrent(current);
        setNext(next);
    }

    return (
        <div className="text-center">
            <Image
                src={current.image}
                className="rounded-sm bg-gray-light cursor-pointer--hover"
                width="220px"
                height="220px"
                alt="author"
                onClick={asAvatar}
            />
            <h4 className="mt-3">{current.name}</h4>
        </div>
    );
}

export default Bio;