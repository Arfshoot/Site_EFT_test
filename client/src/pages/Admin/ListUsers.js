import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, blockUser, unblockUser } from '../../actions/users.actions';
import './../../styles/ListUsers.scss';

export default function ListUsers() {
  const [loadUsers, setLoadUsers] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]); // Utilisateurs sélectionnés

  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);

  useEffect(() => {
    if (loadUsers) {
      dispatch(getUsers());
      setLoadUsers(false);
    }
  }, [loadUsers, dispatch]);

  const handleBlockUser = (user) => {
    if (user.blocked) {
      dispatch(unblockUser(user.id));
    } else {
      dispatch(blockUser(user.id));
    }
  };

  const toggleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      // L'utilisateur est déjà sélectionné, le retirer de la liste
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      // L'utilisateur n'est pas encore sélectionné, l'ajouter à la liste
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const isChecked = (userId) => selectedUsers.includes(userId);

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
              <th>Code postal</th>
              <th>Pays</th>
              <th>Age</th>
              <th>Raison  sociale</th>
              <th>Connu ?</th>
              <th>Ip</th>
              <th>Date d'inscription</th>
              <th>Abonnement</th>
              <th>Pseudo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>{user.adress}</td>
                  <td>{user.ville}</td>
                  <td>{user.codePostal}</td>
                  <td>{user.pays}</td>
                  <td>{user.age}</td>
                  <td>{user.statut}</td>
                  <td>{user.connu}</td>
                  <td>{user.userIp}</td>
                  <td>{user.createdAt}</td>
                  <td>Abonnement</td>
                  <td>{user.pseudo}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
