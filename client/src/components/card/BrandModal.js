import React, { useState} from 'react';
import useInitMatComponent from '../../hooks/useInitMatComponent';


export default function BrandModal({dispatch}) {
    const initialState = {
        brand_name: '',
        website: '',
        email: '',
        brief_description: ''
    };

    const brandModalRef = useInitMatComponent('Modal','.modal');
    const [brandMessage, setBrandMessage] = useState(initialState)
    const onChange = e => {
        setBrandMessage({ ...brandMessage, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        dispatch({
            type: 'BRAND_MESSAGE',
            payload: brandMessage
        });
        setBrandMessage({ ...initialState });
        brandModalRef.close();
        e.preventDefault();
    }

    return (
        <div>
            <button data-target="brand-modal" className="waves-effect waves-light btn modal-trigger" >
                Add Brand Message
            </button>
            <div id="brand-modal" className="modal">
                <div className="modal-content">
                    <form onSubmit={onSubmit} className="col s12">

                        <div className="input-field col s12">
                            <input id="brand_name" type="text"
                                className="validate" name="brand_name"
                                onChange={onChange} required
                                value={brandMessage.brand_name}
                            />
                            <label htmlFor="brand_name">Brand Name</label>
                        </div>

                        <div className="input-field col s12">
                            <input id="website" type="text"
                                className="validate" name="website"
                                onChange={onChange}
                                value={brandMessage.website}
                            />
                            <label htmlFor="website">Website</label>
                        </div>

                        <div className="input-field col s12">
                            <input id="email" type="text"
                                className="validate" name="email"
                                onChange={onChange}
                                value={brandMessage.email}
                            />
                            <label htmlFor="email">Email </label>
                        </div>

                        <div className="input-field col s12">
                            <textarea id="brief_description" type="number"
                                className="validate materialize-textarea" name="brief_description"
                                onChange={onChange}
                                value={brandMessage.brief_description}
                            ></textarea>
                            <label htmlFor="brief_description">Brief Description</label>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit" name="action">
                               Add
                        </button>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">X</button>
                </div>
            </div>
        </div>
    )
}
