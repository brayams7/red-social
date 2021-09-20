import React, { useState } from 'react';
import Form from './hooks/Form';
import {helpWhitTokenHttp} from '../../../api/helpWithTokenHttp'
import {useHistory} from 'react-router-dom'

let template ={
    title:"Cambio de contraseña",
    fields:[
        {
            title:"contraseña",
            type:"password",
            name:"password",
        },
        {
            title:"confirmar Contraseña",
            type:"confirm_password",
            name:"password_confirmation",
        }
    ]
}
let initalValues = {
    'password':"",
    "password_confirmation":""
}
const url = "http://localhost:8000/api/config-password-user/recoverd_password/"

const ChangePassword = (props)=>{
    const history = useHistory()
    
    const onSubmit = async (data)=>{
        const {post} = helpWhitTokenHttp()
        const newdata = {
            token:props.match.params?.token,
            ...data
        }
        let response = await post(url, {body:newdata})
        console.log('response',response)
        
        if(!response.err){
            history.push('/login')        
        }else if(response?.status === 400){
            history.push('/recovered_password')
        }
    }

    return(
        <React.Fragment>
            <Form template={template} onSubmit={onSubmit} initalValues={initalValues}/>
        </React.Fragment>
    )
}




export default ChangePassword