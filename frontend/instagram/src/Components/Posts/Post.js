import React, { useEffect, useState, useCallback } from 'react';
import PostForm from './PostForm';
import {useModal} from '../Utils/modals/useModal'
import PortalModal from '../Utils/modals/PortalModal'
import TagFriends from './TagFriends';
import {helpWhitTokenHttp} from '../api/helpWithTokenHttp'
import { useHistory } from 'react-router-dom';

const validationErrors = (form) =>{
    const errors = {}
    let regexDescription = /^.{1,250}/;
    
    if(!form.photo){
        errors.photo = "Agrega una foto"
    }

    if(!form.description.trim()){
        errors.description = "el campo es requerido"

    }
    
    if(!regexDescription.test(form.description)){
        console.log(form.description.length)
        errors.description = "El numero limite de letras es 250"
    }

    return errors
}

const Post = () => {
    const [form, setForm]=useState({
        photo:"",
        description:"",
        blockComments:true
    })
    const [tagFriends, setTagFriends] =useState([])
    const [loading, setLoading]=useState(false)
    const [errors, setErrors] = useState({})
    const [isOpenPortal, openPortal, closePortal] = useModal(false)
    const url="http://localhost:8000/api/posts/"
    let history = useHistory() 
    
    const handleSumbit=(e)=>{
        e.preventDefault()
        const f = new FormData()
        console.log(form)
        f.append("photo", form.photo)
        f.append("description", form.description)
        f.append("blockComments",form.blockComments)

        if(tagFriends){
            let ids = []
            for (const user of tagFriends) {
                ids.push(user.id)
            }
            f.append('tagFriends',ids)
        }
        const {postAttachments} = helpWhitTokenHttp()
        const makeFetch = async ()=>{
            setLoading(true)
            let res = await postAttachments(url,{body:f})
            if(!res.err){
                setLoading(true)
                history.push("/dashboard")
            }else{
                setLoading(false)
                setErrors(res)
            }
            
        }
        makeFetch()
        
    }
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    const handleChangeImage=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.files[0]
        })
    }

    //etiquetar amigos
    const handleTag = useCallback((user)=>{
        let encontrado = false
        if(tagFriends.length >= 0){
            for (const u of tagFriends) {
                if(user.id === u.id){
                    encontrado = true
                    break;
                }
            }
        }
        if(!encontrado){
            setTagFriends([...tagFriends, {"id":user.id, "username":user.username}])
        }
        
    },[tagFriends])

    //desetiquetar amigos
    const handleUntag = useCallback((id)=>{
        let newTags = tagFriends.filter((el)=>{
            return el.id !== id
        })
        console.log('amigos desetiquetados',newTags)
        setTagFriends(newTags)

    },[tagFriends])

    const handleBlur=(e)=>{
        if(e.target.name==="description"){
            handleChange(e)
        }else if(e.target.name === "photo"){
            handleChangeImage(e)
        }
        setErrors(validationErrors(form))
    }


    const handleReset=()=>{
        setForm({
            photo:"",
            description:"",
            blockComments:false,
            tagFriends:[]
            })
    }

    const activeComments=()=>{
        if(form.blockComments){
            setForm({
                ...form,
                blockComments:false
            })
        }else{
            setForm({
                ...form,
                blockComments:true
            })
        }
    }
    useEffect(()=>{
        console.log('post')
    })



    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">
                    <div className="row">
                        Nueva Foto
                    </div>
                    <div className="row">
                        <div>
                            <a className="nav-link dropdown-toggle text-center" href="/" id="configPost" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                config
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="configPost">
                                <li>
                                    {
                                        form.blockComments ?(
                                            <button className="dropdown-item text-success" onClick={activeComments}>
                                                comentarios activados
                                            </button>
                                        ):(
                                            <button className="dropdown-item text-danger" onClick={activeComments}>
                                                comentarios desactivados
                                            </button>
                                        )
                                    }
                                    </li>
                                <li><hr className="dropdown-divider"/></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="card-body">
                    <PostForm form={form} handleChange={handleChange} handleReset={handleReset} handleSumbit={handleSumbit} handleChangeImage={handleChangeImage} handleBlur={handleBlur} errors={errors}/>
                    

                </div>
                <div className="card-footer text-muted">
                    <div className="text-end">
                        <a type="button" onClick={openPortal}>
                            <span className="material-icons text-dark">group_add</span>
                        </a>
                        <PortalModal closeModal={closePortal} isOpenModal={isOpenPortal}>
                            <TagFriends handleTag={handleTag} tagFriends={tagFriends} handleUntag={handleUntag}/>
                        </PortalModal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;