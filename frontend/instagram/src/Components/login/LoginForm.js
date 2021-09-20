import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

import {validators} from '../../Components/Utils/Forms/Form'
import Form from '../../Components/Utils/Forms/Form'
import { helpHttp } from '../api/helpHttp';
import { helpWhitTokenHttp } from '../api/helpWithTokenHttp';
import Message from '../Utils/message'


const LoginForm = () => {
    const [errors, setErrors]=useState(null)
    let history = useHistory()
    let {isRequerid} = validators()
    
    const onSubmit = (data)=>{
        let {post} = helpHttp()
        let {checkingLogin} = helpWhitTokenHttp()
        const makeFetch = async ()=>{
            console.log(data)
            let response = await post("http://localhost:8000/login/", {body:data})
            if(!response.err){
                console.log('error')
                checkingLogin(response)
                if(response.changed_first_profile){
                    history.push("/dashboard")
                }else{
                    history.push(`/profile/first_custome/${response.user.username}`)
                }
            }else{
                setErrors(response)
            }
        }
        makeFetch()
    }
    
    let template ={
        title:"Login",
        fields:[
            {
                title:"Usuario",
                type:"text",
                name:"username"
            },
            {
                title:"Contraseña",
                type:"password",
                name:"password"
            }
        ]
    }
    let initialForm ={
        username:"",
        password:""
    }


    return(
        <React.Fragment>
            <Form template={template} onSubmit={onSubmit} initialForm={initialForm} validators={isRequerid}/>
            {
                errors &&
                <Message message={errors.statusText} bgColor="#CA3C23"/>
            }
        </React.Fragment>
    )
};

export default LoginForm;