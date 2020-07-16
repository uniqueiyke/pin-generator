import React from 'react';
import { useDispatch} from 'react-redux';
import { logoutUser, refreshApiKey } from '../../redux/actions/user-action';
import Preloader from '../Preloader';
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';
import checkAuth from '../CheckAuth';
import Errors from '../Contact';

function UserProfile({ user }) {
    const logout = useLogout(logoutUser, '/')
    const dispatch = useDispatch()
    const userDetails = () => {
        return (
            <ul className="collection">
                <li key='username' className="collection-item white darken-2">
                    <p>
                        <em className="orange-text">Username: </em>
                        <strong >{user.user.username}</strong>
                    </p>
                </li>
                <li key='email' className="collection-item white darken-2">
                    <p>
                        <em className=" orange-text ">Email: </em>
                        <strong >{user.user.email}</strong>
                    </p>
                </li>
                <li key='api_key' className="collection-item white darken-2">
                    <p>
                        <em className=" orange-text ">Api key: </em>
                        <strong >{user.user.api_key}      </strong>
                        <button className='btn blue darken-4' onClick={() => dispatch(refreshApiKey())}>Refresh Api Key</button>
                    </p>
                </li>
            </ul>
        )
    }
    

    return (
        <div>
            <Link to='/users/scratch-cards' className='btn'> Cardboard </Link>
            {user.isFetchingData && <Preloader />}
            {
                user.error
                    ? (<Errors errors={user.error} />)
                    :
                    <>
                        {user.user && userDetails()}
                    </>
            }
            <p className="flow-text">
                To fetch your generated card from another web app,
                use the url <br /> <span className='hilighted'>http://localhost:4545/api/get/cards/?api_key=&lt;your api key&gt;</span>.<br/>
                Repleace <span className='hilighted'>&lt;your api key&gt;</span> with your api key
            </p>
            {<button className='btn' onClick={() => logout()}>Logout</button>}
        </div>
    )
}

export default checkAuth(UserProfile);