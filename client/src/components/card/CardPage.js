import React from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';

import CardPageLink from './CardPageLink';

export default function CardPage({cards}) {
    const {id} = useParams()
    const params = parseInt(id);

    const computeNumOfPages = () =>{
        if(cards.length <= 0) return 0;
        const numOfPages = cards.length / 100;
        const numOfPagesToInt = Math.floor(numOfPages);
        const remNum = cards.length % 100;
        
        if(numOfPages > 0 && numOfPages < 1){
            return 1;
        }else if(remNum > 0){
            return numOfPagesToInt + 1;
        }            
        return numOfPagesToInt;
    }
 
    function *createLinks() {
        const numOfPages = computeNumOfPages();
        if(numOfPages < 1) return;
        let counter = 0;
        while (counter++ < numOfPages) {
            yield (<CardPageLink key={counter} pageNumber={counter} />)
        }
    }

    const getLinks = () => {
        const linksGen = createLinks();

        let link;
        let linkArray = [];
        do{
            link = linksGen.next();
            if(link.value !== undefined)
                linkArray.push(link.value);
        }
        while (link.done === false);
        return linkArray;
    }

    const links = getLinks();
    const numOfLinks = computeNumOfPages();
    return (
        <div>
            {!id && <Redirect to= "/users/scratch-cards/1"/> }
            <ul className="pagination">
                <li className={params > 1 ? "active" : "disabled"} key={-1}>
                    <Link 
                        to={
                            `/users/scratch-cards/${ params - 1 < 1 ? 1 :  params - 1 }`
                        }
                    >
                        <i className="material-icons">chevron_left</i>
                    </Link>
                </li>
                {links}
                <li className={params < numOfLinks ? "active" : "disabled"} key={-2}>
                    <Link 
                        to={
                            `/users/scratch-cards/${ params + 1 > numOfLinks ? numOfLinks :  params + 1 }`
                        }
                    >
                        <i className="material-icons">chevron_right</i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
