import React from 'react';
import spinner from './spinner.gif';

export default function () {
    return (
        <div>
            <img
                src={spinner}
                style={{ width: '8rem', margin: 'auto', display: 'block' }}
                alt="Loading..."></img>
        </div>
    );
};
