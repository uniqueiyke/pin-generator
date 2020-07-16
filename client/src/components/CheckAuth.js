import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from '../redux/actions/user-action';

// import { Link } from 'react-router-dom';

const checkAuth = (WrappedComponenet) => {
    return function CheckAuth(props) {
        const user = useSelector(state => state.user);
    
        const dispatch = useDispatch();
        useEffect(() => {
            if(user.isAuthenticated && !user.user ){
                dispatch(fetchUser());
            }
        }, []);
        return <WrappedComponenet user={user} { ...props} />
    }
}

export default checkAuth;