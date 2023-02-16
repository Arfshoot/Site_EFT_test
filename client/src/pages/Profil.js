import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

// permet de check le user si connecter (via app.js) et si ca l'est change la redirection du user 

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
        {/*user conecté ? alors va sur page profil, autrement sur formulaire d'inscription*/}
      {uid ? (
        <div>UPDATE PROFIL</div>
      ) : (
        <div className="log-container">
        </div>
      )}
    </div>
  );
};

export default Profil;