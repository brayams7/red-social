import React from 'react';

const UntagFriends = ({id, username, method }) => {
    return (
        <tr>
            <td>{username}</td>
            <td>
                <button className="btn btn-danger" onClick={()=>method(id)}>
                    X
                </button>
            </td>
        </tr>
    
);
};

export default UntagFriends;