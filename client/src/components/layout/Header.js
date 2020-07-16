import React from 'react';

export default function Header(props) {
    return (
        <header className='page-header'>
            {props.children}
        </header>
    )
}
