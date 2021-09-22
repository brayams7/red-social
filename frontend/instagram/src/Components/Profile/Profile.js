import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import ProfileForm from './ProfileForm';
import { useModal } from '../Utils/modals/useModal';
import PortalModal from '../Utils/modals/PortalModal'
import {helpWhitTokenHttp} from '../api/helpWithTokenHttp'

const Profile = ({title}) => {
    const [errors, setErrors] = useState(null)
    const [loading, setLoding] = useState(false)
    const [isOpenPortal, openPortal, closePortal] = useModal(true)
    
    let history = useHistory()
    const url = "http://localhost:8000/api/profile/update_fisrt_profile/"

    const onSumbitData = (data)=>{
        const {postAttachments} = helpWhitTokenHttp()
        const makeFetch = async ()=>{
            setLoding(true)
            let res = await postAttachments(url,{body:data})
            if(!res.err){
                setLoding(false)
                history.push("/dashboard")
            }else{
                setErrors(res)
                setLoding(false)
            }
            
        }
        makeFetch()
    }

    return (
        <PortalModal closeModal={closePortal} isOpenModal={isOpenPortal}>
            <div>
                <h2 className="text-center">{title}</h2>
                <h3>Bienvenido a instragram</h3>
                <h4>Debes de personalizar tu perfil</h4>
                <ProfileForm onSumbitData={onSumbitData} loading={loading}/>
            </div>
        </PortalModal>
        
    );
};

Profile.defaultProps={
    title:"Profile"
}

export default Profile;