import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
 // ou tout autre hook permettant d'accéder à l'état global de votre application
import './../../styles/ChoixSalles.scss';

const index = () => {
    //check abonnement {isPremium ? ( mes différentes lignes)}
//const isPremium = UseSelector(state => state.user.isPremium); // ou tout autre nom d'objet ou de propriété selon votre implémentation
return (
<div className='All-choixSalles'>
<h1 className="titrechoixsalle">Choisissez une salle</h1>
<div className="allcadre">
<div className='cadre'>
<div className="titrecadre"><p>Salle Forex</p></div>

<div className="corpcadre">   
        <p className='text-cadre' >A partir de</p>
        <p className='prix-cadre'>€ 12.12</p>
        <p className='text-cadre2'>par mois d'abonnement</p>    
    <button className="btn-abonnement">
        <NavLink to='/Salle-Forex' >Acceder à la salle</NavLink>
    </button>
</div>
<div className="bas-de-cadre">
    <ul>
        <li>Accès à la salle FOREX</li>
        <li>Départ Signaux</li>
    </ul>
</div>
</div>

<div className='cadre'>
<div className="titrecadre"><p>Salle Indice</p></div>
<div className="corpcadre">
        <p className='text-cadre' >A partir de</p>
        <p className='prix-cadre'>€ 12.12</p>
        <p className='text-cadre2'>par mois d'abonnement</p>
    <button className="btn-abonnement">
        <NavLink to='/Salle-Indice' >Acceder à la salle</NavLink>
    </button>
</div>
<div className="bas-de-cadre">
    <ul>
        <li>Accès à la salle INDICE</li>
        <li>Départ Signaux</li>
    </ul>
</div>
</div>
</div>
</div>
);
};

export default index;