import { 
    SCRATCH_CARD_FETCH_SUCCEEDED, 
    SCRATCH_CARD_FETCH_FAILED,
    SCRATCH_CARD_DETAILS,
    IS_FETCHING_CARDS,
    SCRATCH_CARD_CREATED,
    SCRATCH_CARD_CREATE_FAILED,
    SCRATCH_CARD_DELETED,
    SCRATCH_CARD_DELETE_FAILED,
    PRINTED_CARDS_UPDATED
 } from './action-types';

import axios from 'axios';
import tokenConfig from './token-config';
import errorParser from '../error-parser';

export const scratchCardSuccess = data => ({
    type: SCRATCH_CARD_FETCH_SUCCEEDED,
    payload: data
});

export const scratchCardCreated = data => ({
    type: SCRATCH_CARD_CREATED,
    payload: data
});

export const scratchCardCreateFailed = error => ({
    type: SCRATCH_CARD_CREATE_FAILED,
    payload: error
});

export const scratchCardDeleted = id => ({
    type: SCRATCH_CARD_DELETED,
    payload: id
});

export const scratchCardFetchFailed = error => ({
    type: SCRATCH_CARD_FETCH_FAILED,
    payload: error
});

export const isfetchingData = () => ({ type: IS_FETCHING_CARDS });

export const scratchCardDetails = id => ({
    type: SCRATCH_CARD_DETAILS,
    payload: id
})

export const deleteFailed = error => ({
    type: SCRATCH_CARD_DELETE_FAILED,
    payload: error
})


const printedCardsUpdated = data => ({
    type: PRINTED_CARDS_UPDATED,
    payload: data
})

export const fetchScratchCard = () =>   async dispatch => {
    dispatch(isfetchingData());
    try {
        const res = await axios({
            url: '/api/cards',
            method: 'GET',
            headers: tokenConfig('application/json')
        })
        dispatch(scratchCardSuccess(res.data));
    } catch (error) {
        dispatch(scratchCardFetchFailed(errorParser(error)));
    }
}

export const updatePritedScratchCard = data => async dispatch => {
    try {
        const res = await axios({
            url: '/api/update/cards',
            method: 'POST',
            data: data,
            headers: tokenConfig('application/json')
        });
        
        dispatch(printedCardsUpdated(res.data));
    } catch (error) {
        console.log(errorParser(error));
    }
}

export const createScratchCard = data => async dispatch => {
    dispatch(isfetchingData());
    try {
        const res = await axios({
            url: '/api/create/cards',
            method: 'POST',
            data: data,
            headers: tokenConfig('application/json')
        });
        dispatch(scratchCardCreated(res.data));
    } catch (error) {
        dispatch(scratchCardCreateFailed(errorParser(error)));
    }
}

export const deleteScratchCard = id => async dispatch => {
    try {
        const res = await axios({
            url: `/api/delete/card/${id}`,
            method: 'DELETE',
            headers: tokenConfig('application/json')
        });
        if(res){
            dispatch(scratchCardDeleted(id))
        }else{
            console.log("chouldn't delete");
        }
    } catch (error) {
        dispatch(deleteFailed(errorParser(error)));
    }
}

// const fetchData = () => {
//     fetch('http://localhost:4545/api/get/cards/?api_key=Rw33JWHpELYMQb8')
//     .then(res => res.json()
//     .then(cards => {console.log(cards)}))
//     .catch(err => console.log(err));
// }