
import React, { useState } from "react";
import axios from "axios";


// js et scss
import './../styles/SignUpForm.scss'
import { NavLink} from "react-router-dom";

// images
import Connexion from './../images/Connexion-SignUP.png'

//Récupération InfoIP


const SignUpForm = () => {
    // Récupération adresse IP
    const [userIp, setIpAddress] = useState('');
    const fetchIp = async () => {
        try { const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
        } catch (error) { console.error(error);
      } };
      fetchIp();
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
    const [pseudo, setPseudo] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      const terms = document.getElementById('terms')
      const pseudoError = document.querySelector('.pseudo.error')
      const emailError = document.querySelector('.email.error')
      const passwordError = document.querySelector('.password.error')
      const passwordConfirmationError = document.querySelector('.passwordconfirmation.error')
      const termsError = document.querySelector('.terms.error')
      console.log("Passage par les vérification")
      passwordConfirmationError.innerHTML = "";
      termsError.innerHTML = "";
  
      if (password !== passwordConfirmation || !terms.checked) {
        if (password !== passwordConfirmation)
          passwordConfirmationError.innerHTML =
            "Les mots de passe ne correspondent pas";
  
        if (!terms.checked)
          termsError.innerHTML = "Veuillez valider les conditions générales";
      } else {
          //Message Console pour debug
          console.log("Passage par axios")
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
              broker,
              pseudo,
              userIp,
            },
        })
        
          .then((res) => {            
            if (res.data.errors) {
               //Message Console pour debug
              console.log("Passage red.data.errors")
              console.log(res.data.errors)
              
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
              pseudoError.innerHTML= res.data.errors.pseudo
              
            } else {
              //Message Console pour debug
              console.log("Submission au server")
              setFormSubmit(true);  
            }
          })
          //Affichage de l'erreur
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
                <div className='input-error'>
                <div className='input'> 
                      <label htmlFor='pseudo'>Votre pseudo<span>*</span></label>
                      <input type='text' placeholder='ActionTrader' id='pseudo' required 
                      onChange = {(e) => setPseudo(e.target.value)}
                      value={pseudo} />
                      </div>
                      <div className='pseudo error'></div>
                    </div>
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
                      <input type={showPassword ? 'text' : 'password'} placeholder='************' id='Mot de passe' onChange = {(e) => setPassword(e.target.value)}
                      value={password} required />
                       <button onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'} Password</button>
                    </div>
                    <div className='password error'></div>
                    </div>
                    <div className='input-error'>
                    {/*Confimation password*/}
                    <div className='input'> 
                      <label htmlFor='Confimation mot de passe'>Confirmation mot de passe<span>*</span></label>
                      <input type={showPassword ? 'text' : 'password'} placeholder='************' id='Confimation mot de passe' onChange = {(e) => setPasswordConfirmation(e.target.value)}
                      value={passwordConfirmation} required />
                       <button onClick={toggleShowPassword}>{showPassword ? 'Hide' : 'Show'} Password</button>
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
                      <label htmlFor='ComplémentAdresse'>Complément d'adresse</label>
                      <input type='text' placeholder='Batiment 2' id='ComplémentAdresse'
                      onChange = {(e) => setComplmtAdress(e.target.value)}
                      value={complmtAdress} /> 
                    </div>
                  </div>

                    {/*Ville*/}
                  <div className='All-input'>
                    <div className='input'> 
                      <label htmlFor='Ville'>Ville<span>*</span></label>
                      <input type="text" placeholder='Paris' id='Ville' required 
                      onChange = {(e) => setVille(e.target.value)}
                      value={ville}/>
                    </div>

                    {/*Code postal*/}
                    <div className='input'> 
                      <label htmlFor='CodePostal'>Code Postal<span>*</span></label>
                      <input type='text'placeholder='75001' id='CodePostal' required
                      onChange = {(e) => setCodePostal(e.target.value)}
                      value={codePostal}/>
                    </div>

                    {/*Etat / province*/}
                    <div className='input'> 
                      <label htmlFor='ÉtatProvince'>État / Province</label>
                      <input type='text' placeholder='IDF' id='ÉtatProvince'
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
                    
                    <option value="Afghanistan">Afghanistan </option>
                    <option value="Afrique_Centrale">Afrique_Centrale </option>
                    <option value="Afrique_du_sud">Afrique_du_Sud </option>
                    <option value="Albanie">Albanie </option>
                    <option value="Algerie">Algerie </option>
                    <option value="Allemagne">Allemagne </option>
                    <option value="Andorre">Andorre </option>
                    <option value="Angola">Angola </option>
                    <option value="Anguilla">Anguilla </option>
                    <option value="Arabie_Saoudite">Arabie_Saoudite </option>
                    <option value="Argentine">Argentine </option>
                    <option value="Armenie">Armenie </option>
                    <option value="Australie">Australie </option>
                    <option value="Autriche">Autriche </option>
                    <option value="Azerbaidjan">Azerbaidjan </option>
                    <option value="Bahamas">Bahamas </option>
                    <option value="Bangladesh">Bangladesh </option>
                    <option value="Barbade">Barbade </option>
                    <option value="Bahrein">Bahrein </option>
                    <option value="Belgique">Belgique </option>
                    <option value="Belize">Belize </option>
                    <option value="Benin">Benin </option>
                    <option value="Bermudes">Bermudes </option>
                    <option value="Bielorussie">Bielorussie </option>
                    <option value="Bolivie">Bolivie </option>
                    <option value="Botswana">Botswana </option>
                    <option value="Bhoutan">Bhoutan </option>
                    <option value="Boznie_Herzegovine">Boznie_Herzegovine </option>
                    <option value="Bresil">Bresil </option>
                    <option value="Brunei">Brunei </option>
                    <option value="Bulgarie">Bulgarie </option>
                    <option value="Burkina_Faso">Burkina_Faso </option>
                    <option value="Burundi">Burundi </option>
                    <option value="France">France </option>
                    <option value="Caiman">Caiman </option>
                    <option value="Cambodge">Cambodge </option>
                    <option value="Cameroun">Cameroun </option>
                    <option value="Canada">Canada </option>
                    <option value="Canaries">Canaries </option>
                    <option value="Cap_vert">Cap_Vert </option>
                    <option value="Chili">Chili </option>
                    <option value="Chine">Chine </option>
                    <option value="Chypre">Chypre </option>
                    <option value="Colombie">Colombie </option>
                    <option value="Comores">Colombie </option>
                    <option value="Congo">Congo </option>
                    <option value="Congo_democratique">Congo_democratique </option>
                    <option value="Cook">Cook </option>
                    <option value="Coree_du_Nord">Coree_du_Nord </option>
                    <option value="Coree_du_Sud">Coree_du_Sud </option>
                    <option value="Costa_Rica">Costa_Rica </option>
                    <option value="Cote_d_Ivoire">Côte_d_Ivoire </option>
                    <option value="Croatie">Croatie </option>
                    <option value="Cuba">Cuba </option>

                    <option value="Danemark">Danemark </option>
                    <option value="Djibouti">Djibouti </option>
                    <option value="Dominique">Dominique </option>

                    <option value="Egypte">Egypte </option>
                    <option value="Emirats_Arabes_Unis">Emirats_Arabes_Unis </option>
                    <option value="Equateur">Equateur </option>
                    <option value="Erythree">Erythree </option>
                    <option value="Espagne">Espagne </option>
                    <option value="Estonie">Estonie </option>
                    <option value="Etats_Unis">Etats_Unis </option>
                    <option value="Ethiopie">Ethiopie </option>

                    <option value="Falkland">Falkland </option>
                    <option value="Feroe">Feroe </option>
                    <option value="Fidji">Fidji </option>
                    <option value="Finlande">Finlande </option>
                    <option value="France">France </option>

                    <option value="Gabon">Gabon </option>
                    <option value="Gambie">Gambie </option>
                    <option value="Georgie">Georgie </option>
                    <option value="Ghana">Ghana </option>
                    <option value="Gibraltar">Gibraltar </option>
                    <option value="Grece">Grece </option>
                    <option value="Grenade">Grenade </option>
                    <option value="Groenland">Groenland </option>
                    <option value="Guadeloupe">Guadeloupe </option>
                    <option value="Guam">Guam </option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernesey">Guernesey </option>
                    <option value="Guinee">Guinee </option>
                    <option value="Guinee_Bissau">Guinee_Bissau </option>
                    <option value="Guinee equatoriale">Guinee_Equatoriale </option>
                    <option value="Guyana">Guyana </option>
                    <option value="Guyane_Francaise ">Guyane_Francaise </option>

                    <option value="Haiti">Haiti </option>
                    <option value="Hawaii">Hawaii </option>
                    <option value="Honduras">Honduras </option>
                    <option value="Hong_Kong">Hong_Kong </option>
                    <option value="Hongrie">Hongrie </option>

                    <option value="Inde">Inde </option>
                    <option value="Indonesie">Indonesie </option>
                    <option value="Iran">Iran </option>
                    <option value="Iraq">Iraq </option>
                    <option value="Irlande">Irlande </option>
                    <option value="Islande">Islande </option>
                    <option value="Israel">Israel </option>
                    <option value="Italie">italie </option>

                    <option value="Jamaique">Jamaique </option>
                    <option value="Jan Mayen">Jan Mayen </option>
                    <option value="Japon">Japon </option>
                    <option value="Jersey">Jersey </option>
                    <option value="Jordanie">Jordanie </option>

                    <option value="Kazakhstan">Kazakhstan </option>
                    <option value="Kenya">Kenya </option>
                    <option value="Kirghizstan">Kirghizistan </option>
                    <option value="Kiribati">Kiribati </option>
                    <option value="Koweit">Koweit </option>

                    <option value="Laos">Laos </option>
                    <option value="Lesotho">Lesotho </option>
                    <option value="Lettonie">Lettonie </option>
                    <option value="Liban">Liban </option>
                    <option value="Liberia">Liberia </option>
                    <option value="Liechtenstein">Liechtenstein </option>
                    <option value="Lituanie">Lituanie </option>
                    <option value="Luxembourg">Luxembourg </option>
                    <option value="Lybie">Lybie </option>

                    <option value="Macao">Macao </option>
                    <option value="Macedoine">Macedoine </option>
                    <option value="Madagascar">Madagascar </option>
                    <option value="Madère">Madère </option>
                    <option value="Malaisie">Malaisie </option>
                    <option value="Malawi">Malawi </option>
                    <option value="Maldives">Maldives </option>
                    <option value="Mali">Mali </option>
                    <option value="Malte">Malte </option>
                    <option value="Man">Man </option>
                    <option value="Mariannes du Nord">Mariannes du Nord </option>
                    <option value="Maroc">Maroc </option>
                    <option value="Marshall">Marshall </option>
                    <option value="Martinique">Martinique </option>
                    <option value="Maurice">Maurice </option>
                    <option value="Mauritanie">Mauritanie </option>
                    <option value="Mayotte">Mayotte </option>
                    <option value="Mexique">Mexique </option>
                    <option value="Micronesie">Micronesie </option>
                    <option value="Midway">Midway </option>
                    <option value="Moldavie">Moldavie </option>
                    <option value="Monaco">Monaco </option>
                    <option value="Mongolie">Mongolie </option>
                    <option value="Montserrat">Montserrat </option>
                    <option value="Mozambique">Mozambique </option>

                    <option value="Namibie">Namibie </option>
                    <option value="Nauru">Nauru </option>
                    <option value="Nepal">Nepal </option>
                    <option value="Nicaragua">Nicaragua </option>
                    <option value="Niger">Niger </option>
                    <option value="Nigeria">Nigeria </option>
                    <option value="Niue">Niue </option>
                    <option value="Norfolk">Norfolk </option>
                    <option value="Norvege">Norvege </option>
                    <option value="Nouvelle_Caledonie">Nouvelle_Caledonie </option>
                    <option value="Nouvelle_Zelande">Nouvelle_Zelande </option>

                    <option value="Oman">Oman </option>
                    <option value="Ouganda">Ouganda </option>
                    <option value="Ouzbekistan">Ouzbekistan </option>

                    <option value="Pakistan">Pakistan </option>
                    <option value="Palau">Palau </option>
                    <option value="Palestine">Palestine </option>
                    <option value="Panama">Panama </option>
                    <option value="Papouasie_Nouvelle_Guinee">Papouasie_Nouvelle_Guinee </option>
                    <option value="Paraguay">Paraguay </option>
                    <option value="Pays_Bas">Pays_Bas </option>
                    <option value="Perou">Perou </option>
                    <option value="Philippines">Philippines </option>
                    <option value="Pologne">Pologne </option>
                    <option value="Polynesie">Polynesie </option>
                    <option value="Porto_Rico">Porto_Rico </option>
                    <option value="Portugal">Portugal </option>

                    <option value="Qatar">Qatar </option>

                    <option value="Republique_Dominicaine">Republique_Dominicaine </option>
                    <option value="Republique_Tcheque">Republique_Tcheque </option>
                    <option value="Reunion">Reunion </option>
                    <option value="Roumanie">Roumanie </option>
                    <option value="Royaume_Uni">Royaume_Uni </option>
                    <option value="Russie">Russie </option>
                    <option value="Rwanda">Rwanda </option>

                    <option value="Sahara Occidental">Sahara Occidental </option>
                    <option value="Sainte_Lucie">Sainte_Lucie </option>
                    <option value="Saint_Marin">Saint_Marin </option>
                    <option value="Salomon">Salomon </option>
                    <option value="Salvador">Salvador </option>
                    <option value="Samoa_Occidentales">Samoa_Occidentales</option>
                    <option value="Samoa_Americaine">Samoa_Americaine </option>
                    <option value="Sao_Tome_et_Principe">Sao_Tome_et_Principe </option>
                    <option value="Senegal">Senegal </option>
                    <option value="Seychelles">Seychelles </option>
                    <option value="Sierra Leone">Sierra Leone </option>
                    <option value="Singapour">Singapour </option>
                    <option value="Slovaquie">Slovaquie </option>
                    <option value="Slovenie">Slovenie</option>
                    <option value="Somalie">Somalie </option>
                    <option value="Soudan">Soudan </option>
                    <option value="Sri_Lanka">Sri_Lanka </option>
                    <option value="Suede">Suede </option>
                    <option value="Suisse">Suisse </option>
                    <option value="Surinam">Surinam </option>
                    <option value="Swaziland">Swaziland </option>
                    <option value="Syrie">Syrie </option>

                    <option value="Tadjikistan">Tadjikistan </option>
                    <option value="Taiwan">Taiwan </option>
                    <option value="Tonga">Tonga </option>
                    <option value="Tanzanie">Tanzanie </option>
                    <option value="Tchad">Tchad </option>
                    <option value="Thailande">Thailande </option>
                    <option value="Tibet">Tibet </option>
                    <option value="Timor_Oriental">Timor_Oriental </option>
                    <option value="Togo">Togo </option>
                    <option value="Trinite_et_Tobago">Trinite_et_Tobago </option>
                    <option value="Tristan da cunha">Tristan de cuncha </option>
                    <option value="Tunisie">Tunisie </option>
                    <option value="Turkmenistan">Turmenistan </option>
                    <option value="Turquie">Turquie </option>

                    <option value="Ukraine">Ukraine </option>
                    <option value="Uruguay">Uruguay </option>

                    <option value="Vanuatu">Vanuatu </option>
                    <option value="Vatican">Vatican </option>
                    <option value="Venezuela">Venezuela </option>
                    <option value="Vierges_Americaines">Vierges_Americaines </option>
                    <option value="Vierges_Britanniques">Vierges_Britanniques </option>
                    <option value="Vietnam">Vietnam </option>

                    <option value="Wake">Wake </option>
                    <option value="Wallis et Futuma">Wallis et Futuma </option>

                    <option value="Yemen">Yemen </option>
                    <option value="Yougoslavie">Yougoslavie </option>

                    <option value="Zambie">Zambie </option>
                    <option value="Zimbabwe">Zimbabwe </option>

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
                      <label htmlFor="Statut">Statut<span>*</span></label>
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
                      <input type='text' placeholder='SARL' id='RaisonSociale' required
                      onChange = {(e) => setRaisonS(e.target.value)}
                      value={raisonS}/>
                    </div>
                  </div>

                    {/*Connu*/}
                  <div className='All-input'>
                    <div className='input'>
                      <label htmlFor='Connu'>Comment nous avez-vous connus ?<span>*</span></label>
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
                    <label htmlFor='terms'>J'accepte les <a href='/mentions-légales' target='_blank' rel='noopener noreferrer'>conditions générales</a></label>
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