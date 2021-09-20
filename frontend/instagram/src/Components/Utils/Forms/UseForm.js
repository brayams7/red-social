import React from 'react';
import Form from './Form';
import { validators } from './Form';

const UseForm = ()=>{
    let {isRequerid} = validators()
    let template ={
        title:"registro estudiantes",
        fields:[
            {
                title:"firstName",
                type:"text",
                name:"fistName"
            },
            {
                title:"emal",
                type:"email",
                name:"email"
            }
        ]
    }
    let initialForm ={
        firstName:"",
        emal:""
    }
    return(
        <React.Fragment>
            <Form template={template} onSubmit={onSubmit} initialForm={initialForm} validators={isRequerid}/>
        </React.Fragment>
    )
}

const onSubmit = (data)=>{
    console.log(data)
}


export default UseForm;