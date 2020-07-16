import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useInitMatComponent from '../../hooks/useInitMatComponent'
import { createScratchCard } from '../../redux/actions/scratch-card-action';

export default function CardModal() {
    const initialState = {
        pin_length: '',
        serial_num_length: '',
        serial_num_prefix: '',
        num_of_cards: ''
    }

    const dispatch = useDispatch();

    const modalRef = useInitMatComponent('Modal','.modal');

    const [cardState, setCardState] = useState(initialState)

    const onChange = e => {
        setCardState({ ...cardState, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        dispatch(createScratchCard(cardState));
        setCardState({ ...initialState });
        modalRef.close();
        e.preventDefault();
    }

    return (
        <div>
            <button data-target="card-modal" className="waves-effect waves-light btn modal-trigger" >
                Create Cards
            </button>
            <div id="card-modal" className="modal">
                <div className="modal-content">
                    <form method='POST' onSubmit={onSubmit} className="col s12">

                        <div className="input-field col s12">
                            <input id="pin_length" type="number"
                                className="validate" name="pin_length"
                                min="10" max="20" onChange={onChange} required
                                value={cardState.pin_length}
                            />
                            <label htmlFor="pin_length">Pin Length</label>
                        </div>

                        <div className="input-field col s12">
                            <input id="serial_num_length" type="number"
                                className="validate" name="serial_num_length"
                                min="12" max="25" onChange={onChange} required
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
                                min="100" max="1000" step="10" onChange={onChange} required
                                value={cardState.num_of_cards}
                            />
                            <label htmlFor="num_of_cards">Number Of Cards</label>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
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

