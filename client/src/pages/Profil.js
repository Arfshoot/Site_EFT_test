import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";


// js scss
import './../styles/Profil.scss';
// permet de check le user si connecter (via app.js) et si ca l'est change la redirection du user 

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil" >
        {/*user conecté ? alors va sur page profil, autrement sur formulaire d'inscription*/}
      {uid ? (
        <div ><UpdateProfil/></div>
      ) : (
        <div className="log-container">
        </div>
      )}
    </div>
  );
};

export default Profil;