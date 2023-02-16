import React from 'react';
//js et scss
import './../styles/Footer.scss'
//image
import LogoHttp from './../images/LogoHTTP.png'
import LogoWeb from './../images/LogoWeb.png'
import LogoLinkedin from './../images/LogoLinkedin.png'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="All-Footer">
            <div className="Footer-P1">
                <NavLink className='P1-link' to="/mentions-legales">Mentions légales</NavLink>
                <NavLink className='P1-link' to="/politique-de-confidentialité">Politique de confidentialité</NavLink>
                <NavLink className='P1-link' to="/contact">Contact</NavLink>
            </div>
            <div className="Footer-P2">
                <div className="P2-LinkLogo">
                    <p>Site web réalisé par</p>
                    <a href="https://hoverthetop.fr/" target="_blank"><img src={LogoHttp}/></a>
                </div> 
                    
                <div className='P2-Link'>
                    <a href="https://hoverthetop.fr/" target='_blank'><img src={LogoWeb}/></a>
                    <a href="https://www.linkedin.com/company/hover-the-top" target="_blank"><img src={LogoLinkedin}/></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;