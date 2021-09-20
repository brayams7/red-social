import React from 'react';
import PictureProfile from './PictureProfile';
import {Link} from 'react-router-dom'

const TopProfile = (
    {
        title,
        data
    }) => {
    
    return (
        <div className="container">
            <h4 className="text-center">
                {title}
            </h4>
            <div className="row">
                <div className="col-md-4">
                    {
                        data?.profile &&
                        <PictureProfile profile={data.profile}/>
                    }
                </div>
                <div className="col-md-8">
                    <div className="d-flex justify-content-center">
                        {
                            data && (
                                <React.Fragment>
                                    <section className="px-2">
                                        <button>publicaciones</button>
                                        <div className="text-center">
                                            {data.posts}
                                        </div>
                                    </section>
                                    <section className="px-2">
                                        <button>seguidores</button>
                                        <div className="text-center">
                                            {data.followers}
                                        </div>
                                    </section>
                                    <section className="px-2">
                                        <button>seguidos</button>
                                        <div className="text-center">
                                            {data.followed}
                                        </div>
                                    </section>
                                </React.Fragment>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="text-center">
                            {
                                data?.seguidor_o_seguido?.is_my_count ?(
                                    <React.Fragment>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <h2 className="text-muted">
                                                    {data?.profile?.username}
                                                </h2>
                                            </div>
                                            <div className="col-md-2">
                                                <button className="btn btn-light text-muted">Editar Perfil</button>
                                            </div>
                                            <div className="col-md-2">
                                                <a href="...">
                                                    <span className="material-icons">brightness_7</span>
                                                </a>
                                            </div>
                                        </div>
                                    </React.Fragment>

                                ):(
                                    data?.seguidor_o_seguido?.seguido ?(
                                        <React.Fragment>
                                            <div className="col-md-5">
                                                <h2 className="text-muted">
                                                    {data?.profile?.username}
                                                </h2>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-light text-muted">Enviar Mensaje</button>
                                            </div>
                                            <div className="col-md-2">
                                                <a href="/">
                                                    <span className="material-icons">settings_accessibility</span>
                                                </a>
                                            </div>
                                            <div className="col-md-2">
                                                <a href="/">
                                                    ...
                                                </a>
                                            </div>
                                        </React.Fragment> 
                                    ):(
                                        <React.Fragment>
                                            <div className="col-md-6">
                                                <h2 className="text-muted">
                                                    {data?.profile?.username}
                                                </h2>
                                            </div>
                                            <div className="col-md-4">
                                                <button className="btn btn-blue text-ligth">seguir</button>
                                            </div>
                                            <div className="col-md-2">
                                                <a href="/">
                                                    <span className="material-icons">settings_accessibility</span>
                                                </a>
                                            </div>
                                        </React.Fragment> 
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-first">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-dark" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        neuvo
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/post">Nueva Foto</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="/">Nueva Historia</Link></li>
                    </ul>
                </li>
            </ul>
            </div>
            <div className="d-flex justify-content-center">
                <section>
                    historia 1
                </section>
                <section>
                    historia 2
                </section>
                <section>
                    historia 3
                </section>
                <section>
                    historia 4
                </section>
            </div>
        </div>
    );
};
TopProfile.defaultProps={
    'title':"My perfil"
}

export default TopProfile;

