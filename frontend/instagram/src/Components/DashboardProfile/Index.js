import React, { useEffect, useState } from 'react';
import TopProfile from './TopProfile';
import Posts from './Posts';
import {helpWhitTokenHttp} from '../api/helpWithTokenHttp'
import Loader from '../Utils/Loader'
import Message from '../Utils/message'
import { useHistory, useParams } from 'react-router-dom';

const Index = (props) => {
    const [posts, setPosts] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dataTopProfile, setTopProfile] = useState(null)
    const history = useHistory()
    let {username} = useParams()
    
    const urlGetUserProfile =  `http://localhost:8000/users/user/profile/get_user_profile_dashboard/${username}/`
    
    useEffect(()=>{
        const {get} = helpWhitTokenHttp()
        const makeFetch= async ()=>{
            
            let response = await get(urlGetUserProfile)
            if(!response.err){
                setErrors(null)
                setTopProfile(response)
                
                const urlPosts = `http://localhost:8000/api/posts/${response?.profile?.username}/get_posts_user/`
                setLoading(true)

                let responsePosts = await get(urlPosts)
                if(!responsePosts.err){
                    setErrors(null)
                    setPosts(responsePosts)
                    console.log(responsePosts)
                    setLoading(false)
                }else if(responsePosts?.status === 404){
                    console.log('no existe el usuario-- posts')
                    history.push('/NotFound')
                }
                
            }else if(response?.status === 404){
                console.log('no existe el usuario-- profile')
                history.push('/NotFound')
            }
        }
        makeFetch()

    },[urlGetUserProfile])
    /*
    useEffect(()=>{
        const {get} = helpWhitTokenHttp()
        const makeFetch= async ()=>{
            setLoading(true)
            let response = await get(url)
            if(!response.err){
                setErrors(null)
                setPosts(response) 
            }else{
                setErrors(response)
                setPosts(null)
            }
            setLoading(false)
        }
        makeFetch()

    },[url])
    */
    useEffect(()=>{
        console.log('index')
    })
    return (
        <div className="container">
            <TopProfile data={dataTopProfile}/>
            <hr/>
            {
                loading &&
                <Loader/>
            }
            {
                posts &&
                <Posts posts={posts}/>
            }
            {
                errors &&
                <Message message={errors.statusText} bgColor="#E13857"/>
            }
            
        </div>
    );
};

export default Index;