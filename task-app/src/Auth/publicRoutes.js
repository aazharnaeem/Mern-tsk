import React from 'react';
import { Route, Navigate } from 'react-router-dom';
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const token = localStorage.getItem('accessToken')
    
    let isLogedIn = false
    if(token){
        isLogedIn = true
    }


    return (
        <Route {...rest} render={props => (
            isLogedIn && restricted ?
                <Navigate to="/home" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;