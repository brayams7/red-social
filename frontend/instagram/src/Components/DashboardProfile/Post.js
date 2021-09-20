import React,{memo} from 'react';
import { useModal } from '../Utils/modals/useModal';
import PortalModal from '../Utils/modals/PortalModal'
import ModalPost from './ModalPost';
import usePost from '../Utils/hooks/posts/usePost';

const Post = ({photo, description, likes, Countcomments, idPost, blockComments}) => {
    const [isOpenPortal, openPortal, closePortal] = useModal(false)
    const {comments, getComment,likesUsers, is_liked, handleLike} = usePost(blockComments, idPost)

    return (
        <div className="col-md-4 py-2">
            <button onClick={openPortal}>
                <div className="card" style={{maxWidth:288}}>
                    <img src={photo && `http://localhost:8000${photo}`} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <span className="material-icons">
                                    favorite_border
                                </span>
                                {likes}
                            </div>
                            <div className="col-md-6 text-center">
                                <span className="material-icons">
                                    comment
                                </span>
                                {Countcomments}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </button>
            <PortalModal closeModal={closePortal} isOpenModal={isOpenPortal}>
                <ModalPost 
                    commentsPost={comments ? comments : null}
                    description={description} 
                    likes={likes}
                    photo={photo}
                    idPost={idPost}
                    onSubmit={getComment}
                    is_liked={is_liked}
                    handleLike={handleLike}
                />
            </PortalModal>
        </div>
    );
};

export default memo(Post);