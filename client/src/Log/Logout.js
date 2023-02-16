import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import Deconnexion from './../images/Deconnexion.png'

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmed) {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true,
      })
        .then(() => removeCookie("jwt"))
        .catch((err) => console.log(err));
      
      window.location = "/";
    }
  };

  return (
    <li onClick={logout} >
      <img className='img-padd' src={Deconnexion} alt="logout" />
    </li>
  );
};

export default Logout;