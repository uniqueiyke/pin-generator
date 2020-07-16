import { 
    SCRATCH_CARD_FETCH_SUCCEEDED,
    SCRATCH_CARD_FETCH_FAILED,
    IS_FETCHING_CARDS,
    SCRATCH_CARD_CREATED,
    SCRATCH_CARD_CREATE_FAILED,
    SCRATCH_CARD_DELETED,
    PRINTED_CARDS_UPDATED,
    USER_LOGGED_OUT
 } from '../actions/action-types';


const initialState = {
    cards: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_FETCHING_CARDS:
            return{
                ...state,
                loading: true
            }
        case SCRATCH_CARD_FETCH_SUCCEEDED:
        case SCRATCH_CARD_CREATED:
        case PRINTED_CARDS_UPDATED:
           return {
                loading: false,
                error: null,
                cards: action.payload
           };
        
        case SCRATCH_CARD_FETCH_FAILED:
        case SCRATCH_CARD_CREATE_FAILED:
            return { 
                ...state,
                loading: false,
                error: action.payload
            };
        case SCRATCH_CARD_DELETED:
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.payload)
              };
        case USER_LOGGED_OUT:
            return {
                loading: false,
                error: null,
                cards: []
           };
        default:
            return state;
    }
}