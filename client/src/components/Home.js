import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { logoutUser } from '../redux/actions/user-action';
import useLogout from '../hooks/useLogout';

import img1 from '../images/Scratch-Card.jpg';
import img2 from '../images/scratchcard.jpg';
import img5 from '../images/edc-front.jpg';
import img6 from '../images/edc-back.jpg';
import img7 from '../images/airtel.jpg';
import img3 from '../images/scratchcard1.jpg';
import img4 from '../images/scratchcard2.jpg';
import PageImage from './PageImage';

export default function Home() {
    const { isAuthenticated } = useSelector(state => state.user);
    const logout = useLogout(logoutUser, '/')
    return (
        <div> 
        <div>
            <h5>
                Pin Generator is a website that allows users to 
                generate pin codes and serial numbers they can use for their
                buisness
            </h5>
            {
                !isAuthenticated &&
                (<p className='flow-text'>
                    To generate pins and serial numbers for your buisness
                    you have to <Link to='/users/register'>sign up</Link> for free to our website 
                    or <Link to='/users/login'>login</Link> if you already have an account.
                </p>)
            }
            <PageImage src={img1} alt='sample card image1' caption='Sample'>
                <p>Can be used for any type of buisness</p>
            </PageImage>
            <PageImage src={img5} alt='sample card image2' caption='Sample' >
                <p>Easy to use follow the guides</p>
            </PageImage>
            <PageImage src={img6} alt='sample card image2' caption='Sample'>
                <p>Grow your buisness today</p>
            </PageImage>
            <PageImage src={img7} alt='sample card image2' caption='Sample'>
                <p>Get pin numbers for your buisness</p>
            </PageImage>
            <PageImage src={img2} alt='sample card image2' caption='Sample'>
                <p>Can be used for any type of buisness</p>
            </PageImage>
            <PageImage src={img3} alt='sample card imag3'>
                <p>Can be used for any type of buisness</p>
            </PageImage>
            <PageImage src={img4} alt='sample card image4'>
                <p>Can be used for any type of buisness</p>
            </PageImage>

        </div>
        {
            isAuthenticated ? 
            <div> 
                <Link to='/user/profile' className='btn' >Profile</Link>
                <Link to='' className='btn green darken-2 right' onClick={logout}>Logout</Link>
                </div>
            : 
            <div>
                <Link to='/users/register' className='btn'>Sign up</Link>
                <Link to='/users/login' className='btn green darken-2 right'>Login</Link>
            </div>
        }
        </div>
    )
}
