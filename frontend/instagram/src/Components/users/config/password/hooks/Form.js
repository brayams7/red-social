import React from 'react';
import { useForm } from './useForm';

const Form = ({template, initalValues, onSubmit}) => {
    const {handleChange, handleBlur, handleSubmit, form, errors} = useForm(initalValues, onSubmit)

    const renderFields = (fields)=>{
    
        return fields.map((el, i)=>{
            const {title, type, name} = el
            return(
                <React.Fragment key={i}>
                    {type==="text" &&
                        <div>
                            <label>
                                {title}
                            </label>
                            <input
                                type={type}
                                name={name}
                                placeholder={name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={form[name]}
                            />
                            <div>
                                {
                                    errors[name] &&(
                                        <p className="text-danger">
                                            {errors[name]}
                                        </p>
                                    )
                                }
                                
                            </div>
                        </div>
                        
                    }
                    {type ==="password" &&
                        <div>
                            <label>
                                {title}
                            </label>
                            <input
                                type={type}
                                name={name}
                                placeholder={name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={form[name]}
                            />
                            <div>
                                {
                                    errors[name] &&(
                                        <p className="text-danger">
                                            {errors[name]}
                                        </p>
                                    )
                                }
                                
                            </div>
                        </div>
                        
                    }
                    {type ==="confirm_password" &&
                        <div>
                            <label>
                                {title}
                            </label>
                            <input
                                type="password"
                                name={name}
                                placeholder={name}
                                onChange={handleChange}
                                onBlur={(e)=>handleBlur(e, form['password'])}
                                value={form[name]}
                            />
                            <div>
                                {
                                    errors[name] &&(
                                        <p className="text-danger">
                                            {errors[name]}
                                        </p>
                                    )
                                }
                                
                            </div>
                        </div>
                        
                        
                    }

                </React.Fragment>
            )
        })
    
    }

    return (
        <div>
            <h3>
                {template.title}
            </h3>
            <form onSubmit={handleSubmit}>
                {renderFields(template?.fields)}
                <button type="submit" className="btn btn-primary">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Form;