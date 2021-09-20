import React from 'react';

const PictureProfile = ({profile}) => {
    return (
        <div>
            <img src={`http://localhost:8000${profile.picture}`} className="img-thumbnail" alt="profile"/>
            <div className="text-center">
                <b>
                    {profile.username}
                </b>
            </div>
        </div>
    );
};

export default PictureProfile;