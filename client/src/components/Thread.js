import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, addPost } from '../actions/post.action'; // Importez l'action addPost depuis post.actions
import { setUserData } from '../actions/user.actions';
import Card from './Post/Card';
import { isEmpty } from './Utils';

// js et scss
import './../styles/Thread.scss'
import { UidContext } from './AppContext';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(9);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
  
    const loadMore = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.scrollingElement.scrollHeight
      ) {
        setLoadPost(true);
      }
    };
  
    useEffect(() => {
      if (loadPost) {
        dispatch(getPosts(count));
        setLoadPost(false);
        setCount(count + 9);
      }
      window.addEventListener("scroll", loadMore);
      return () => window.removeEventListener("scroll", loadMore);
    }, [loadPost, dispatch, count]);
  
    const handlePostSubmit = (e) => {
      e.preventDefault(); // Empêche le comportement par défaut du formulaire
  
      const newPost = {
        posterId: uid,
        lastName: userData.lastName,
        firstName: userData.firstName,
        statut: userData.statut,
        etatProv: userData.etatProv,
        pays: userData.pays,
        message: message,
      };
  
      dispatch(addPost(newPost));
      setMessage("");
    };
  
    return (
      <div className="thread-container">
        <ul>
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <Card post={post} key={post._id} />;
            })}
        </ul>
        
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            value={userData.lastName || ""} // Assurez-vous de vérifier si la valeur de userData.lastName existe avant de l'utiliser
            onChange={(e) =>
              dispatch(setUserData({ ...userData, lastName: e.target.value }))
            }
          />
          <textarea
            name="message"
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    );
  };
  
  export default Thread;
  