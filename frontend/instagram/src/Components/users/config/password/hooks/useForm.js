import { useState } from "react";
import { validators } from "./validators";

export const useForm = (initialState, onSubmit) => {
    const [form, setForm] = useState(initialState)
    const [errors, setErrors] = useState({})

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleBlur = (e, extra=null) => {
        handleChange(e)
        let error = validators(e.target.name, e.target.value,extra)
        setErrors(
            {
                ...errors,
                [e.target.name]:error
            }
        )
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        onSubmit(form)
    }

    return{
        handleChange,
        handleBlur,
        handleSubmit,
        form,
        errors
    }

    
};

