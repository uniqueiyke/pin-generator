import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../redux/actions/user-action';
import useLogout from '../../hooks/useLogout';


export default function MinorNav({className, sideNav}) {
    const { isAuthenticated } = useSelector(state => state.user);
    const logout = useLogout(logoutUser, '/')
    return (
        <ul  className="minor-nav">
        {
            isAuthenticated ? 
            <React.Fragment> 
                <li><Link to='/user/profile' className={`${className && className}  minor-nav-link`}>{sideNav && <i className="material-icons green-text text-darken-4">person</i>}Profile</Link></li>
                <li><Link to='' className={`${className && className}  minor-nav-link`} onClick={logout}>{sideNav && <i className="material-icons green-text text-darken-4"></i>}Logout</Link></li>
            </React.Fragment>
            : 
            <React.Fragment>
                <li><Link to='/users/register' className={`${className && className}  minor-nav-link`}>{sideNav && <i className="material-icons green-text text-darken-4"></i>}Register</Link></li>
                <li><Link to='/users/login' className={`${className && className}  minor-nav-link`}>{sideNav && <i className="material-icons green-text text-darken-4"></i>}Login</Link></li>
            </React.Fragment>
        }
        </ul>
    )
}
