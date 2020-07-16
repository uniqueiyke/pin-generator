import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


export default function CardPageLink({pageNumber}) {
    const {id} = useParams();
    return (
        <>
            <li className={`${pageNumber}` === id ? "active" : "waves-effect"}>
                <Link 
                    to={`/users/scratch-cards/${pageNumber}`}>
                    {pageNumber}
                </Link>
            </li>
        </>
    )
}

CardPageLink.propTypes = {
    pageNumber: PropTypes.number.isRequired
}
