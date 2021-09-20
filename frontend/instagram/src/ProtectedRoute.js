import React from 'react';
import NavBar from './Components/Index/NavBar';
import {Route, Redirect} from 'react-router-dom'
import {UserProvider} from './Context/UserContext'

const ProtectedRoute = ({component:Component, ...rest}) => {
    const token = localStorage.getItem('Token') || ''
    
    /*let user = {}
    if(token){
        user = {
            username: localStorage.getItem('username') || '',
            name : localStorage.getItem('name') || '',
            last_name: localStorage.getItem('last_name') || ''
        }
    }*/

    return (
        <Route {...rest}>
            {
                token ?(
                        <UserProvider>
                            <NavBar/>
                            <Component/>
                        </UserProvider>        
                ):(
                    <Redirect to="login"/>
                )
            }
        </Route>
    );
};

export default ProtectedRoute;