import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createScratchCard } from '../../redux/actions/scratch-card-action';
export default function CreateCards() {

    const initialState = {
        pin_length: '',
        serial_num_length: '',
        serial_num_prefix: '',
        num_of_cards: ''
    }

    const history = useHistory()
    const dispatch = useDispatch();
    const [cardState, setCardState] = useState(initialState)

    const onChange = e => {
        setCardState({ ...cardState, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        dispatch(createScratchCard(cardState));
        setCardState({ ...initialState });
        history.push('/users/scratch-cards');
        e.preventDefault();
    }
    return (
        <div>
            <div className='spacing-bottom'>

                <ul className="collection with-header">
                    <li className="collection-header">
                        <h4>
                            To generate card pins and serial numbers, provide these
                            infomations in the form below.
                        </h4>
                    </li>
                    <li className="collection-item">
                        <h5>Pin Length</h5>
                        <p>
                            The number of digits for each pin number. example: 12. 
                        </p>
                    </li>
                    <li className="collection-item">
                        <h5>Serial Number Length</h5>
                        <p>
                            The number of digits for each serial number. Example 15.
                        </p>
                    </li>
                    <li className="collection-item">
                        <h5>Serial Number Prefix</h5>
                        <p>
                            This should be the few characters that should prefix
                            the digits in the serial number.
                        </p>
                        <h5>Note:</h5> 
                        <p>
                            The number of digits for the serial number 
                            should be at least three (3) longer than theprefix length.<br/>
                            Example: If the serial number should total of 7 charaters long,
                            then the prefix should be at most 4 character long.
                        </p>
                    </li>
                    <li className="collection-item">
                        <h5>Number of Cards</h5>
                        <p>
                            Specify the number of pins and corresponding 
                            serial numbers you want to generate.
                        </p>
                    </li>
                </ul>
            </div>
            <div className="">
                <form method='POST' onSubmit={onSubmit} className="col s12">

                    <div className="input-field col s12">
                        <input id="pin_length" type="number"
                            className="validate" name="pin_length"
                            min="8" max="20" onChange={onChange} required
                            value={cardState.pin_length}
                        />
                        <label htmlFor="pin_length">Pin Length</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="serial_num_length" type="number"
                            className="validate" name="serial_num_length"
                            min="5" max="25" onChange={onChange} required
                            value={cardState.serial_num_length}
                        />
                        <label htmlFor="serial_num_length">Serial Number Length</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="serial_num_prefix" type="text"
                            className="validate" name="serial_num_prefix"
                            onChange={onChange}
                            value={cardState.serial_num_prefix}
                        />
                        <label htmlFor="serial_num_prefix">Serial Number Prefix</label>
                    </div>

                    <div className="input-field col s12">
                        <input id="num_of_cards" type="number"
                            className="validate" name="num_of_cards"
                            min="10" max="500" step="10" onChange={onChange} required
                            value={cardState.num_of_cards}
                        />
                        <label htmlFor="num_of_cards">Number Of Cards</label>
                    </div>

                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
            <Link to='/users/scratch-cards' className='btn orange spacing-top'>Cards</Link>
        </div>
    )
}
