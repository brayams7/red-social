import React from 'react';
//import { useForm } from 'react-hook-form';
import {useForm} from './useField'


export const validators = () =>{
    let errors = {}
    const isRequerid = (name,value)=>{
        //console.log(value)
        if((!value || value.trim().length === 0)){
            errors[name]="El campo es requerido"
        }
        else{
            errors[name] = ""
        }
        return errors
    }

    const isEmail = (name,value)=>{
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        const result = isRequerid(value)
        if(!result){
            if(!regexEmail.test(value)){
                errors[name]="El campo es requerido"
                return errors
            }else return false
        }else{
            return result
        }
    }

    const isNumber = (name,value)=>{
        let regexNumber = /^[0-9]+$/
        const result = isRequerid(value)
        if(!result){
            if(!regexNumber.test(value)){
                
                errors[name]="El campo es requerido"
                return errors
                
            }else return false
        }else return result
    }

    return{
        isRequerid,
        isEmail,
        isNumber
    }
}

const Form = ({template, onSubmit, initialForm, validators})=>{
    //let {register, handleSubmit} = useForm();
    const {form, handleChange, handleSubmit, handleBlur, errors} = useForm(initialForm, validators, onSubmit)
    let {title, fields} = template
    
    const renderFields = (fields)=>{
        return fields.map(el=>{
            let {type, name, title} = el
            return(
                <React.Fragment key={name}>
                    {type === "text" &&
                        (
                        <div key={name}>
                            <label className="form-label" htmlFor={title}>{title}</label>
                            <input 
                                required 
                                type="text" 
                                name={name} 
                                id={name} 
                                className="form-control" 
                                placeholder={title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors[name] && (
                                    <span className="text-danger">
                                        {errors[name]}
                                    </span>) 
                                    
                                
                            }
                        </div>
                        )
                    }
                    {type === "email" && (
                        <div key={name}>
                            <label className="form-label" htmlFor={title}>{title}</label>
                            <input 
                                required 
                                type="email" 
                                name={name} 
                                id={name} 
                                className="form-control" 
                                placeholder={title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                
                                />
                                {
                                    errors[name] && (
                                    <span className="text-danger">
                                        {errors[name]}
                                    </span>) 
                                
                                }
                                
                        </div>
                        )
                    }
                    {
                        type === "password" &&
                            (
                                <div key={name}>
                                    <label className="form-label" htmlFor={title}>{title}</label>
                                <input 
                                    required 
                                    type="password" 
                                    name={name} 
                                    id={name} 
                                    className="form-control" 
                                    placeholder={title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    {
                                        errors[name] && (
                                        <span className="text-danger">
                                            {errors[name]}
                                        </span>) 
                                    
                                    }
                            </div>
                            )
                        
                    }
                </React.Fragment> 
            )
            
        })
    }
    return(
        <React.Fragment>
            <div className="container">
                <h2 className="text-center">{title}</h2>
                <form onSubmit={handleSubmit}>
                    {renderFields(fields)}
                    <div className="d-grid gap-2 mt-3 mb-3">
                        <button className="btn btn-primary" type="sumbit">Button</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}


export default Form;