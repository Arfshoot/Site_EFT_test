import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Deconnexion from './../images/Deconnexion.png';
import "./../styles/Logout.scss";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleLogout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  const handleLogoutClick = () => {
    setShowConfirmationDialog(true);
  };

  const handleCancelClick = () => {
    setShowConfirmationDialog(false);
  };

  const handleConfirmClick = () => {
    handleLogout();
    setShowConfirmationDialog(false);
  };

  return (
    <>
      <li onClick={handleLogoutClick}>
        <img className="img-padd" src={Deconnexion} alt="logout" />
      </li>
      {showConfirmationDialog && (
        <div className="confirmation-dialog">
          <h2>Déconnexion</h2>
          <div className="button-wrapper">
            <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="btn-logout">
            <button className="secondary" onClick={handleCancelClick}>
              Annuler
            </button>
            <button className="btn-deco" onClick={handleConfirmClick}>Déconnexion</button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Logout;