import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// js et scss
import { updateAdress, updateAge, updateCategorieSP, updateCodePostal, updateComplmtAdress, updateEmail, updateEtatProv, updateFirstName, updateLastName, updatePays, updatePhone, updateRaisonS, updateSecondName, updateStatut, updateVille } from '../../actions/user.actions';

import DateParser from '../Utils';

import './../../styles/UpdateProfil.scss'

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();

  const [lastName, setlastName] = useState(userData.lastName);
  const [firstName, setfirstName] = useState(userData.firstName);
  const [secondName, setsecondName] = useState(userData.secondName);
  const [email, setEmail] = useState(userData.email);
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
    dispatch(updateRaisonS(userData._id, raisonS));
    setUpdateForm(false);
  };

  return (
    <div className="profil-page">
      <div className="profil-nav">
      <NavLink to='/profil' className="nav-link">Profil de {userData.lastName} {userData.firstName}</NavLink>
      <NavLink to='abonnement' className="nav-link">Mes abonnements</NavLink>
      <NavLink to='faq' className="nav-link">Besoin d'aide?</NavLink>
      </div>
      {/* si form est faux */}
      {!updateForm && (
        <>
        <div className='affichage-profil'>
          <div className='infos-nonmodif'>
            <div className='info-nm'>
              <h4>Votre Email</h4>
              <p >{userData.email}</p>
              <p className='text'>Merci de nous contacter si vous souhaitez modifier votre adresse email </p>
              <NavLink to='/contact'className='profil-contact'>Nous Contacter</NavLink>
            </div>
            <div className='info-nm'>
              <h4>Mot de passe</h4>
              <p>*******</p>
              
              <p className='text'>Pour modifier votre mot de passe, nous vous envoyons un mail de confirmation afin d’entamer la procédure.</p>
              
              <button type='button' className='profil-contact'>Nouveau mot de passe</button>
            </div>
          </div>
          {/*Partie 1*/}
            <div className='infos-profil'>
              <div className='info'>
              <h4>Pseudo</h4>
              <p >{userData.pseudo}</p>
              </div>
              <div className='info'>
              <h4>Nom</h4>
              <p >{userData.lastName}</p>
              </div>
              <div className='info'>
              <h4>Prénom</h4>
              <p >{userData.firstName}</p>
              </div>
              <div className='info'>
              <h4>Deuxieme Prénom</h4>
              <p >{userData.secondName}</p>
              </div>
            </div>
          {/*Partie 2*/}
          <div className='infos-profil'>
            <div className='info'>
              <h4>Adresse</h4>
              <p >{userData.adress}</p>
            </div>
            <div className='info'>
              <h4>Ville</h4>
              <p>{userData.ville}</p>
            </div>
            <div className='info'>
            <h4>Code Postal</h4>
            <p >{userData.codePostal}</p>
            </div>
            <div className='info'>
            <h4>État / Province</h4>
            <p >{userData.etatProv}</p>
            </div>
            <div className='info'>
            <h4>Pays</h4>
            <p >{userData.pays}</p>
            </div>
          </div>
          {/*Partie 3*/}
          <div className='infos-profil'>
            <div className='info'>
            <h4>Téléphone</h4>
            <p >{userData.phone}</p>
            </div>
            <div className='info'>
            <h4>Tranche D'age</h4>
            <p >{userData.age}</p>
            </div>

          <div className='info'>
            <h4>Catégorie socio-professionnelle</h4>
            <p >{userData.categorieSP}</p>
            </div>
            <div className='info'>
            <h4>Statut</h4>
            <p >{userData.statut}</p>
            </div>
          
            <div className='info'>
              <h4>Comment nous avez-vous Connus ?</h4>
              <p >{userData.connu}</p>
              </div>
              <div className='info'>
              <h4>Raison Sociale</h4>
              <p >{userData.raisonS}</p>
            </div>

            <div className='info'>
            <h4>Votre broker</h4>
            <p >{userData.broker}</p>
            </div>
            <div className='info'>
              <h4>Votre ip enregistrée</h4>
              <p >{userData.userIp}</p>
            </div>
          </div>
        </div>
        </>
      )}
      {/* si form est vrai */}
      {updateForm && (
        <>
         <div className="modif-titre">
          <h1>Modification du profil</h1>
          </div>
        <div className='modif-input'>
         
          <div className='profil-input'>
            <label htmlFor='Nom'>Nom<span>*</span></label>
            <input
              type="text"
              defaultValue={userData.lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </div>
          <div className='profil-input'>
          <label htmlFor='Prénom'>Prénom<span>*</span></label>
          <input
            type="text"
            defaultValue={userData.firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
          </div>
          <div className='profil-input'>
            <label htmlFor='Deuxième Prénom'>Deuxième Prénom<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.secondName}
            onChange={(e) => setsecondName(e.target.value)}
          />
          </div>
        </div >

        <div className='modif-input'>
          <div className='profil-input'>
          <label htmlFor='Adresse'>Adresse<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
          </div>
          <div className='profil-input'>
            <label htmlFor='Complément adresse'>Complément adresse<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.complmtAdress}
            onChange={(e) => setComplmtAdress(e.target.value)}
          />
          </div>
        </div>

        <div className='modif-input'>
          <div className='profil-input'>
            <label htmlFor='Ville'>Ville<span>*</span></label>    
            <input
            type="text"
            defaultValue={userData.ville}
            onChange={(e) => setVille(e.target.value)}
            required
          />
          </div>
          <div className='profil-input'>
            <label htmlFor='Code postal'>Code postal<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            required
          />
          </div>
          <div className='profil-input'>
            <label htmlFor='Etat / Province'>Etat / Province<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.etatProv}
            onChange={(e) => setEtatProv(e.target.value)}
          />
          </div>
        </div>

        <div className='modif-input'>
          <div className='profil-input'>
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
          </div>

          <div className='profil-input'>
            <label htmlFor='Téléphone'>Téléphone<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </div>
        </div>

        <div className='modif-input'>
          <div className='profil-input'>
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
            </div>
            <div className='profil-input'>
            <label htmlFor='Catégorie'>Catégorie socio-professionnelle</label>
            <select 
            type='text' 
            defaultValue={categorieSP}
            onChange = {(e) => setCategorieSP(e.target.value)}
            >
            <option value=""></option>
            <option value="Agriculture">Agriculture</option>
            <option value="Artisan, Commercant, Chef d'entreprise">Artisan, Commercant, Chef d'entreprise</option>
            <option value="Cadre">Cadre</option>
            <option value="Profession interimaire">Profession interimaire</option>
            <option value="Employé">Employé</option>
            <option value="Ouvrier">Ouvrier</option>
            <option value="Retraité">Retraité</option>
            <option value="Sans activité professionnelle">Sans activité professionnelle</option>
                      </select>
              </div>
        </div>

        <div className='modif-input'>
          <div className='profil-input'>
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
          </div>

          <div className='profil-input'>
            <label htmlFor='Raison sociale'>Raison Sociale<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.raisonS}
            onChange={(e) => setRaisonS(e.target.value)}
          />
          </div>
        </div>
        
        <div className='modif-input'>
          <div className='profil-input'>
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
          </div>
          <div className='profil-input'>
            <label htmlFor='Votre broker'>Votre broker<span>*</span></label>
            <input
            type="text"
            defaultValue={userData.broker}
            onChange={(e) => setBroker(e.target.value)}
            required
          />
          </div>
        </div>
        </>
      )}

      {/* gestion des boutons*/}
      {updateForm ? (
        <div className="btn-modif-placement">
        <button onClick={handleUpdate} className="btn-modif">Valider les modifications</button>
        </div>
      ) : (
        <div className="btn-modif-placement">
          <button onClick={setUpdateForm} className="btn-modif">Modifier les informations</button>
        </div>
      )}
      <div className="profil-creation">
        <h4>Membre depuis le : {DateParser(userData.createdAt)}</h4>
        <h4>Profil mis à jour le : {DateParser(userData.updatedAt)}</h4>
      </div>
    </div>
  );
};

export default UpdateProfil;
