import React,{memo, useEffect} from 'react';
import {Link} from 'react-router-dom'

const CommentUser = ({username, likesMessage, message}) => {
    return (
        <div>
            <div className="row">
                <Link to="..." className="text-muted">{username}</Link>
                {message}
            </div>
            <div className="d-flex justify-content-end">
                <span className="material-icons">
                    favorite_border
                </span>
                {likesMessage}
            </div>
        </div>
    );
};

export default memo(CommentUser);