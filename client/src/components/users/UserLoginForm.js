import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { loginUser } from '../../redux/actions/user-action';

export default function UserLoginForm() {
    const initialState = {
        username: '',
        password: ''
    }
    const dispatch = useDispatch();
    const [userState, setUserState] = useState(initialState);
    const {user, error} = useSelector(state => state.user);
    
    const onChange = e => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = async e => {
        dispatch(loginUser(userState));
        setUserState({ ...initialState });
        e.preventDefault();
    }

    return (
        <>
            {user && <Redirect to='/user/profile' />}
            <form method='POST' onSubmit={onSubmit} className="col s12">
            {error && error.message && <p className='red-text'>{error.message}</p>}
                <div className="input-field col s12">
                    <input id="username" type="text"
                        className="validate" name="username"
                        min="13" max="17" onChange={onChange} required
                        value={userState.username}
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="input-field col s12">
                    <input id="password" type="password"
                        className="validate" name="password"
                        onChange={onChange} required
                        value={userState.password}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                </button>
            </form>

            <Link to='/users/register'>Sign Up</Link>
        </>

    )
}