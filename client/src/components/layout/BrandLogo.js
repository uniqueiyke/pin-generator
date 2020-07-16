import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo() {
    return (
        <div className="brand-logo-container">
            <Link to="/" className="brand-logo white-text">PinGen</Link>
        </div>
    )
}
