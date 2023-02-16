import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';

// import js scss
import './../styles/Navbar.scss'
import Logout from '../Log/Logout';
import SignInForm from '../Log/SignInForm';
import SignUpForm from '../Log/SignUpForm';

// import images

import Logo from './../images/Logo.png'
import Connexion from './../images/Connexion.png'
import Deconnexion from './../images/Deconnexion.png'
import Inscription from './../images/Inscription.png'
import PNJ from './../images/pnj-profil.png'
import langue from './../images/langue.png'



const Navbar = () => {
    const uid = useContext(UidContext)
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
/*======================  CONNECTER ============================*/
            /*partie Gauchede la nav quand connecté*/
            <div className="Nav-log"> 
                <ul>
                    <div className="Nav-Log1">
                    <li>
                        <NavLink exact to="/">
                                <a href='#'>
                                    <p className='btn-salle'>Accès aux salles</p>
                                </a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/'>
                            <a href='#'>FAQ</a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/'>
                            <a href='#'>Contact</a>
                        </NavLink>
                    </li>
                    </div>
                    {/*partie droite de la nav quand connecté*/}
                    <div className='Nav-Log2'>
                    <li className="welcome">
                        <NavLink exact to="/profil">
                        <h5 className="Pseudo"><img className="pnj" src={PNJ} alt='Pnj'/>Valeur dynamique</h5>
                        </NavLink>
                    </li>
                    
                    
                    <Logout  />
                        
                    
                    <li>
                        <NavLink exact to="/">
                            <a>
                                <img className='img-padd' src={langue} alt="Langues"/>
                            </a>
                        </NavLink>
                    </li>
                    </div>
                </ul>
            </div>
          ) : (
//===========           //PAS CONNECTE //  ===============//
            <div className="Nav-log"> 
                <ul>
                    <div className="Nav-Log1">
                    <li>
                        <NavLink exact to="/">
                                
                                    <p className='btn-salle'>Accès aux salles</p>
                                
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/'>
                            <a href='#'>FAQ</a>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/'>
                            <a href='#'>Contact</a>
                        </NavLink>
                    </li>
                    </div>
                    {/*partie droite de la nav quand  pas connecté*/}

                    <div className='Nav-Log2'>
                    <li>
                        <NavLink exact to="/login">
                           
                                <img src={Connexion} alt="Langues"/>
                            
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/register">
                           
                                <img src={Inscription} alt="Langues"/>
                            
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/">
                           
                                <img src={langue} alt="Langues"/>
                            
                        </NavLink>
                    </li>
                    </div>
                </ul>
            </div>
          )}
        </div>

      </nav>
    );
  };
  
  export default Navbar;