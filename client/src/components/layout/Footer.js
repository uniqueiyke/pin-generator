import React from 'react'

export default function Footer(props) {
    return (
        <footer className='page-footer grey darken-2 spacing-y center'>
            {props.children}
        </footer>
    )
}
