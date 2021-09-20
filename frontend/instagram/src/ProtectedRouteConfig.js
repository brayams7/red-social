import React from 'react';
import NavBar from './Components/Index/NavBar';
import Footer from './Components/Index/Footer'

import {Route, Redirect} from 'react-router-dom'
import {UserProvider} from './Context/UserContext'

const ProtectedRouteConfing = ({component:Component, ...rest}) => {
    const token = localStorage.getItem('Token') || ''
    
    return (
        <Route {...rest}>
            {
                token ?(
                    <UserProvider>
                        <NavBar />
                        <Component/>
                        <Footer/>
                    </UserProvider>
                ):(
                    <Redirect to="/login"/>
                )
            }
        </Route>
    );
};

export default ProtectedRouteConfing;