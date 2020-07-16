import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// import { fetchUser } from '../redux/actions/user-action';



export default function AuthRoute ({ children, ...rest }) {
  const {isAuthenticated} = useSelector(state => state.user);
  
  return (
    <Route
      {...rest}
      render={({ location }) => 
      isAuthenticated  ? (
          children
        ) 
        : (
          <Redirect
            to={{
              pathname: "/users/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


