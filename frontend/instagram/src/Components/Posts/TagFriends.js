import React, { useEffect, memo, useState } from 'react';
import {helpWhitTokenHttp} from '../api/helpWithTokenHttp'
import Loader from '../Utils/Loader'
import Friend from './Friend';
import UntagFriends from './UntagFriends';

const TagFriends = ({handleTag, tagFriends, handleUntag}) => {
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState({
        errors:null,
        errors_search:""
    })
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [url, setUrl] = useState("http://localhost:8000/people/followed/")
    

    useEffect(()=>{
     const {get} = helpWhitTokenHttp()
        const makeFetch= async ()=>{
            setLoading(true)
            let response = await get(url)
            if(!response.err){
                setResponse(response)
                setErrors({
                    errors:null,
                    errors_search:""
                })
                
                console.log('followed', response)
            }else{
                setErrors({
                    ...errors,
                    errors:response
                })
                setResponse(null)
            }
            setLoading(false)
        }
        makeFetch()
    },[url])

    useEffect(()=>{
        console.log('tag friends')
    })
    
    const handleChangeSearch = (e)=>{
        setSearch(e.target.value)
    }
    const handleSearch = ()=>{
        let regexText = /^[a-zA-Z ]+$/

        if(!regexText.test(search)){
            setErrors({
                ...errors,
                errors_search:"busqueda invalida"
            })
        }else{
            setErrors({
                ...errors,
                errors_search:""
            })
            setUrl(`http://localhost:8000/people/followed/?username__contains=${search}`)
        }
    }
    return (
        
            <div>
                <h2 className="text-center">
                    etiqueta a tus amigos
                </h2>
                <div className="card">
                    <div className="d-felx justify-content-end">
                        <input className="form-control" value={search} placeholder="buscar amigo" onChange={handleChangeSearch}/>
                        {
                            search && (
                                <button className="btn btn-success" onClick={handleSearch}>Buscar</button>
                            )
                        }
                        {
                            errors.errors_search && (
                                <p className="text-danger">
                                    {errors.errors_search}
                                </p>
                            )
                        }
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="table text-center">
                            <div>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">usuario</th>
                                <th scope="col">etiquetar</th>
                                </tr>
                            </div>
                            <div>
                                {
                                    loading && (
                                        <Loader/>
                                    )
                                }
                                {
                                    response && (
                                        response.count !== 0 ?
                                        (
                                            response.results.map((friend)=>{
                                                return(
                                                    <Friend id={friend.id} method={handleTag} username={friend.username} key={friend.id}/>
                                                )
                                            })
                                        ):(
                                            <p className="text-muted">
                                                no hay amigos para etiquetar
                                            </p>
                                        )
                                        
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mx-2">
                        <div className="table text-center">
                            <div>
                                <tr>
                                <th scope="col">usuario</th>
                                <th scope="col">desetiquetar</th>
                                </tr>
                            </div>
                            <div>
                                {
                                    tagFriends && (
                                        tagFriends.map((friend,i)=>{
                                            return(
                                                <UntagFriends id={friend.id} method={handleUntag} username={friend.username} key={i}/>
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        
    );
};

export default memo(TagFriends);