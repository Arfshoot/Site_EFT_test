// info du user connecter

import { GET_USER, UPDATE_ADRESS, UPDATE_AGE, UPDATE_BROKER, UPDATE_CATEGORIESP, UPDATE_CODEPOSTAL, UPDATE_COMPLMTADRESS, UPDATE_CONNU, UPDATE_EMAIL, UPDATE_ETATPROV, UPDATE_FIRSTNAME, UPDATE_LASTNAME, UPDATE_PAYS, UPDATE_PHONE, UPDATE_RAISONS, UPDATE_SATUT, UPDATE_SECONDNAME, UPDATE_USERIP, UPDATE_VILLE } from '../actions/user.actions';



const initialState = {};



const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
    return action.payload
    
    case UPDATE_LASTNAME:
    return{
      ... state,
      lastName: action.payload
    }
    case UPDATE_FIRSTNAME: 
    return{
      ... state,
      firstName: action.payload
    }
    case UPDATE_SECONDNAME:
    return{
      ... state,
      secondName: action.payload
    }
    case UPDATE_EMAIL:
    return{
      ... state,
      email: action.payload
    }
    case UPDATE_ADRESS:
    return{
      ... state,
      adress: action.payload
    }
    case UPDATE_COMPLMTADRESS:
    return{
      ... state,
      complmtAdress: action.payload
    }
    case UPDATE_VILLE:
    return{
      ... state,
      ville: action.payload
    }
    case UPDATE_CODEPOSTAL: 
    return{
      ... state,
      codePostal: action.payload
    }
    case UPDATE_ETATPROV: 
    return{
      ... state,
      etatProv: action.payload
    }
    case UPDATE_PAYS: 
    return{
      ... state,
      pays: action.payload
    }
    case UPDATE_PHONE: 
    return{
      ... state,
      phone: action.payload
    }
    case UPDATE_AGE: 
    return{
      ... state,
      age: action.payload
    }
    case UPDATE_CATEGORIESP: 
    return{
      ... state,
      categorieSP: action.payload
    }
    case UPDATE_SATUT: 
    return{
      ... state,
      statut: action.payload
    }
    case UPDATE_RAISONS: 
    return{
      ... state,
      raisonS: action.payload
    }
    case UPDATE_CONNU: 
    return{
      ... state,
      connu: action.payload
    }
    case UPDATE_BROKER: 
    return{
      ... state,
      broker: action.payload
    }
    case UPDATE_USERIP: 
    return{
      ... state,
      userIp: action.payload
    }
    
    
    default: 
    return state
  }
  
  
};

export default userReducer;