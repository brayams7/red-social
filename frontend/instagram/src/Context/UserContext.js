import {createContext, useEffect, useState} from 'react'
import {helpWhitTokenHttp} from '../Components/api/helpWithTokenHttp'
const UserContext = createContext()

//provider
const UserProvider = ({children})=>{
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState(null)
    useEffect(()=>{
        const {get} = helpWhitTokenHttp()
        
        const makeFetch = async ()=>{
            let res = await get("http://localhost:8000/obtainToken")
            if(!res.err){
                console.log(res)
                setErrors(null)
                setResponse(res)
            }else{
                setErrors(res)
                setResponse(null)
            }
        }
        makeFetch()
    },[])

    let data = {response, errors}

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export {UserProvider}

export default UserContext