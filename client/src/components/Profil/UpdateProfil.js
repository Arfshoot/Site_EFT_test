import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateAdress, updateAge, updateBroker, updateCategorieSP, updateCodePostal, updateComplmtAdress, updateConnu, updateEmail, updateEtatProv, updateFirstName, updateLastName, updatePays, updatePhone, updateRaisonS, updateSecondName, updateStatut, updateUserIp, updateVille } from '../../actions/user.actions';
import DateParser from '../Utils';

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const [lastName, setlastName] = useState(userData.lastName);
  const [firstName, setfirstName] = useState(userData.firstName);
  const [secondName, setsecondName] = useState(userData.secondName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [adress, setAdress] = useState(userData.adress);
  const [complmtAdress, setComplmtAdress] = useState(userData.complmtAdress);
  const [ville, setVille] = useState(userData.ville);
  const [codePostal, setCodePostal] = useState(userData.codePostal);
  const [etatProv, setEtatProv] = useState(userData.etatProv);
  const [pays, setPays] = useState(userData.pays);
  const [phone, setPhone] = useState(userData.phone);
  const [age, setAge] = useState(userData.age);
  const [categorieSP, setCategorieSP] = useState(userData.categorieSP);
  const [statut, setStatut] = useState(userData.statut);
  const [raisonS, setRaisonS] = useState(userData.raisonS);
  const [connu, setConnu] = useState(userData.connu);
  const [broker, setBroker] = useState(userData.broker);
  const [userIp, setUserIp] = useState(userData.userIp);

  const handleUpdate = () => {
    dispatch(updateLastName(userData._id, lastName));
    dispatch(updateFirstName(userData._id, firstName));
    dispatch(updateSecondName(userData._id, secondName));
    dispatch(updateEmail(userData._id, email));
    dispatch(updateAdress(userData._id, adress));
    dispatch(updateComplmtAdress(userData._id, complmtAdress));
    dispatch(updateVille(userData._id, ville));
    dispatch(updateCodePostal(userData._id, codePostal));
    dispatch(updateEtatProv(userData._id, etatProv));
    dispatch(updatePays(userData._id, pays));
    dispatch(updatePhone(userData._id, phone));
    dispatch(updateAge(userData._id, age));
    dispatch(updateCategorieSP(userData._id, categorieSP));
    dispatch(updateStatut(userData._id, statut));
    dispatch(updateRaisonS(userData._id))
    setUpdateForm(false);
  };

  return (
    <div className="profil-page">
      <h1>Profil de {userData.lastName} - {userData.firstName}</h1>
      {/* si form est faux */}
      {!updateForm && (
        <>
          <p>Votre Email</p>
          <p onClick={() => setUpdateForm(true)}>{userData.email}</p>
          <p>Nom</p>
          <p onClick={() => setUpdateForm(true)}>{userData.lastName}</p>
          <p>Prénom</p>
          <p onClick={() => setUpdateForm(true)}>{userData.firstName}</p>
          <p>Deuxieme Prénom</p>
          <p onClick={() => setUpdateForm(true)}>{userData.secondName}</p>
          <p>Adresse</p>
          <p onClick={() => setUpdateForm(true)}>{userData.adress}</p>
          <p>Code Postal</p>
          <p onClick={() => setUpdateForm(true)}>{userData.codePostal}</p>
          <p>État / Province</p>
          <p onClick={() => setUpdateForm(true)}>{userData.etatProv}</p>
          <p>Pays</p>
          <p onClick={() => setUpdateForm(true)}>{userData.pays}</p>
          <p>Téléphone</p>
          <p onClick={() => setUpdateForm(true)}>{userData.phone}</p>
          <p>Tranche D'age</p>
          <p onClick={() => setUpdateForm(true)}>{userData.age}</p>
          <p>Catégorie socio-professionnelle</p>
          <p onClick={() => setUpdateForm(true)}>{userData.categorieSP}</p>
          <p>Statut</p>
          <p onClick={() => setUpdateForm(true)}>{userData.statut}</p>
          <p>Raison Sociale</p>
          <p onClick={() => setUpdateForm(true)}>{userData.raisonS}</p>
          <p>Comment nous avez-vous Connus ?</p>
          <p onClick={() => setUpdateForm(true)}>{userData.connu}</p>
          <p>Votre broker</p>
          <p onClick={() => setUpdateForm(true)}>{userData.broker}</p>
          <p>Votre ip enregistrée</p>
          <p onClick={() => setUpdateForm(true)}>{userData.userIp}</p>

        </>
      )}
      {/* si form est vrai */}
      {updateForm && (
        <>
          <label htmlFor='Nom'>Nom<span>*</span></label>
          <input
            type="text"
            defaultValue={userData.lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
          />

          <label htmlFor='Prénom'>Prénom<span>*</span></label>
          <input
            type="text"
            defaultValue={userData.firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />

            <label htmlFor='Deuxième Prénom'>Deuxième Prénom<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.secondName}
            onChange={(e) => setsecondName(e.target.value)}
          />

          <label htmlFor='Adresse'>Adresse<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />

            <label htmlFor='Complément adresse'>Complément adresse<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.complmtAdress}
            onChange={(e) => setComplmtAdress(e.target.value)}
          />

            <label htmlFor='Ville'>Ville<span>*</span></label>    
            <input
            type="text"
            defaultValue={userData.ville}
            onChange={(e) => setVille(e.target.value)}
            required
          />

            <label htmlFor='Code postal'>Code postal<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            required
          />

            <label htmlFor='Etat / Province'>Etat / Province<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.etatProv}
            onChange={(e) => setEtatProv(e.target.value)}
          />

            <label htmlFor='Pays'>Pays<span>*</span></label>
            <select
            type="text"
            defaultValue={userData.pays}
            onChange={(e) => setPays(e.target.value)}
            required
          >
            <option value=""></option>
            <option value="espagne">Espagne</option>
            <option value="royaume-uni">Royaume-Uni</option>
            <option value="canada">Canada</option>
            <option value="japon">Japon</option>
            <option value="allemagne">Allemagne</option>
            <option value="italie">Italie</option>
            <option value="chine">Chine</option>
            <option value="australie">Australie</option>
            <option value="suisse">Suisse</option>
            <option value="inde">Inde</option>
            <option value="bresil">Brésil</option>
            <option value="argentine">Argentine</option>
            <option value="mexique">Mexique</option>
            <option value="afrique-du-sud">Afrique du Sud</option>
          </select>


            <label htmlFor='Téléphone'>Téléphone<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.phone}
            onChange={(e) => setPhone(e.target.value)}
          />

            <label htmlFor='Age'>Age<span>*</span></label>
            <select
            type="text"
            defaultValue={userData.age}
            onChange={(e) => setAge(e.target.value)}
          > <option value=""></option>
            <option value="18-25ans">18-25ans</option>
            <option value="26-45ans">26-45ans</option>
            <option value="46-59ans">46-59ans</option>
            <option value="60ans et plus">60ans et plus</option>
            </select>


            <label htmlFor='Statut'>Statut<span>*</span></label>
            <select
            type="text"
            defaultValue={userData.statut}
            onChange={(e) => setStatut(e.target.value)}
            required
          >
            <option value=""></option>
            <option value='Particulier'>Particulier</option>
            <option value='Société'>Société</option>
          </select>


            <label htmlFor='Raison sociale'>Raison Sociale<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.raisonS}
            onChange={(e) => setRaisonS(e.target.value)}
          />


            <label htmlFor='Comment nous avez-vous connu?'>Comment nous avez-vous connu ?<span>*</span></label>
            <select
            type="text"
            defaultValue={userData.connu}
            onChange={(e) => setConnu(e.target.value)}
            required
          >
            <option value=""></option>
            <option value='Moteur de recherche'>Moteur de recherche</option>
            <option value='Relation'>Relation</option>
            <option value='Recommandation Broker'>Recommandation Broker</option>
            <option value='Publicité'>Publicité</option>
            <option value='Twitter'>Twitter</option>
            <option value='Media (radio,television)'>Media (radio,television)</option>
            <option value='www.tvfinacne.fr'>www.tvfinacne.fr</option>
            <option value='Publicité textile'>Publicité textile</option>
            <option value='Facebook'>Facebook</option>
            <option value='HoverTheToP.fr'>HoverTheToP.fr</option>
          </select>


            <label htmlFor='Votre broker'>Votre broker<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.broker}
            onChange={(e) => setBroker(e.target.value)}
            required
          />

        </>
      )}

      {/* gestion des boutons*/}
      {updateForm ? (
        <button onClick={handleUpdate}>Valider la modification</button>
      ) : (
        <button onClick={() => setUpdateForm(true)}>Modifier Nom</button>
      )}
      <div>
        <h4>Membre depuis le : {DateParser(userData.createdAt)}</h4>
        <h4>Profil mis à jour le : {DateParser(userData.updatedAt)}</h4>
      </div>
    </div>
  );
};

export default UpdateProfil;
