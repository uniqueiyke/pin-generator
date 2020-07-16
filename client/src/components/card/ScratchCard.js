import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteScratchCard } from '../../redux/actions/scratch-card-action';

const ScratchCard = ({ card, dispatch }) => {

    const [showCardDetails, setShowCardDetails] = useState(false);
    const dispatchDel = useDispatch();
    const setPrintable = e => {
        if (e.target.checked) {
            dispatch({
                type: 'ADD_TO_PRINTING',
                payload: e.target.id
            })
        } else {
            dispatch({
                type: 'REMOVE_FROM_PRINTING',
                payload: e.target.id
            })
        }
    }

    const cDetails = (
        <Fragment>
            <li className="collection-item teal darken-1"><p><em>Created Date:</em> <strong >{card.created_date}</strong></p></li>
            <li className="collection-item teal darken-1"><p><em>Allowable Number Of Usage:</em> <strong>{card.max_usage}</strong></p></li>
            <li className="collection-item teal darken-1"><p><em>Number Of Times Used:</em> <strong >{card.usage_count}</strong></p></li>
            <li className="collection-item teal darken-1"><p><em>Still Useabale:</em> <strong >{card.used_up ? 'No' : 'Yes'}</strong></p></li>
            <li className="collection-item teal darken-1"><p><em>Has Been Printed:</em> <strong >{card.printed ? 'Yes' : 'No'}</strong></p></li>
        </Fragment>
    )

    return (
        <div>
            <div className="row">
                <div className="col s12 m8 l6">
                    <div className="card teal darken-1">
                        <div className="card-content white-text">
                            <ul className="collection">
                                <li className="collection-item teal darken-1"><p><em>Pin:</em> <strong >{card.card_pin}</strong></p></li>
                                <li className="collection-item teal darken-1"><p><em>Serial Number:</em> <strong>{card.card_ser_num}</strong></p></li>
                                <li className="collection-item teal darken-1"><p><em>Used By Someone:</em> <strong >{card.used ? 'Yes' : 'No'}</strong></p></li>
                                {showCardDetails && cDetails}
                            </ul>
                        </div>
                        <div className="card-action">
                            <div className={`check-wrapper ${card.printed ? 'check-wrapper-disabled' : 'check-wrapper-active'}`} >
                                <label className="teal-text">
                                    <input 
                                    id={card._id} 
                                    type="checkbox"  
                                    defaultChecked={card.printed ? true : false} 
                                    className="filled-in" 
                                    onClick={setPrintable} 
                                    disabled={card.printed && "disabled"}
                                     />
                                    <span className={`${card.printed && 'cursor-disabled'}`}>{`${card.printed ? 'Printed' :'Select for Printing'}`}</span>
                                </label>
                            </div>
                            <button className='btn-link-to-no-dest' onClick={() => setShowCardDetails(!showCardDetails)}>{showCardDetails ? 'Show Less' : 'Card Details'}</button>
                            <button className="waves-effect waves-light btn btn-small red darken-2 right" onClick={() => dispatchDel(deleteScratchCard(card._id))} >
                                <i className="material-icons right">delete</i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ScratchCard;

ScratchCard.propTypes = {
    card: PropTypes.object.isRequired
}