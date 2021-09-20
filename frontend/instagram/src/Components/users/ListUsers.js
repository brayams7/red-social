import React from 'react';
import {Link} from 'react-router-dom'

const ListUsers = ({username}) => {
    return (
        <div>
            <Link to="..." className="text-muted">{username}</Link>
        </div>
    );
};

export default ListUsers;