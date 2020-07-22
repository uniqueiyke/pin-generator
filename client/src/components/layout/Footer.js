import React from 'react'

export default function Footer(props) {
    return (
        <footer className='page-footer spacing-top grey darken-2'>
            {props.children}
        </footer>
    )
}
