import React, { useState } from 'react';

// scss
import './../styles/Contact.scss';

const Contact = () => {
  const [toEmail, setToEmail] = useState('');

  const handleEmailChange = (event) => {
    setToEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const toEmail = 'Contact@efficient-trading.com';
    const subject = document.getElementById('sujet').value;
    const message = document.getElementById('message').value;
  
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  
    // Ouvrir le lien mailto dans une nouvelle fenêtre ou un nouvel onglet
    window.open(mailtoLink, '_blank');
  
    // Réinitialiser les champs du formulaire
    setToEmail('');
    document.getElementById('sujet').selectedIndex = 0;
    document.getElementById('message').value = '';
  };

  return (
    <div className="All-contact">
      <div>
        <h1>Informations</h1>
        <p>
          Merci de saisir une adresse email valide. Dans le cas contraire, nous ne pourrons pas vous répondre. Nous
          faisons tout notre possible pour traiter vos questions sous 24 heures.
        </p>
        <p className="desc2">Il ne sera pas répondu aux mails discourtois.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Votre message</h1>
        <div className="input">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="to" value={toEmail} onChange={handleEmailChange} required />
        </div>
        <br />
        <div className="input">
          <label htmlFor="sujet">Sujet</label>
          <select id="sujet" required>
            <option value="Discussion d'ordre général">Discussion d'ordre général</option>
            <option value="Problème technique">Problème technique</option>
            <option value="Suggestions">Suggestions</option>
            <option value="Autre">Autre</option>
            {/*Les témoignages seront gérés autrement dans la page prévue à cet effet <Temoignages.js>*/}
          </select>
        </div>
        <div className="input">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
          <br />
        </div>
        <div className="btn-contact">
          <input id="submit" type="submit" value="Envoyer" />
          {/*<input type="reset" id='reset' value="Effacer"></input>*/}
        </div>
      </form>
    </div>
  );
};

export default Contact;
