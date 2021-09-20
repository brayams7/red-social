import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import UserContext from '../../Context/UserContext';
const NavBar = () => {
    const {response, errors} = useContext(UserContext) 
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            
            <a className="nav-link" href="/">
                <span className="material-icons pr-3">forum</span>
            </a>
            <a className="nav-link" href="/">
                <span className="material-icons">home</span>
            </a>
            
            <a className="nav-link" href="/">
                <span className="material-icons">favorite_border</span>

            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perfil
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>{response &&
                        <Link to={`/profile/${response.user.username}`} className="dropdown-item">{response.user.username}</Link>
                    }</li>
                    <li><a className="dropdown-item" href="/">Configuracion</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="/">Cerrar Sesion</a></li>
                </ul>
                </li>
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
  </div>
</nav>
        </div>
    );
};

export default NavBar;