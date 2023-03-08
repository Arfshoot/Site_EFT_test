import React, { useState } from "react";
import axios from "axios";


// js et scss
import './../styles/SignInForm.scss';
import { NavLink } from "react-router-dom";
// images

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
  
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user`,
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            if (res.data.role === 'admin') {
              window.location = "/admin";
            } else {
              window.location = "/";
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <div className="All-page-form">
      
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <div className="title-connexion">Connectez-vous</div>
        <div className="placement-connexion">
        <label htmlFor="email">Adresse mail</label>
        
        <input
          type="text"
          name="email"
          id="email"
          placeholder="paul.dupond@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <br/>
        <a className="forgot-register" href='#' alt="rest-password">Mot de passe oublié</a>
        <NavLink to='/register' className="forgot-register"alt="pas-inscrit">Pas encore de compte ?</NavLink>
        <br />
        <input type="submit" value="Connexion" id='btn-connexion'/>
        <div className="note"><p>Note : Vega-Traders n'autorise pas l'ouverture de plusieurs sessions simultanées. Si ceci se produit, vous serez déconnecté.</p></div>
        </div>
        
      </form>
      
    </div>
    
    
  );
};

export default SignInForm;