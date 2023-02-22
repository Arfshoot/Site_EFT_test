import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";

// js et scss
import './../../styles/Card.scss'


const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.postReducer); 



  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card">
            
              <div className="pseudo">
                <h3>
                 {post.lastName} {post.firstName}, {post.statut}, {post.etatProv}, {post.pays}
                </h3>
              </div>
              <div className="card-desc">
                <p className="card-date">{dateParser(post.createdAt)}</p>
                <p className="card-message">{post.message}</p>
              </div>
            
          </div>
        </>
        
      )}
      
    </li>
  );
};

export default Card;
