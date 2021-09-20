import React,{memo} from 'react';
import Post from './Post';


const Posts = ({posts}) => {
    
    return (
        <div className="container">
           <div className="row">
                  {
                      posts?.count !== 0 ? (
                          posts.results.map((post)=>{
                            return (
                                <Post 
                                    key={post.id} 
                                    description={post.description} 
                                    likes={post.number_of_likes}
                                    photo={post.photo}
                                    comments={post.comments}
                                    idPost={post.id}
                                    blockComments={post.blockComments}
                                />
                            )
                          })
                    ):(
                            <div>agrega un nuevo post</div>
                        )
                      

                  } 

            </div>
        </div>
    );
};
export default memo(Posts);