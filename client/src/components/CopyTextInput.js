import React, { useRef } from 'react';

export default function CopyTextInput({ inputComponent, children }) {
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
            {
                inputComponent === 'textarea' ? (
                    <textarea className="input" ref={inputRef} defaultValue={children} readOnly></textarea>
                ) : (
                        <input
                            className="input"
                            type="text"
                            defaultValue={children}
                            ref={inputRef} 
                            readOnly
                            />
                    )
            }
            <a onClick={copyText} href="#!" className="secondary-content"><i className="material-icons right">content_copy</i></a>
        </span>
    )
}
