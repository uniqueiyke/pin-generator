import React from 'react'

export default function PageImage({src, alt, children, caption}) {
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src={src} alt={alt} />
                        <span className="card-title">{caption}</span>
                    </div>
                    <div className="card-content background-cl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
