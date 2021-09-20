import React, { useEffect, memo } from 'react';

const Friend = ({id, username, method}) => {
    useEffect(()=>{
        console.log('friend')
    })
    return (
        
            <tr>
                <th scope="row">{id}</th>
                <td>{username}</td>
                <td>
                    <button className="btn btn-primary" onClick={()=>method({id,username})}>
                        etiquetar
                    </button>
                </td>
            </tr>
        
    );
};

export default memo(Friend);