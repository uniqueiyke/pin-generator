import React, {useReducer} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ScratchCard from './ScratchCard';
import { fetchScratchCard, updatePritedScratchCard } from '../../redux/actions/scratch-card-action';
import Preloader from '../Preloader';
import Errors from '../Errors';
import CardPage from './CardPage';
import { isEmptyArray, printCards } from '../../libs/functions';
import BrandModal from './BrandModal';


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_PRINTING':
            return([
                ...state,
                action.payload
            ]);
        case 'REMOVE_FROM_PRINTING':
            const newState = state.filter(id => id !== action.payload);
            return(newState);
        case 'PRINTED':
            return [];
        default:
            return state;
    }
}

const brandMsgReducer = (state, action) => {
    switch (action.type) {
        case 'BRAND_MESSAGE':
            return action.payload;
        case 'PRINTED':
            return {};
        default:
            return state;
    }
}

export default function Cards() {
    const cards = useSelector(state => state.cards);
    const dispatch = useDispatch();

    const [printableCards, dispatchPrintableCards] = useReducer(reducer, []);
    const [brandMsg, dispatchBrandMsg] = useReducer(brandMsgReducer, {});
    
    const {id} = useParams();
    const createCardsLists = () => {
        const pID = parseInt(id);
        const startIndex = (pID - 1) * 100;
        const endIndex = startIndex + 100;
        const arr = cards.cards.slice(startIndex, endIndex);
        return arr.map((cardItem) => {
            return <ScratchCard key={cardItem._id} card={cardItem} dispatch={dispatchPrintableCards}/>
        });
    }

    const print = async () => {
        try {
            await printCards(printableCards, cards.cards, brandMsg);
            dispatch(updatePritedScratchCard(printableCards));
            dispatchPrintableCards({type: 'PRINTED'});
            dispatchBrandMsg({type: 'PRINTED'});

        } catch (error) {
            console.log('print cancel');
        }
    }

    const cardList = createCardsLists();
    
    return (
        <div>
            <Link className='btn' to='/users/create-cards' >Create Cards</Link>
            <button className='btn' onClick={() => dispatch(fetchScratchCard())}>{ isEmptyArray(cardList) ? 'Fetch Cards' : 'Refresh'}</button>
            {cards.loading && <Preloader /> }
            {cards.error &&  <Errors errors={cards.error} /> }
            {!isEmptyArray(cards.cards) && <CardPage cards={cards.cards} /> }
            { cardList && cardList }
            {!isEmptyArray(printableCards) && <BrandModal dispatch={dispatchBrandMsg}/>}
            {!isEmptyArray(printableCards) && <button className='btn red darken-4' onClick={print}>
                <i className="material-icons right">print</i>Print 
            </button>}
            {!isEmptyArray(cards.cards) && <CardPage cards={cards.cards} /> }
        </div>
    )
}
