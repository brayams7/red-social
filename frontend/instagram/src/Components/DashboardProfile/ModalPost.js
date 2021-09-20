import React, { useEffect, useState} from 'react';
import './style.css'
import CommentUser from '../Utils/comments/CommentUser';

const palabrasErroneas = ['put','mier','mamahuevo','cerot']
const handleErros = (text)=>{
    let listText = text.split(' ')
    let erros = []

    for (const value of listText) {
        if(value === (palabrasErroneas[0]||palabrasErroneas[1]||palabrasErroneas[2]||palabrasErroneas[3])){
            erros.concat('palabras inadeacuadas de utilizar')
        }
    }

    return erros
}

const ModalPost = ({photo, 
    description,
    likes, 
    commentsPost,
    onSubmit,
    is_liked,
    handleLike
    }) => {
    
    const [commentForm, setCommentForm] = useState("")
    const [errorsComment, setErrosComment] = useState([])

    const handleChange=(e)=>{
        setCommentForm(
            e.target.value
        )
    }


    const handleSubmit = ()=>{
        const handleErrors = handleErros(commentForm)
        if(handleErrors.length === 0){
            let c = commentForm
            setCommentForm("")
            onSubmit(c)
        }else{
            setErrosComment(handleErros)
        }
    }
    useEffect(()=>{
        console.log('modal post')
    })

    return (
        <div className="container">
            <div className="card mb-3" style={{maxWidth:540}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={photo && `http://localhost:8000${photo}`} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="card-text">
                                <p className="text-muted">
                                    {description}
                                </p>
                            </div>
                            <div className="row container-scroll">
                            {
                                commentsPost &&(
                                        commentsPost?.count !== 0 &&(
                                            commentsPost.results?.map((comment)=>{
                                                return(
                                                    <CommentUser 
                                                    username={comment.profile?.username}  
                                                    key={comment.id}
                                                    likesMessage={comment.likes}
                                                    message={comment.message}
                                                />
                                                )
                                                
                                           }) 
                                        )
                                    )
                                }
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    <button style={{background:is_liked && 'red'}} onClick={handleLike}>
                                        <span className="material-icons">
                                            favorite_border
                                        </span>
                                    </button>
                                    {likes}
                                </div>
                                <div className="col-md-6 text-center">
                                    <span className="material-icons">
                                        comment
                                    </span>
                                    {commentsPost?.count}
                                </div>
                            </div>
                            
                            <div className="row">
                                {
                                    commentsPost &&(
                                        <React.Fragment>
                                            <div className="col-md-9">
                                                <input type="text" name="comment" onChange={handleChange} value={commentForm} className="form-control"/>
                                            </div>
                                            <div className="col-md-3">
                                                <button 
                                                    onClick={handleSubmit} 
                                                    className="btn btn-light"
                                                    disabled = {!commentForm && 'disabled'}
                                                >
                                                    publicar
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    ) 
                                }
                                
                                {
                                    errorsComment?.length !== 0 &&(
                                        <p> {errorsComment[0]}</p>
                                    ) 
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPost;