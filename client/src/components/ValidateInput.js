import React from 'react'

export default function ValidateInput({clientErr, serverErr}) {
    const errMsg = clientErr || serverErr || null
    return (
        <div>
            {
                errMsg &&
                (<span className="helper-text red-text">
                    {errMsg}
                </span>)
            }
        </div>
    )
}
