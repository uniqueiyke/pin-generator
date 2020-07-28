import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { registerUser } from '../../redux/actions/user-action';
import validateInput from '../../libs/validateInput';
import ValidateInput from '../ValidateInput';

export default function UserRegForm() {
    const initialState = {
        email: '',
        username: '',
        password: '',
        rpassword: ''
    }

    const dispatch = useDispatch();
    const [userState, setUserState] = useState(initialState);
    const {user, error} = useSelector(state => state.user);
    const [formErr, setFormErr] = useState(null);
    const ref = useRef()
    if(error){
       ref.current = error.message; 
    }
    
    const onChange = e => {
        setUserState({
            ...userState,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        setFormErr(null);
        const valErr = validateInput(userState);
        if(JSON.stringify(valErr) !== '{}'){
            setFormErr(valErr);
            return;
        }
        dispatch(registerUser(userState));
        setUserState({ ...initialState });
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
                    {(formErr || ref.current) && <ValidateInput clientErr={(formErr && formErr.email) ? formErr.email : ''} serverErr={(ref.current && ref.current.email) ? ref.current.email : ''}/> }
                </div>

                <div className="input-field col s12">
                    <input id="username" type="text"
                        className="validate" name="username"
                        onChange={onChange} required
                        value={userState.username}
                    />
                    <label htmlFor="username">Username</label>
                    {(formErr || ref.current) && <ValidateInput clientErr={(formErr && formErr.username) ? formErr.username : ''} serverErr={(ref.current && ref.current.username) ? ref.current.username : ''}/> }
                    </div>

                <div className="input-field col s12">
                    <input id="password" type="password"
                        className="validate" name="password"
                        onChange={onChange} required
                        value={userState.password}
                    />
                    <label htmlFor="password">Password</label>
                    {(formErr || ref.current) && <ValidateInput clientErr={(formErr && formErr.password) ? formErr.password : ''} serverErr={(ref.current && ref.current.password) ? ref.current.password : ''}/> }
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
                    {(formErr || ref.current) && <ValidateInput clientErr={(formErr && formErr.misMatch) ? formErr.misMatch : ''} serverErr={(ref.current && ref.current.misMatch) ? ref.current.misMatch : ''}/> }
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                </button>
            </form>

            <Link to='/users/login'>Login</Link>
        </>

    )
}