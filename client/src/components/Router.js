import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Cards from './card/Cards';
import Page404 from './Page404';
import UserProfile from './users/UserProfile';
import UserLoginForm from './users/UserLoginForm';
import UserRegForm from './users/UserRegForm';
import AuthRoute from './AuthRoute';

export default function Router() {
    return (
        <div className='container'>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/contact">
                    <Contact />
                </Route>
                <AuthRoute exact path="/users/scratch-cards/:id?">
                    <Cards />
                </AuthRoute>
                <Route exact path="/users/login">
                <UserLoginForm />
                </Route>
                <Route exact path="/users/register">
                    <UserRegForm />
                </Route>
                <AuthRoute exact path="/user/profile">
                    <UserProfile />
                </AuthRoute>
                <Route path="*">
                    <Page404 />
                </Route>
            </Switch>
        </div>
    )
}
