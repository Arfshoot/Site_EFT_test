import React, { useContext } from "react";
import Log from "../Log";
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
          <Log signin={false} signup={true} />
          <div className="img-container">
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;