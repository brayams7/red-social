import React, { useState, useEffect , useContext, useCallback} from "react";
import {helpWhitTokenHttp} from '../../../api/helpWithTokenHttp'
import UserContext from "../../../../Context/UserContext";
const {get, post} = helpWhitTokenHttp()


const usePost = (blockComments,idPost) => {
    const [comments, setComments]=useState(null)
    const [likesUsers, setLikesUsers]=useState(null)
    const [errorsComponent, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [liked, setLiked] = useState({
        is_liked_for_me:null,
        value_initial:null
    })
    const {response, errors} = useContext(UserContext)
    const urlComments = `http://localhost:8000/api/posts/${idPost}/get_comments_post/`
    const urlLiksPost = `http://localhost:8000/api/posts/${idPost}/get_likes_posts/`
    
    

    const makeFetch = async ()=>{
        setLoading(true)
        let response = await get(urlComments) 
        if(!response.err){
            setErrors(null)
            setComments(response)
        }else{
            setErrors(response)
            setComments(null)
        }
        setLoading(false)
    }

    const getUsersLikes = async ()=>{
        let response = await get(urlLiksPost) 
        if(!response.err){
            setLikesUsers(response)
            setLiked({
                is_liked_for_me:response.is_liked_for_me,
                value_initial:response.is_liked_for_me
            })
            setErrors(null)
            console.log(response)
        }else{
            setErrors(response)
            setLikesUsers(null)
        }
    }


    useEffect(()=>{
        if(!blockComments){
            makeFetch()
        }
        getUsersLikes()
    },[urlComments, urlComments])

    useEffect(()=>{
        console.log('post')
    })

    const getComment = (comment)=>{
        let data = {
            message:comment,
            post:idPost
        }
        console.log(data)
        const makeFetchPost = async ()=>{
            setLoading(true)
            let response = await post(`http://localhost:8000/api/comments/`,{body:data}) 
            if(!response.err){
                makeFetch()
            }else{
                setErrors(response)
            }
            setLoading(false)
        }
        makeFetchPost()
    }

    const handleLike = useCallback(()=>{
        
        if(liked.is_liked_for_me){
            const newData = likesUsers.data.filter((user)=>user.id !== response.user.id)
            setLikesUsers(
                {
                    ...likesUsers,
                    data:newData
                }
            )
            setLiked({
                ...liked,
                is_liked_for_me:false
            })
        }else{
            setLikesUsers({
                ...likesUsers,
                data:[...likesUsers.data,{username:response.user.username, id:response.user.id}]
            })
            setLiked({
                ...liked,
                is_liked_for_me:true
            })
        }
    },[liked,response, likesUsers])

    useEffect(()=>{
        console.log('desmontaje')
        const add_like_post = async ()=>{
            const urlLikePost = `http://localhost:8000/api/posts/${idPost}/add_like_post/`
            let request = await post(urlLikePost,{body:{profile:response.user.id, like:liked.is_liked_for_me}})
            if(!request.err){
                console.log('se hizo la peticion de like')
            }
        }
        console.log('fasdfs','inicial', liked.value_initial,'actual',liked.is_liked_for_me)
        return ()=>{
            console.log('adios desmontaje')
            //console.log('fasdfs','inicial', liked.value_initial,'actual',liked.is_liked_for_me)
            if(liked.value_initial === liked.is_liked_for_me){
                console.log('se ejecutó el like')
                //add_like_post()
            }
        }
    },[])

    console.log('inicial', liked.value_initial,'actual',liked.is_liked_for_me)
    return {
        comments,
        getComment,
        likesUsers,
        is_liked:liked.is_liked_for_me,
        handleLike
    }
};

export default usePost;