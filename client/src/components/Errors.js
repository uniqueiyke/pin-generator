import React from 'react';
import PropTypes from 'prop-types';

export default function Errors({errors}) {
    const {message} = errors;
    return (
        <div>
            <h4 className='red-text darken-1'>{message}</h4>
        </div>
    )
}

Errors.propTypes = {
    errors: PropTypes.object.isRequired
}