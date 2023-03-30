import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';

// import js scss
import './../styles/Navbar.scss'
import Logout from '../Log/Logout';


// import images

import Logo from './../images/Logo.png'
import Connexion from './../images/Connexion.png'
import Inscription from './../images/Inscription.png'
import PNJ from './../images/pnj-profil.png'
import langue from './../images/langue.png'
import { useSelector } from 'react-redux';




const Navbar = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    const isAdmin = uid && userData.role === "admin" ? true : false; // Vérifie si l'utilisateur est un administrateur
    console.log(isAdmin)
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src={Logo} alt="icon" />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    /*======================  CONNECTÉ ============================*/
                    /*partie gauche de la nav quand connecté*/
                    <div className="Nav-log">
                        <ul>
                            <div className="Nav-Log1">
                                <li>
                                    <NavLink exact to="/choix-de-la-salle">
                                        <p className='btn-salle'>Accès aux salles</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/faq'>
                                        FAQ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/contact'>
                                        Contact
                                    </NavLink>
                                </li>
                            </div>
                            {/*partie droite de la nav quand connecté*/}
                            <div className='Nav-Log2'>
                                <li className="welcome">
                                    <NavLink exact to="/profil">
                                        <h5 className="Pseudo"><img className="pnj" src={PNJ} alt='Pnj'/>{userData.lastName} {userData.firstName}</h5>
                                    </NavLink>
                                </li>
                                <Logout  className='Logout'/>
                                {/*<li>
                                    <NavLink exact to="/">
                                        <img className='img-padd' src={langue} alt="Langues"/>
                                    </NavLink>
                                </li>*/}
                                {isAdmin && ( // Affiche uniquement si l'utilisateur est un administrateur
                                    <li>
                                        <NavLink exact to="/admin">
                                            Admin
                                        </NavLink>
                                    </li>
                                )},

                            </div>
                        </ul>
                    </div>
                ) : (
                    //===========           //PAS CONNECTÉ //  ===============//
                    <div className="Nav-log">
                        <ul>
                            <div className="Nav-Log1">
                                <li>
                                    <NavLink exact to="/login">
                                        <p className='btn-salle'>Accès aux salles</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/faq'>
                                        FAQ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/contact'>
                                        Contact
                                    </NavLink>
                                </li>
                            </div>
                            {/*partie droite de la nav quand  pas connecté*/}

                            <div className='Nav-Log2'>
                                <li>
                                    <NavLink exact to="/login">

                                        <img src={Connexion} alt="Longin"/>

                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/register">

                                        <img src={Inscription} alt="SignUp"/>

                                    </NavLink>
                                </li>
                                {/*<li>
                                    <NavLink exact to="/">
                                        <img className='img-padd' src={langue} alt="Langues"/>
                                    </NavLink>
                                 </li>*/}
                    </div>
                </ul>
            </div>
          )}
        </div>

      </nav>
    );
  };
  
  export default Navbar;