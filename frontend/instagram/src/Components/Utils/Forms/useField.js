import { useState} from 'react';

export const useForm = (initialForm, validators, onSumbit)=>{
    const [form, setForm] = useState()
    const [errors, setErrors]=useState({})

    const handleBlur = (e)=>{
        handleChange(e)
        setErrors(validators(e.target.name,e.target.value))
    }
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        onSumbit(form)
    }
    return{
        form,
        errors,
        handleBlur,
        handleChange,
        handleSubmit
    }
}