import React from 'react';
import { useLocation } from 'react-router-dom';


export default function Page404() {
    let location = useLocation()
    return (
        <h3>
        Whoops..... path <code>{location.pathname}</code> not found
        </h3>
    )
}
