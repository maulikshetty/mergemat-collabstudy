import React, { useMemo, useState } from 'react'
import "./LikeButton.css"
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { getLikesByUser, likePost } from '../../api/FirestoreAPI';
import { FaRegCommentDots } from "react-icons/fa";
import { postComment, getComments } from '../../api/FirestoreAPI';
import { getCurrentTimeStamp } from '../../helpers/useMoment';

export default function LikeButton({ userId, postId, currentUser }) {
    const [likesCount, setLikesCount] = useState(0);

    const [showCommentBox, setShowCommentBox] = useState(false)

    const [comment, setComment] = useState('');

    const [liked, setLiked] = useState(false);

    const [comments, setComments] = useState([])

    const handleLike = () => {

        likePost(userId, postId, liked)
    }

    const getComment = (event) => {
        setComment(event.target.value)

    }

    const addComment = () => {
        postComment(postId, comment, getCurrentTimeStamp('LLL'), currentUser?.firstname, currentUser?.lastname)
        setComment('')


    }



    useMemo(() => {

        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId, setComments);

    }, [userId, postId])
    return (

        < div className='like-container'  >
            <p>
                {likesCount === 1 && liked
                    ? 'You liked this post' : likesCount === 1
                        ? '1 person has liked this post' : liked
                            ? `You and ${likesCount - 1} others`
                            : likesCount === 0
                                ? ''
                                : `${likesCount} others`}
            </p>
            <hr />

            <div className='like-comment'>

                <div className='likes-comment-inner' onClick={handleLike}>
                    {liked ? <AiFillLike className='like-icon' size={25} /> : <AiOutlineLike size={25} />}

                    <p className={liked ? 'blue' : 'black'}>Like</p>
                </div>

                <div className='likes-comment-inner' onClick={() => setShowCommentBox(!showCommentBox)}>
                    {showCommentBox ? <FaRegCommentDots className='like-icon' size={22} /> : <FaRegCommentDots className='comment-icon' size={22} />}


                    <p className={showCommentBox ? 'blue' : 'black'}>Comment</p>
                </div>
            </div>

            {showCommentBox ? <>

                <input onChange={getComment} placeholder='Add a Comment' className='comment-input' name='comment' value={comment} />
                <button onClick={addComment} className='add-comment-btn'>Add Comment</button>

                {comments.length > 0 ? comments.map((comment) => {
                    return (
                        <div className='all-comments'>
                            <p className='comment-name'>{comment.firstname} {comment.lastname}</p>

                            <p className='comment'>{comment.comment}</p>

                            <p className='timestamp'>{comment.timeStamp}</p>


                        </div>
                    )
                }) : <></>}

            </> : <></>}



        </div >
    )
}
