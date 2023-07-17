import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from '../../actions/user.actions';
import { UidContext } from '../../components/AppContext';
import { ProductID } from '../../components/AppContext';
import  { Redirect } from 'react-router-dom';
import './../../styles/Salle-forex.scss';

// import js et scss et images
import openposition from './../../images/salles/openpositions.png';
import barretrade from './../../images/salles/trade-exemple.png';
import publicAnnonce from './../../images/salles/Public announce.png';
import cirque from './../../images/salles/cirque.png';

//Import des sons
import Sound_default from './audio/im.mp3';
import Sound_TheVTSignals from './audio/TheVTSignals.mp3';
import Sound_ThinkBigProfit from './audio/ThinkBigProfit.mp3';
import Sound_ThinkLittleProfit from './audio/ThinkLittleProfit.mp3';
import Sound_australiandollar from './audio/australiandollar.mp3';
import Sound_buyAustraliandollar from './audio/buyAustraliandollar.mp3';
import Sound_buyDollarswissfranc from './audio/buyDollarswissfranc.mp3';
import Sound_buyDollaryen from './audio/buyDollaryen.mp3';
import Sound_buyEurodollar from './audio/buyEurodollar.mp3';
import Sound_buyEuropound from './audio/buyEuropound.mp3';
import Sound_buyEuroyen from './audio/buyEuroyen.mp3';
import Sound_circus from './audio/circus.mp3';
import Sound_circus_1 from './audio/circus_1.mp3';
import Sound_circus_2 from './audio/circus_2.mp3';
import Sound_dollarswissfranc from './audio/dollarswissfranc.mp3';
import Sound_dollaryen from './audio/dollaryen.mp3';
import Sound_eurodollar from './audio/eurodollar.mp3';
import Sound_europond from './audio/europond.mp3';
import Sound_europound from './audio/europound.mp3';
import Sound_euroyen from './audio/euroyen.mp3';
import Sound_exit from './audio/exit.mp3';
import Sound_firework from './audio/firework.mp3';
import Sound_goLong from './audio/goLong.mp3';
import Sound_goShort from './audio/goShort.mp3';
import Sound_gold from './audio/gold.mp3';
import Sound_goodbye from './audio/goodbye.mp3';
import Sound_green from './audio/green.mp3';
import Sound_im from './audio/im.mp3';
import Sound_message from './audio/message.mp3';
import Sound_new_message from './audio/new-message.mp3';
import Sound_objective from './audio/objective.mp3';
import Sound_orange from './audio/orange.mp3';
import Sound_ready from './audio/ready.mp3';
import Sound_red from './audio/red.mp3';
import Sound_reinforcePosition from './audio/reinforcePosition.mp3';
import Sound_reinforcedPosition from './audio/reinforcedPosition.mp3';
import Sound_sellAustraliandollar from './audio/sellAustraliandollar.mp3';
import Sound_sellDollarswissfranc from './audio/sellDollarswissfranc.mp3';
import Sound_sellDollaryen from './audio/sellDollaryen.mp3';
import Sound_sellEurodollar from './audio/sellEurodollar.mp3';
import Sound_sellEuropound from './audio/sellEuropound.mp3';
import Sound_sellEuroyen from './audio/sellEuroyen.mp3';
import Sound_stayAside from './audio/stayAside.mp3';
import Sound_stop_entry_price from './audio/stop_entry_price.mp3';
import Sound_Gamble from './audio/im.mp3';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
//var SalleContext;

const FOREX = () => {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const isAdmin = uid && userData.role === 'admin' ? true : false;
  const moment = require('moment')


/*============== Socket io ==================*/
// utilisez des ports différents pour les connexions des clients
const socket = io('http://localhost:4001', {
  transports: ['websocket'],
  protocol: ['ws']
});

 const pseudo = userData.pseudo
    socket.on('connect',() => {
        socket.emit('pseudo', pseudo);
        // On demande le pseudo + edit de l'onglet de la page avec le pseudo
        document.title = pseudo + ' - Efficient Trading(Forex)';
    });

/*============== Gestion de la salles ==================*/

    // Affichage du dernier message
    function scrollToBottom(msgContainerbyID) {
      const chatDiv = document.getElementById(msgContainerbyID);
      chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
    }


    // ========= Boutons =========== // 
    const onClickSend = (Value) => {
      var textInput = Value;
      
      if (textInput.substring(0,9) == "Ready for") { document.getElementById('Ticker').value = textInput;};

      var currenttickers = document.getElementById('Ticker').value.substring(9);

      if (currenttickers != "") {

        if (textInput == "GO Long") { textInput = Value + currenttickers};
        if (textInput == "GO Short") { textInput = Value + currenttickers};
        if (textInput == "New Price") { textInput = Value + currenttickers};
        if (textInput == "Think Profit") { textInput = Value + currenttickers};
        if (textInput == "Reinforce") { textInput = Value + currenttickers};
        if (textInput == "Cancel") { textInput = Value + currenttickers};
        
        socket.emit('newMessageForex', textInput);
        createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput});
       
      } else {
        if (textInput == "Jingle")  {
          socket.emit('newMessageForex', textInput);
          createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput}); 
        }
      }
    }


  // ============ Event ========== //

    // transmet le pseudo et la connection d'un user a l'admin
    socket.on('newUserForex', (pseudo) => {
      var message =' a rejoint le chat';
      createElementFunction('newUserForex', {sender: pseudo, content: message});
      
    });

    // message all
    socket.on("newMessageAllForex", (message) => {
      createElementFunction('newMessageAllForex', message)
    });

    // vieux message
    socket.on('oldMessageForex', (messages) => {
      messages.forEach( message => {
        if(message.sender === pseudo) {
          createElementFunction('oldMessagesMeForex', message)
        } else {
          createElementFunction('oldMessagesForex', message)
        }
      });
      
    });

    // écoute du user quit
    socket.on('quitUserForex', (pseudo) => {
      var message = ' a quitté le chat';
      createElementFunction('quitUserForex', {sender: pseudo, content: message});
    });

    // message annonce 
    function createElementFunctionAnnonce(pseudo, message) {
      // Créer une nouvelle div avec l'ID spécifié
      const newDiv = document.createElement('div');
      newDiv.setAttribute('id', pseudo);
          // Ajouter le message à la div
    const messageNode = document.createTextNode(message);
    newDiv.appendChild(messageNode);
    
    // Ajouter la nouvelle div à la page
    const containerDiv = document.getElementById('annoncepublicadmin');
    containerDiv.appendChild(newDiv);
  };

/*=================== Fonction chat ===================*/

  function createElementFunction(element, content) {
    const newElement = document.createElement('div');

    // Heure du message
    const formattedTimestamp = moment(content.timestamp).format('HH:mm:ss');
    //Text a afficher 
    var TexttoDisplay=content.content;
    // Select Sound to be played
    var audio = new Audio(Sound_default);
    var preaudio = undefined; 

    //Traitement des messages
    switch (content.content){
      case "Ready for EUR/GBP":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_europound);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for GBP/USD":
        audio = new Audio(Sound_europound);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for EUR/USD":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_eurodollar);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for USD/JPY":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_dollaryen);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for USD/CHF":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_dollarswissfranc);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for AUD/USD":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_australiandollar);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for EUR/JPY":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_euroyen);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Cancel EUR/GBP":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_europound);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel GBP/USD":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_europound);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel EUR/USD":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_eurodollar);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel USD/JPY":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_dollaryen);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel USD/CHF":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_dollarswissfranc);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel AUD/USD":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_australiandollar);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel EUR/JPY":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_euroyen);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;

      // Traitement des Achats
      case "BuyMarket":
        audio = undefined;
        break;
      case "GO Long EUR/GBP":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyEuropound);
        break;
      case "GO Long GBP/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_goLong);
        break;
      case "GO Long EUR/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyEurodollar);
        break;
      case "GO Long USD/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyDollaryen);
        break;
      case "GO Long USD/CHF":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyDollarswissfranc);
        break;
      case "GO Long AUD/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyAustraliandollar);
        break;
      case "GO Long EUR/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyEuroyen);
        break;
      case "Exit Long EUR/GBP":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long GBP/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long EUR/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long USD/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long USD/CHF":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long AUD/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long EUR/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      
      // Traitement des Ventes
      case "Sell Market":
        audio = undefined;
        break;
      case "GO Short EUR/GBP":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellEuropound);
        break;
      case "GO Short GBP/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_goShort);
        break;
      case "GO Short EUR/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellEurodollar);
        break;
      case "GO Short USD/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellDollaryen);
        break;
      case "GO Short USD/CHF":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellDollarswissfranc);
        break;
      case "GO Short AUD/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellAustraliandollar);
        break;
      case "GO Short EUR/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellEuroyen);
        break;
      case "Exit Short EUR/GBP":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short GBP/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short EUR/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short USD/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short USD/CHF":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short AUD/USD":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short EUR/JPY":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;


      // Traitement des Pastilles
      case "Green":
         audio = new Audio(Sound_green);
        break;
      case "Orange":
         audio = new Audio(Sound_orange);
        break;
      case "Red":

         audio = new Audio(Sound_red);
        break;

      case "New Price":
        audio = new Audio(Sound_default);
        break; 
      case "Think Profit":
        audio = new Audio(Sound_default);
        break;
      case "Think Little Profit":
        audio = new Audio(Sound_ThinkLittleProfit);
        break;
      case "Think BIG Profit":
        audio = new Audio(Sound_ThinkBigProfit);
        break;
      case "Reinforce":
        audio = new Audio(Sound_reinforcePosition);
        TexttoDisplay='Reinforce Position';
        break;
      case "Reinforced":
        audio = new Audio(Sound_reinforcedPosition);
        TexttoDisplay='Position has been Reinforced';
        break; 
      case "Stay Out":
        audio = new Audio(Sound_stayAside);
        break;

        
      //Others Signals
      case "Stop @ entry price":
        audio = new Audio(Sound_stop_entry_price);
        break; 
      case "Cancel":
        audio = new Audio(Sound_exit);
        TexttoDisplay='Not Ready';
        break;  
      case "Jingle":
        audio = new Audio(Sound_TheVTSignals);
        TexttoDisplay='Bienvenue, notre session du jour commence.';
        break; 
      case "GAMBLE":
        audio = new Audio(Sound_Gamble);
        TexttoDisplay='<FONT SIZE="4pt" COLOR="#FF0000";>This is Gamble</FONT>';
        break;   
      case "Cirque":
        audio = new Audio(Sound_circus);
        TexttoDisplay='<img src='+cirque+' width="120">';
        break;   
      default:
         // audio = new Audio(Sound_default);         
    };

    switch (element) {
      case 'newUserForex':
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content.sender + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom('msgContainerAdmin');
        if (preaudio !== undefined) preaudio.play(); 
        if (audio !== undefined) audio.play();
        break; 

      case 'newMessageMeForex':
        newElement.classList.add(element, 'message')
        newElement.innerHTML = "[" + formattedTimestamp + "] " + '' + pseudo + ' : ' + TexttoDisplay;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom('msgContainerAdmin');
        if (preaudio !== undefined) preaudio.play(); 
        if (audio !== undefined) audio.play();
        break;

      case 'newMessageAllForex':
        newElement.classList.add(element, 'message')
        newElement.innerHTML = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + TexttoDisplay;
        document.getElementById('msgContainer').appendChild(newElement);
        if (preaudio !== undefined) preaudio.play();
        if (audio !== undefined) audio.play();
        scrollToBottom('msgContainer');
        break;

      case 'oldMessageForex':
        newElement.classList.add( element, 'messages')
        newElement.innerHTML = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + TexttoDisplay  ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom('msgContainerAdmin');
        break;

      case 'oldMessagesMeForex':
        newElement.classList.add('newMessageMeForex', 'messages');
        newElement.innerHTML =  "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + TexttoDisplay + ' - ' ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom('msgContainerAdmin');
        break;

      case 'quitUserForex':
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content.sender + ' a quitté le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        if (audio !== undefined) audio.play();
        scrollToBottom('msgContainerAdmin');
        break;
        
      default:   
  };
}
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const textInput = document.getElementById('annonceplublicadmin').value;
    document.getElementById('annonceplublicadmin').value = '';
  
    if (textInput.length > 0) {
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput});
    } else {
      return false;
    };
  };
  return (
      <div className='all-forex'>
        
        {!isAdmin && (
          <>
          
          <div className='chat-container'>
            <div className="entete-salle">
              <div className="open-position">
                <div>
                <img className='openposition-barre' src={openposition} alt="openposition"></img>
                </div>
                <div className="barre-trade">
                <img src={barretrade} alt='trade'></img>
                <img src={barretrade} alt='trade'></img>
                <img src={barretrade} alt='trade'></img>
              </div>
              </div>
            </div>
            <div className="titresalle">
                <h1 className='titre'>Forex trading room</h1>
              </div>
          </div>
            <div className='msgContainer' id='msgContainer'>           
            </div> 
            <div className="publicAnnonce">
              <div className="img-public">
                <img src={publicAnnonce} alt="img-hautparleur"></img>
                
              </div>
              <div className="annonceplublicadmin">texte</div>           
            </div>
          </>
        )}
       {isAdmin && (
  <>
    <div className='pannel'>
      <div className='Tickers'>
      <div className='Text'>
          <h2>Tickers</h2>
      </div>
        <div className='button-tickers1'>
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for EUR/GBP')}>EUR/GBP</button>
            </div>
          
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for GBP/USD')}>GBP/USD</button>
            </div>
            
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for USD/JPY')}>USD/JPY</button>
            </div>
          

        </div>
          <div className='button-tickers2'>
          <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for EUR/USD')}>EUR/DOL</button>
            </div>
            
              <div className='Bouton'>
                <button onClick={() => onClickSend('Ready for AUD/USD')}>AUD/USD</button>
              </div>
              
              <div className='Bouton'>
                <button onClick={() => onClickSend('Ready for EUR/JPY')}>EUR/JPY</button>
              </div>

        </div>
        <div className='button-tickers3'>

        <input  className='Form-Value' type='text' placeholder='Select a Ticker' id='Ticker' /> 

        <div className='Bouton-Buy'>
            <button onClick={() => onClickSend('Buy Market')}>BUY Market</button>
        </div>  
      
        <div className='Bouton-sell'>
          <button onClick={() => onClickSend('Sell Market')}>SELL MARKET</button>
        </div>
        </div>
      </div>



      <div className='CurrentValue'>
        <div className='Text'>
          <h2>Current value</h2>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          const textInput = document.getElementById('Pricepoint').value;
          document.getElementById('Pricepoint').value = '';

          if (textInput.length > 0) {
            socket.emit('newMessageForex', textInput);
            createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput});
          } else {
            return false;
          }
        }}>
          <input  className='Form-Value' type='text' placeholder='Current Value' id='Pricepoint' />
        </form>

      <div className='Bouton'>
        <button onClick={() => onClickSend('GAMBLE')}>THIS IS GAMBLE</button>
      </div>
    </div>



    <div className='Future-value'>
      <h2>Future Value</h2>
        <form onSubmit={(e) => {
              e.preventDefault();
              const textInput = document.getElementById('FutrePricepoint').value;
              document.getElementById('FutrePricepoint').value = '';

              if (textInput.length > 0) {
                socket.emit('newMessageForex', textInput);
                createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput});
              } else {
                return false;
              }
            }}>
              <input type='text' placeholder='Future Value' id='FutrePricepoint' />
            </form>

          <div className='Future-value-color'>  
            <div className='Bouton-green'>
              <button onClick={() => onClickSend('Green')}>Green</button>
            </div>

            <div className='Bouton-orange'>
              <button onClick={() => onClickSend('Orange')}>Orange</button>
            </div>

            <div className='Bouton-red'>
              <button onClick={() => onClickSend('Red')}>Red</button>
            </div>
          </div>
      </div>


<div className='Signals'>
      <div className='Long'>
        <h2>Long Signals</h2>
        <div className='Go-long'>
            <div className='Bouton'>
              <button onClick={()=>onClickSend('GO Long')}>GO LONG</button>
            </div>
        </div>
          <div className='profits'>
            <h2>Profits</h2>
              <div className='Bouton'>
                <button onClick={() => onClickSend('New Price')}>Little</button>
              </div>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Think Profit')}>BIG</button>
              </div>
          </div>
          
          <div className='Exit-Long'>
            <br></br>
            <div className='Bouton'>
              <button onClick={() => onClickSend('Exit Long')}>EXIT LONG</button>
            </div>
          </div>
      </div>

      <div className='Short'>
      <h2>Shorts Signals</h2>
      <div className='Go-short'>
          <div className='Bouton'>
            <button onClick={() => onClickSend('GO Short')}>GO SHORT</button>
          </div> 
      </div>    
      <div className='profits'>
            <h2>Profits</h2>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Think Little Profit')}>Little</button>
              </div>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Think BIG Profit')}>BIG</button>
              </div>
          </div>
          <div className='Think-profit'>
              <div className='Bouton'>
                <button onClick={()=>onClickSend('Stay Out')}>Stay Out</button>
              </div>
          </div>
          <div className='Exit-short'>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Exit Short')}>EXIT SHORT</button>
              </div>
          </div> 


      </div>
    </div> 
    <div className='Others'>
      <h2>Others signals</h2>
      <div className='Bouton'>
        <button onClick={() => onClickSend('Stop @ entry price')}>STOP @ ENTRY PRICE</button>
       </div> 
      <div className='Bouton'>
        <button onClick={()=>onClickSend('Cancel')}>Cancel READY Signal</button>
      </div>
      <div className='Bouton'>
        <button onClick={() => onClickSend('Jingle')}>Jingle</button>
      </div>
      <div className='Bouton'>
        <button onClick={() => onClickSend('Cirque')}>Cirque</button>
      </div>
    </div>  



<div className='Instant-message'>
  <div>
  <h2>Messagerie Instantanée</h2>
    <select onChange={(e) => {
      const textInput = `${e.target.value}`;
      if (textInput.length > 0) {
        socket.emit('newMessageForex', textInput);
        createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput});
      }
    }}>
      <option value=""></option>
      <option value="Bonjour !">Bonjour !</option>
      <option value="Bon appétit">Bon appétit</option>
      <option value="A demain">A demain</option>
    </select>

  </div>

  <div>
    <form onSubmit={(e) => {
      e.preventDefault();
      const textInput = document.getElementById('directTextInput').value;
      document.getElementById('directTextInput').value = '';

      if (textInput.length > 0) {
        socket.emit('newMessageForex', textInput);
        createElementFunction('newMessageMeForex', {sender: pseudo, content: textInput});
      } else {
        return false;
      }
    }}>
      <input type='text' placeholder='Saisir le message à envoyer' id='directTextInput' />
      <button type='submit'>Envoyer</button>
    </form>
    </div>
  </div>
</div>

    <div className='chat-container'>
      <div className="entete-salle">
        <div className="open-position">
          <div>
            <img className='openposition-barre' src={openposition} alt="openposition"></img>
          </div>
          <div className="barre-trade">
            <img src={barretrade} alt='trade'></img>
            <img src={barretrade} alt='trade'></img>
            <img src={barretrade} alt='trade'></img>
          </div>
        </div>
      </div>
      <div className="titresalle">
        <h1 className='titre'>Forex trading room</h1>
      </div>
      <div className='msgContainerAdmin' id='msgContainerAdmin'>           
      </div> 
      <div className="publicAnnonce">
        <div className="img-public">
          <img src={publicAnnonce} alt="img-hautparleur"></img>
      {/*    <input type="text" name="Annonce"></input>*/}
        </div>
        <div className="annonceplublicadmin" id="annonceplublicadmin">
          </div>       
        <div>

        </div>
      </div>
    </div>
  </>
)}

      </div>
  );
}

export default FOREX;