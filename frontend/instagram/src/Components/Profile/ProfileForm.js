import React, { useState } from 'react';
import Loader from '../Utils/Loader'
const ProfileForm = ({onSumbitData,loading}) => {
    const [form, setForm] = useState({
        picture:"",
        biograpy:"",
        phone_number:""
    })
    //const [errors, setErrors]=useState({})
    
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const hanldeChangeImage = (e)=>{
        console.log(e)
        setForm({
            ...form,
            [e.target.name]:e.target.files[0]
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const f = new FormData()
        f.append("biograpy", form.biograpy)
        f.append("phone_number", form.phone_number)
        f.append("picture",form.picture)
        onSumbitData(f)
        handleReset()
    }

    const handleReset = ()=>{
        setForm({
            picture:"",
            biograpy:"",
            phone_number:""
        })
    }
    return (
        <div className="text-center">
            <form name="profileForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="picture" className="form-label">Foto de perfil</label>
                    <input name="picture" type="file" className="form-contro" onChange={hanldeChangeImage} required/>
                </div>
                <div className="form-group">
                    <textarea name="biograpy" className="form-control" placeholder="Biografia..." id="biograpy" onChange={handleChange} value={form.biograpy} required></textarea>
                    <label htmlFor="biograpy">Biografia</label>
                </div>

                <div className="form-group">
                    <input name="phone_number" type="text" className="form-control" placeholder="numero telefonico" onChange={handleChange} value={form.phone_number} required/>
                    <label htmlFor="phone_number">Numero de telefono</label>
                </div>
                <input type="submit" className="btn btn-success" value="subir"/>
                <input type="button" className="btn btn-primary" onClick={handleReset} value="reset"/>
            </form>
            {loading &&
                <Loader/>
            }
        </div>
    );
};

export default ProfileForm;