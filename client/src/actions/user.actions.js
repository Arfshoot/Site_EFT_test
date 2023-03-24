import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_LASTNAME = "UPDATE_LASTNAME"
export const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME"
export const UPDATE_SECONDNAME = "UPDATE_SECONDNAME"
export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const UPDATE_ADRESS = "UPDATE_ADRESS"
export const UPDATE_COMPLMTADRESS = "UPDATE_COMPLMTADRESS"
export const UPDATE_VILLE = "UPDATE_VILLE"
export const UPDATE_CODEPOSTAL = "UPDATE_CODEPOSTAL"
export const UPDATE_ETATPROV = "UPDATE_ETATPROV"
export const UPDATE_PAYS = "UPDATE_PAYS"
export const UPDATE_PHONE = "UPDATE_PHONE"
export const UPDATE_AGE = "UPDATE_AGE"
export const UPDATE_CATEGORIESP = "UPDATE_CATEGORIESP"
export const UPDATE_SATUT = "UPDATE_STATUT"
export const UPDATE_RAISONS = "UPDATE_RAISONS"
export const UPDATE_CONNU = "UPDATE_CONNU"
export const UPDATE_BROKER = "UPDATE_BROKER"
export const UPDATE_ROLE = "UPDATE_ROLE"
export const UPDATE_USERIP = "UPDATE_USERIP"
 

// recupération des user
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
    .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
    .then((res) => {
      // envoie de toute les infos trouver dans le reducer
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du lastname

export const updateLastName = (userId, lastName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { lastName },
    })
    .then((res) => {
      dispatch({ type: UPDATE_LASTNAME, payload: lastName });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du firstname

export const updateFirstName = (userId, firstName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { firstName },
    })
    .then((res) => {
      dispatch({ type: UPDATE_FIRSTNAME, payload: firstName });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du secondname

export const updateSecondName= (userId, secondName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { secondName },
    })
    .then((res) => {
      dispatch({ type: UPDATE_SECONDNAME, payload: secondName });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du EMAIL

export const updateEmail= (userId, email) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { email},
    })
    .then((res) => {
      dispatch({ type: UPDATE_EMAIL, payload: email });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du adress

export const updateAdress= (userId, adress) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { adress},
    })
    .then((res) => {
      dispatch({ type: UPDATE_ADRESS, payload: adress });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du COMPLMTADRESS

export const updateComplmtAdress= (userId, complmtAdress) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { complmtAdress},
    })
    .then((res) => {
      dispatch({ type: UPDATE_COMPLMTADRESS, payload: complmtAdress });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du VILLE

export const updateVille= (userId, ville) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { ville},
    })
    .then((res) => {
      dispatch({ type: UPDATE_VILLE, payload: ville });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du codepostal

export const updateCodePostal= (userId, codePostal) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { codePostal},
    })
    .then((res) => {
      dispatch({ type: UPDATE_CODEPOSTAL, payload: codePostal });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du etatprov

export const updateEtatProv= (userId, etatProv) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { etatProv},
    })
    .then((res) => {
      dispatch({ type: UPDATE_ETATPROV, payload: etatProv });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du PAYS

export const updatePays= (userId, pays) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { pays},
    })
    .then((res) => {
      dispatch({ type: UPDATE_PAYS, payload: pays });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du phone

export const updatePhone= (userId, phone) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { phone},
    })
    .then((res) => {
      dispatch({ type: UPDATE_PHONE, payload: phone });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du age

export const updateAge= (userId, age) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { age},
    })
    .then((res) => {
      dispatch({ type: UPDATE_AGE, payload: age });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du categorieSP

export const updateCategorieSP= (userId, categorieSP) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { categorieSP},
    })
    .then((res) => {
      dispatch({ type: UPDATE_CATEGORIESP, payload: categorieSP });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du statut

export const updateStatut= (userId, statut) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { statut},
    })
    .then((res) => {
      dispatch({ type: UPDATE_SATUT, payload: statut });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du raisonS

export const updateRaisonS= (userId, raisonS) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { raisonS},
    })
    .then((res) => {
      dispatch({ type: UPDATE_RAISONS, payload: raisonS });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du connu

export const updateConnu= (userId, connu) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { connu},
    })
    .then((res) => {
      dispatch({ type: UPDATE_CONNU, payload: connu });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du broker

export const updateBroker= (userId, broker) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { broker},
    })
    .then((res) => {
      dispatch({ type: UPDATE_BROKER, payload: broker });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation du Role

export const updateRole= (userId, role) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { role },
    })
    .then((res) => {
      dispatch({ type: UPDATE_ROLE, payload: role });
    })
    .catch((err) => console.log(err));
  };
};


// recuperation de USER IP

export const updateUserIp= (userId, userIp) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/`+userId,
      data: { userIp},
    })
    .then((res) => {
      dispatch({ type: UPDATE_USERIP, payload: userIp });
    })
    .catch((err) => console.log(err));
  };
};