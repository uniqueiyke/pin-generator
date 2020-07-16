import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { registerUser } from '../../redux/actions/user-action';

export default function UserRegForm() {
    const initialState = {
        email: '',
        username: '',
        password: '',
        rpassword: ''
    }

    const dispatch = useDispatch();
    const [userState, setUserState] = useState(initialState);
    const user = useSelector(state => state.user.user);
    
    const onChange = e => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = e => {
        dispatch(registerUser(userState));
        setUserState({ ...initialState });
        e.preventDefault();
    }

    return (
        <>
        {user && <Redirect to='/user/profile' />}
            <form method='POST' onSubmit={onSubmit} className="col s12">

                <div className="input-field col s12">
                    <input id="email" type="email"
                        className="validate" name="email"
                        onChange={onChange} required
                        value={userState.email}
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="input-field col s12">
                    <input id="username" type="text"
                        className="validate" name="username"
                        onChange={onChange} required
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

                <div className="input-field col s12">
                    <input id="rpassword" type="password"
                        className="validate" name="rpassword"
                        onChange={onChange} required
                        value={userState.rpassword}
                    />
                    <label htmlFor="rpassword">Confirm Password</label>
                    <span className="helper-text" 
                    data-error={`${userState.rpassword !== userState.password && 'password did not match'}`}
                    data-success= {`${userState.rpassword === userState.password && 'matched'}`}
                    ></span>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                </button>
            </form>

            <Link to='/users/login'>Login</Link>
        </>

    )
}