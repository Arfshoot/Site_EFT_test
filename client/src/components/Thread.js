import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, addPost } from '../actions/post.action';
import Card from './Post/Card';
import { isEmpty } from './Utils';

// js et scss
import './../styles/Thread.scss'
import { UidContext } from './AppContext';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true)
    const [count, setCount] = useState(9)
    const [message, setMessage] = useState("");
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer)
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const isAdmin = uid && userData.role === "admin" ? true : false; // Vérifie si l'utilisateur est un administrateur

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadPost(true)
        }
    }

    const handlePostSubmit = () => {
        const data = {
            posterId: uid,
            message: message
        }
        dispatch(addPost(data));
        setMessage("");
    }

    useEffect (() =>{
        if(loadPost){
            dispatch(getPosts(count))
            setLoadPost(false)
            setCount(count + 9)
        }
        window.addEventListener('scroll', loadMore)
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPost, dispatch, count])

    return (
        <div className="thread-container">
            {isAdmin && (
                <div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button onClick={handlePostSubmit}>Ajouter</button>
                </div>
            )}
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                    return <Card post={post} key={post._id} />;
                    })}
            </ul>
        </div>
    );
};

export default Thread;
