import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../actions/users.actions';


import './../../styles/ListUsers.scss';

export default function ListUsers() {
  const [loadUsers, setLoadUsers] = useState(true);
   
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);

  useEffect (() =>{
      if(loadUsers){
          dispatch(getUsers());
          setLoadUsers(false);
      }
  }, [loadUsers, dispatch]);

  return (
    <div className="list-users">              
      <div>
      <table>
          <thead>
        <tr>
          <th>Liste des Membres</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Adresse</th>
          <th>Ville</th>
          <th>Code Postal</th>
          <th>Pays</th>
          <th>Age</th>
          <th>Statut</th>
          <th>Connu ?</th>
          <th>Nom</th>
          <th>Nom</th>
          <th>Nom</th>
          <th>Nom</th>
        </tr>
      </thead>
          <tbody>{users.map((user) => (
            <tr>
            <td key={user.id}>{user.lastName}</td>
            <td key={user.id}>{user.firstName}</td>
            <td key={user.id}>{user.email}</td>
            <td key={user.id}>{user.adress}</td>
            <td key={user.id}>{user.ville}</td>
            <td key={user.id}>{user.codePostal}</td>
            <td key={user.id}>{user.pays}</td>
            <td key={user.id}>{user.age}</td>
            <td key={user.id}>{user.statut}</td>
            <td key={user.id}>{user.connu}</td>
            <td key={user.id}>{user.broker}</td>
            <td key={user.id}>{user.userIp}</td>
            <td key={user.id}>{user.createdAt}</td>
            <td key={user.id}>{user.pseudo}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
