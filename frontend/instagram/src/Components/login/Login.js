import React from 'react';
import instgram from './images/instagram.png'
import LoginForm from './LoginForm';
const Login = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="card mb-3" style={{maxWidth:540}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                        <img src={instgram} className="img-fluid rounded-start" alt="instagram"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title text-center">instagram</h5>
                                <LoginForm/>
                                <div className="card">
                                    <div className="card-body">
                                        Haz olvidado tu <a href="/">contraseña?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;