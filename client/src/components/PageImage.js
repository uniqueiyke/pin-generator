import React from 'react'

export default function PageImage({src, alt, children, caption}) {
    return (
        <div className="row">
            <div className="col s12 m8 offset-m2">
                <div className="card background-cl">
                    <div className="card-image">
                        <img src={src} alt={alt} />
                        <span className="card-title">{caption}</span>
                    </div>
                    <div className="card-content center white-text">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
