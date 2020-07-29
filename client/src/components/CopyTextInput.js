import React, { useRef } from 'react';

export default function CopyTextInput({ value }) {
    const inputRef = useRef()
    function copyText() {
        /* Select the text field */
        inputRef.current.select();
        inputRef.current.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");
    }
    return (
        <span className='copy-text'>
            <input
                className="input"
                type="text"
                value={value}
                ref={inputRef} 
                readOnly
            />
                    
            <button onClick={copyText} className="copy-btn"><i className="material-icons right">content_copy</i></button>
        </span>
    )
}
