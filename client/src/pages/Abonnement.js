import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import js et scss
import './../styles/Abonnement.scss';

// images
import PrixP from './../images/PrixP.png';
import PrixG from './../images/PrixG.png';

export default function Abonnement() {
  const [showSubscriptionOverlay, setShowSubscriptionOverlay] = useState(false);
  const [showSubscriptionOverlayIndice, setShowSubscriptionOverlayIndice] = useState(false);

  return (
    <div>
      <div className="box">
        <h1>Choisissez un abonnement</h1>
        <div className="All-box">
         
        <div className="One-box">
            <div className="Title-box">
              <h2>Salle Indice</h2>
            </div>
            <div className="Text-box">
              <p>A partir de</p>
              <img src={PrixP} alt="PrixG" />
              <p>Par jour d'abonnement</p>
              <div className="Foot-box">
                <p>2 premiers jours gratuit *</p>
              </div>
            </div>
            <p className="desc-foot">
              Message prévenant du caractère moins intéréssant de la salle forex.
              <br />
              <br />
              *Jours gratuit sous conditions de ...
            </p>
            <div >
              <button className="Button-box" onClick={() => setShowSubscriptionOverlay(true)}>Choisir un abonnement</button>

              {showSubscriptionOverlay && (
                <div className="overlay">
                  <div className="subscription-form">
                    <form>
                      <label htmlFor="subscription-select">Abonnement:</label>
                      <select name="subscription" id="subscription-select">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <br /><br />
                      
                    </form>
                    <div className="button-overlay">
                    <button type="submit">Souscrire</button>
                    <button className="close-button" onClick={() => setShowSubscriptionOverlay(false)}>Fermer</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="One-box">
            <div className="Title-box">
              <h2>Salle Indice</h2>
            </div>
            <div className="Text-box">
              <p>A partir de</p>
              <img src={PrixG} alt="PrixG" />
              <p>Par jour d'abonnement</p>
              <div className="Foot-box">
                <p>2 premiers jours gratuit *</p>
              </div>
            </div>
            <p className="desc-foot">
              Message prévenant du caractère moins intéréssant de la salle forex.
              <br />
              <br />
              *Jours gratuit sous conditions de ...
            </p>
            <div>
              <button  className="Button-box" onClick={() => setShowSubscriptionOverlayIndice(true)}>Choisir un abonnement</button>

              {showSubscriptionOverlayIndice && (
                <div className="overlay">
                  <div className="subscription-form">
                    <form>
                      <label htmlFor="subscription-select">Abonnement:</label>
                      <select name="subscription" id="subscription-select">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <br /><br />
                      
                    </form>
                    <div className="button-overlay">
                    <button type="submit">Souscrire</button>
                    <button className="close-button" onClick={() => setShowSubscriptionOverlayIndice(false)}>Fermer</button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
