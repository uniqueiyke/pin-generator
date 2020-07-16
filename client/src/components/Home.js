import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logoutUser } from '../redux/actions/user-action';
import useLogout from '../hooks/useLogout';

import img1 from '../images/Scratch-Card.jpg';
import img2 from '../images/scratchcard.jpg';
import img3 from '../images/scratchcard1.jpg';
import img4 from '../images/scratchcard2.jpg';
import PageImage from './PageImage';

export default function Home() {
    const { isAuthenticated } = useSelector(state => state.user);
    const logout = useLogout(logoutUser, '/')
    return (
        <div className='background-cl white-text'> 
        <div>
            <h4>
                Pin Generator is a website that allows users to 
                generate pin codes and serial numbers they can use for their
                buisness
            </h4>
            <PageImage src={img1} alt='sample card image1' caption='Sample'>
                <p>Can be used for any type of buisness</p>
            </PageImage>
            <PageImage src={img2} alt='sample card image2' caption='Sample' />
            <PageImage src={img3} alt='sample card imag3' />
            <PageImage src={img4} alt='sample card image4' />

        </div>
        {
            isAuthenticated ? 
            <div> 
                <Link to='/user/profile' className='btn' >Profile</Link>
                <Link to='' className='btn' onClick={logout}>Logout</Link>
                </div>
            : 
            <div>
                <h3>Welcome</h3>
                <Link to='/users/register' className='btn'>Register</Link>
                <Link to='/users/login' className='btn green darken-2'>Login</Link>
            </div>
        }
        </div>
    )
}
