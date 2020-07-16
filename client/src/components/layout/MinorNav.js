import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../redux/actions/user-action';
import useLogout from '../../hooks/useLogout';


export default function MinorNav({className}) {
    const { isAuthenticated } = useSelector(state => state.user);
    const logout = useLogout(logoutUser, '/')
    return (
        <ul  className="minor-nav">
        {
            isAuthenticated ? 
            <React.Fragment> 
                <li><Link to='/user/profile' className={`${className && className}  minor-nav-link`}>Profile</Link></li>
                <li><Link to='' className={`${className && className}  minor-nav-link`} onClick={logout}>Logout</Link></li>
            </React.Fragment>
            : 
            <React.Fragment>
                <li><Link to='/users/register' className={`${className && className}  minor-nav-link`}>Register</Link></li>
                <li><Link to='/users/login' className={`${className && className}  minor-nav-link`}>Login</Link></li>
            </React.Fragment>
        }
        </ul>
    )
}
