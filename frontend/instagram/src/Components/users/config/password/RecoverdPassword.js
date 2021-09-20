import React, { useState } from 'react';
import { useForm } from './hooks/useForm';
import {helpWhitTokenHttp} from '../../../api/helpWithTokenHttp'


const RecoverdPassword = () => {
    const [form , setForm] = useState({email:""})
    const [errorsApi, setErrosApi] = useState({}) 
    const [response, setResponse] = useState("")
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const onSubmit = async ()=>{
            const url = "http://localhost:8000/api/config-password-user/email_recoverd_password/"
        
            const {post} = helpWhitTokenHttp()
                let response = await post(url, {body:form})
                console.log(response)
                if(!response.err){
                    setResponse('Se envió correo de recuperación')        
                }else{
                    setErrosApi(response)
                }
        }
        onSubmit()
    }

    return (
        <div>
            <h3>
                para recupera su contraseña debe agregar su correo
            </h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">
                        emal
                    </label>
                    <input 
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Correo electronico"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    enviar
                </button>
            </form>
            <p>
                {response
                    &&
                    (
                        response
                    )
                }
            </p>
        </div>
    );
};

export default RecoverdPassword;