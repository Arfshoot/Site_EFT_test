
import React, { useState } from "react";
import axios from "axios";


// js et scss
import './../styles/SignUpForm.scss'
import { NavLink, Switch } from "react-router-dom";

// images
import Connexion from './../images/Connexion-SignUP.png'


const SignUpForm = () => {

    // hook des différentes infos lors de l'inscriptions
    const [formSubmit, setFormSubmit] = useState(false);
    const [lastName, setlastName] = useState('')
    const [firstName, setfirstName] = useState('')
    const [secondName, setsecondName] = useState('first')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [adress, setAdress] = useState('')
    const [complmtAdress, setComplmtAdress] = useState('')
    const [ville , setVille] = useState('')
    const [codePostal , setCodePostal] = useState('')
    const [etatProv, setEtatProv] = useState('')
    const [pays, setPays] = useState('')
    const [phone, setPhone] = useState('')
    const [age, setAge] = useState('')
    const [categorieSP, setCategorieSP] = useState('')
    const [statut, setStatut] = useState('')
    const [raisonS, setRaisonS] = useState('')
    const [connu, setConnu] = useState('')
    const [broker, setBroker] = useState('')

    const handleRegister = async (e) => {
      e.preventDefault();
      const terms = document.getElementById('terms')
      const emailError = document.querySelector('.email.error')
      const passwordError = document.querySelector('.password.error')
      const passwordConfirmationError = document.querySelector('.passwordconfirmation.error')
      const termsError = document.querySelector('.terms.error')
      console.log(terms)
      passwordConfirmationError.innerHTML = "";
      termsError.innerHTML = "";
  
      if (password !== passwordConfirmation || !terms.checked) {
        if (password !== passwordConfirmation)
          passwordConfirmationError.innerHTML =
            "Les mots de passe ne correspondent pas";
  
        if (!terms.checked)
          termsError.innerHTML = "Veuillez valider les conditions générales";
      } else {
        await axios({
          
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}api/user/register`,
          data: {
            email,
            password,
            lastName,
            firstName,
            secondName,
            adress,
            complmtAdress,
            ville,
            codePostal,
            etatProv,
            pays,
            phone,
            age,
            categorieSP,
            statut,
            raisonS,
            connu,
            broker
            
          },
          
        })
        
          .then((res) => {            
            if (res.data.errors) {
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              setFormSubmit(true);  
             
            }
          })
          .catch((err) => console.log(err));
         
      }
    };
    return ( 
      <div className="All-page">
        
        <div className='Form-head'>
          <div className='form-title' >
            <h1 >Création de votre compte</h1>
          </div>
          <div className='head-button'>
            <p>Déja inscrit ?</p>
            <NavLink to='/login'><img src={Connexion} alt='connexion'/></NavLink>
          </div>
        </div>
          <div className='Form-desc'>
            <p className="desc-grey">Compte tenu de la qualité de nos signaux, nous sommes confrontés à de nombreuses tentatives de fraudes; en conséquence, tout enregistrement douteux sera systématiquement déconnecté; il appartiendra au trader de fournir les preuves de son identité et de sa localisation.</p>
            <br/>
            <br/>
            <p >Si vous n'avez pas encore de compte Efficient Trading, vous avez la possibilité d'en créer un <span className="desc-Weight">en quelques minutes.</span>
            Les nouveaux adhérents bénéficient <span className="desc-Weight">d'une offre de bienvenue : deux jours d'accès complet aux différentes salles de marchés.</span>
            <br/>
            <br/>
            La création d'un compte <span className="desc-red">vous engage à effectuer un essai dans l’une des salles de trading disponibles.</span>
            <br/>
            <br/>
            <span className="desc-grey">Note : Vega-Traders n'autorise la création que d'un seul compte par foyer.</span></p>
          <div>
          {formSubmit ? (
        
          window.location = "/login"
        
      ) : (
              <form className='All-form'  method='get' action="" onSubmit={handleRegister}>
              <div className="Titre-section" >
                <h2 >Identifiant</h2>
              </div>
                <div className='identifiants'>
                    {/*Email*/}
                    <div className='input-error'>
                      <div className='input'>
                        <label htmlFor="Email">Adresse mail<span>*</span></label>
                        <input type='email'id='Email' onChange = {(e) => setEmail(e.target.value)}
                        value={email} required/>
                      </div>
                      <div className='email error'></div>
                      <p>Nous vous remercions d'utiliser en priorité une adresse gmail ou hotmail pour éviter les spams.</p>
                    </div>
                    {/*password*/}
                    <div className='input-error'>
                    <div className='input'> 
                      <label htmlFor='Mot de passe'>Mot de passe<span>*</span></label>
                      <input type="password" placeholder='************' id='Mot de passe' onChange = {(e) => setPassword(e.target.value)}
                      value={password} required />
                    </div>
                    <div className='password error'></div>
                    </div>
                    <div className='input-error'>
                    {/*Confimation password*/}
                    <div className='input'> 
                      <label htmlFor='Confimation mot de passe'>Confirmation du mot de passe<span>*</span></label>
                      <input type="password" placeholder='************' id='Confimation mot de passe' onChange = {(e) => setPasswordConfirmation(e.target.value)}
                      value={passwordConfirmation} required />
                    </div>
                    <div className='passwordconfirmation error'></div>
                </div>
                </div>

                

                <div className='coordonnées Titre-section'> 
                  <h2>Coordonnées</h2>
                  <div className='All-input'>

                    {/*Nom*/}
                    
                      <div className='input'> 
                      <label htmlFor='Nom'>Nom<span>*</span></label>
                      <input type='text' placeholder='Dupond' id='Nom' required 
                      onChange = {(e) => setlastName(e.target.value)}
                      value={lastName} />
                      </div>

                      {/*prénom*/}
                      <div className='input'> 
                      <label htmlFor='Prénom'>Prénom<span>*</span></label>
                      <input type="text" placeholder='Michel' id='Prénom' required 
                      onChange = {(e) => setfirstName(e.target.value)}
                      value={firstName}></input>
                      </div>

                      {/*Deuxieme prénom*/}
                      <div className='input'> 
                      <label htmlFor='DeuxièmePrénom'>Deuxième Prénom<span>*</span></label>
                      <input type="text" placeholder='Paul' id='DeuxièmePrénom' required 
                      onChange = {(e) => setsecondName(e.target.value)}
                      value={secondName}></input>
                      </div>
                    </div>
                  

                    {/*address*/}

                  <div className='All-input'>
                    <div className='input'> 
                      <label htmlFor='Adresse'>Adresse<span>*</span></label>
                      <input type='text' placeholder='3 rue des lilas' id='Adresse' required
                      onChange = {(e) => setAdress(e.target.value)}
                      value={adress}/>  
                    </div> 

                    {/*Complément d'adresse*/}
                    <div className='input'> 
                      <label htmlFor='Complément adresse'>Complément d'adresse</label>
                      <input type='text' placeholder='Batiment 2' id='ComplémentAdresse'
                      onChange = {(e) => setComplmtAdress(e.target.value)}
                      value={complmtAdress} /> 
                    </div>
                  </div>

                    {/*Ville*/}
                  <div className='All-input'>
                    <div className='input'> 
                      <label htmlFor='Ville'>Ville<span>*</span></label>
                      <input type="text" placeholder='Rennes' id='Ville' required 
                      onChange = {(e) => setVille(e.target.value)}
                      value={ville}/>
                    </div>

                    {/*Code postal*/}
                    <div className='input'> 
                      <label htmlFor='CodePostal'>Code Postal<span>*</span></label>
                      <input type='text'placeholder='35000' id='CodePostal' required
                      onChange = {(e) => setCodePostal(e.target.value)}
                      value={codePostal}/>
                    </div>

                    {/*Etat / province*/}
                    <div className='input'> 
                      <label htmlFor='État / Province'>État / Province</label>
                      <input type='text' placeholder='Quebec' id='État / Province'
                      onChange = {(e) => setEtatProv(e.target.value)}
                      value={etatProv} />
                    </div>
                  </div>
                  <div className='All-input'>

                    {/*Pays*/}
                    <div className='input'>
                      <label htmlFor='Pays'>Pays<span>*</span></label>
                      <select name='Pays' id='Pays' required 
                      onChange = {(e) => setPays(e.target.value)}
                    value={pays}>
                          <option value=""></option>
                          <option value="espagne">Espagne</option>
                          <option value="royaume-uni">Royaume-Uni</option>
                          <option value="canada">Canada</option>
                          <option value="japon">Japon</option>
                      </select>
                    </div>

                    {/*Téléphone*/}
                    <div className='input'>
                      <label htmlFor='Téléphone'>Téléphone<span>*</span></label>
                      <input type='text' placeholder='0000000000' id='Téléphone' required
                      onChange = {(e) => setPhone(e.target.value)}
                      value={phone}/>
                    </div>
                  </div>

                    {/*Age*/}
                  <div className='All-input'>
                    <div className='input'>
                      <label htmlFor='Age'>Tranche D'age</label>
                      <select id="Age" 
                      onChange = {(e) => setAge(e.target.value)}
                    value={age} >
                        <option value=""></option>
                        <option value="18-25ans">18-25ans</option>
                        <option value="26-45ans">26-45ans</option>
                        <option value="46-59ans">46-59ans</option>
                        <option value="60ans et plus">60ans et plus</option>
                      </select>
                    </div>

                    {/*Catégorie SP*/}
                    <div className='input'>
                      <label htmlFor='Catégorie'>Catégorie socio-professionnelle</label>
                      <select id="Catégorie" 
                      onChange = {(e) => setCategorieSP(e.target.value)}
                    value={categorieSP}>
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
                  <div className='All-input'>

                    {/*Statut*/}
                    <div className='input'>
                      <label htmlFor="Satut">Satut<span>*</span></label>
                      <select id="Statut" required 
                      onChange = {(e) => setStatut(e.target.value)}
                    value={statut}>
                        <option value=""></option>
                        <option value='Particulier'>Particulier</option>
                        <option value='Société'>Société</option>
                      </select>
                    </div>

                    {/*Raison Sociale*/}
                    <div className='input'>
                      <label htmlFor='RaisonSociale'>Raison Sociale</label>
                      <input type='text' placeholder='SARL' id='RaisonSociale' 
                      onChange = {(e) => setRaisonS(e.target.value)}
                      value={raisonS}/>
                    </div>
                  </div>

                    {/*Connu*/}
                  <div className='All-input'>
                    <div className='input'>
                      <label htmlFor='Connu?'>Comment nous avez-vous connus ?<span>*</span></label>
                      <select id="Connu" required 
                      onChange = {(e) => setConnu(e.target.value)}
                    value={connu}>
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

                    {/*Broker*/}
                    <div className='input'>
                      <label htmlFor='Broker'>Votre Broker<span>*</span></label>
                      <input type="text" placeholder="Votre Broker" id='Broker' required
                      onChange = {(e) => setBroker(e.target.value)}
                      value={broker}/>
                    </div>
                  </div>
                  <p className='asterisque'><span>*</span>Les champs marqués par une astérisque sont requis</p>
                </div>

                {/*Checkbox conditions*/}
                <div className='Bouton-Condition'>
                    <input type='checkbox' id='terms' ></input>
                    <label htmlFor='Conditions'>J'accepte les <a href='#' target='_blank' rel='noopener noreferrer'>conditions générales</a></label>
                    <div className='terms error'></div>
                </div>
                <div className='Form-button-bottom'> 
                  
                    {/*Bouton reset*/}
                    
                    <input type='reset' placeholder="Reset" id='reset' value="Réinitialiser les données"/>
                    <input type='submit' placeholder='Enregistrer' id='submit' value='Enregistrer'/>
                  
                </div>
              </form>
              
              )}
              
          </div>

      </div>
      </div>  
      

    );
};

export default SignUpForm;