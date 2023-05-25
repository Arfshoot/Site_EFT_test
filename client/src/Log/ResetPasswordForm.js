import React, { useState } from "react";
import axios from "axios";


// import js et scss

import "./../styles/ResetPasswordForm.scss";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/reset-password`, { email })
      .then((res) => {
        setSuccessMessage(res.data.message);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setSuccessMessage("");
      });
  };

  return (
    <div className="ResetPasswordForm">
      <form onSubmit={handleResetPassword}>
        <h2>Réinitialiser votre mot de passe</h2>
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
