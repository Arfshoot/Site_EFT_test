import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from '../../actions/user.actions';
import { UidContext } from '../../components/AppContext';
import { ProductID } from '../../components/AppContext';
import './../../styles/Salle-forex.scss';

// import js et scss et images
import openposition from './../../images/salles/openpositions.png'
import barretrade from './../../images/salles/trade-exemple.png'
import publicAnnonce from './../../images/salles/Public announce.png'

//Import des sons
import Sound_default from './audio/message.mp3';
import Sound_buyNow from './audio/BuyNow.mp3';
import Sound_TheVTSignals from './audio/TheVTSignals.mp3';
import Sound_ThinkBigProfit from './audio/ThinkBigProfit.mp3';
import Sound_ThinkLittleProfit from './audio/ThinkLittleProfit.mp3';
import Sound_australiandollar from './audio/australiandollar.mp3';
import Sound_bund from './audio/bund.mp3';
import Sound_buyAustraliandollar from './audio/buyAustraliandollar.mp3';
import Sound_buyBund from './audio/buyBund.mp3';
import Sound_buyCable from './audio/buyCable.mp3';
import Sound_buyCac from './audio/buyCac.mp3';
import Sound_buyDax from './audio/buyDax.mp3';
import Sound_buyDollarswissfranc from './audio/buyDollarswissfranc.mp3';
import Sound_buyDollaryen from './audio/buyDollaryen.mp3';
import Sound_buyDowjones from './audio/buyDowjones.mp3';
import Sound_buyEurodollar from './audio/buyEurodollar.mp3';
import Sound_buyEuropound from './audio/buyEuropound.mp3';
import Sound_buyEuroyen from './audio/buyEuroyen.mp3';
import Sound_buyFootsee from './audio/buyFootsee.mp3';
import Sound_buyGold from './audio/buyGold.mp3';
import Sound_buyNasdaq from './audio/buyNasdaq.mp3';
import Sound_buySilver from './audio/buySilver.mp3';
import Sound_buyWti from './audio/buyWti.mp3';
import Sound_cable from './audio/cable.mp3';
import Sound_cac from './audio/cac.mp3';
import Sound_circus from './audio/circus.mp3';
import Sound_circus_1 from './audio/circus_1.mp3';
import Sound_circus_2 from './audio/circus_2.mp3';
import Sound_dax from './audio/dax.mp3';
import Sound_dollarswissfranc from './audio/dollarswissfranc.mp3';
import Sound_dollaryen from './audio/dollaryen.mp3';
import Sound_dowjones from './audio/dowjones.mp3';
import Sound_eurodollar from './audio/eurodollar.mp3';
import Sound_europond from './audio/europond.mp3';
import Sound_europound from './audio/europound.mp3';
import Sound_euroyen from './audio/euroyen.mp3';
import Sound_exit from './audio/exit.mp3';
import Sound_firework from './audio/firework.mp3';
import Sound_footsee from './audio/footsee.mp3';
import Sound_goLong from './audio/goLong.mp3';
import Sound_goShort from './audio/goShort.mp3';
import Sound_gold from './audio/gold.mp3';
import Sound_goodbye from './audio/goodbye.mp3';
import Sound_green from './audio/green.mp3';
import Sound_im from './audio/im.mp3';
import Sound_message from './audio/message.mp3';
import Sound_nasdaq from './audio/nasdaq.mp3';
import Sound_new_message from './audio/new-message.mp3';
import Sound_objective from './audio/objective.mp3';
import Sound_orange from './audio/orange.mp3';
import Sound_ready from './audio/ready.mp3';
import Sound_red from './audio/red.mp3';
import Sound_reinforcePosition from './audio/reinforcePosition.mp3';
import Sound_reinforcedPosition from './audio/reinforcedPosition.mp3';
import Sound_sellNow from './audio/sellBund.mp3';
import Sound_sellAustraliandollar from './audio/sellAustraliandollar.mp3';
import Sound_sellBund from './audio/sellBund.mp3';
import Sound_sellCable from './audio/sellCable.mp3';
import Sound_sellCac from './audio/sellCac.mp3';
import Sound_sellDax from './audio/sellDax.mp3';
import Sound_sellDollarswissfranc from './audio/sellDollarswissfranc.mp3';
import Sound_sellDollaryen from './audio/sellDollaryen.mp3';
import Sound_sellDowjones from './audio/sellDowjones.mp3';
import Sound_sellEurodollar from './audio/sellEurodollar.mp3';
import Sound_sellEuropound from './audio/sellEuropound.mp3';
import Sound_sellEuroyen from './audio/sellEuroyen.mp3';
import Sound_sellFootsee from './audio/sellFootsee.mp3';
import Sound_sellGold from './audio/sellGold.mp3';
import Sound_sellNasdaq from './audio/sellNasdaq.mp3';
import Sound_sellSilver from './audio/sellSilver.mp3';
import Sound_sellWti from './audio/sellWti.mp3';
import Sound_silver from './audio/silver.mp3';
import Sound_stayAside from './audio/stayAside.mp3';
import Sound_stop_entry_price from './audio/stop_entry_price.mp3';
import Sound_wti from './audio/wti.mp3';


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
    socket.on('connect', () => {
      console.log('Connected Salle Forex to the server');
      socket.emit('pseudo', pseudo);
    });
    // On demande le pseudo + edit de l'onglet de la page avec le pseudo
   
    document.title = pseudo + ' - ' + document.title;

/*============== Gestion de la salles ==================*/

    // Affichage du dernier message
    function scrollToBottom() {
      const chatDiv = document.getElementById('msgContainer');
      //const maxScrollTop = chatDiv.scrollHeight - chatDiv.clientHeight; 
      //chatDiv.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  

    // ========= Boutons =========== // 
    const onClickSend = (Value) => {
      const textInput = Value;
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    }


  // ============ Event ========== //

    // transmet le pseudo et la connection d'un user a l'admin
    socket.on('newUserForex', (pseudo) => {
      createElementFunction('newUserForex', pseudo);
      
    });

    // message all
    socket.on("newMessageAllForex", (content) => {
      createElementFunction('newMessageAllForex', content)
    });
    // vieux message
    socket.on('oldMessageForex', (messages) => {
      messages.forEach( message => {
        if(message.sender === pseudo) {
          createElementFunction('oldMessagesMeForex', message)
        } else {
          createElementFunction('oldMessagesForex', message)
        }
      })
      
    })

    // écoute du user quit
    socket.on('quitUserForex', (pseudo) => {
      createElementFunction('quitUserForex', pseudo);
    });

    // message annonce 
    function createElementFunction(pseudo, message) {
      // Créer une nouvelle div avec l'ID spécifié
      const newDiv = document.createElement('div');
      newDiv.setAttribute('id', pseudo);
          // Ajouter le message à la div
    const messageNode = document.createTextNode(message);
    newDiv.appendChild(messageNode);
    
    // Ajouter la nouvelle div à la page
    const containerDiv = document.getElementById('annoncepublicadmin');
    containerDiv.appendChild(newDiv);
  }

/*=================== Fonction chat ===================*/

    function createElementFunction(element, content) {
    const newElement = document.createElement('div');
    const formattedTimestamp = moment(content.timestamp).format('HH:mm:ss');
    // Select Sound to be played
    var audio = new Audio(Sound_default);
    switch (content){
      case "BUY":
        audio = new Audio(Sound_buyNow);
        break;
      case "SELL":
        audio = new Audio(Sound_sellNow);
        break;
      case "Green":
         audio = new Audio(Sound_green);
        break;
      case "Orange":
         audio = new Audio(Sound_orange);
        break;
      case "Red":
         audio = new Audio(Sound_red);
        break;
      case "GO Long":
      audio = new Audio(Sound_goLong);
        break;
      case "GO Short":
        audio = new Audio(Sound_goShort);
        break;
      case "Ready for DAX":
        audio = new Audio(Sound_dax);
        break;
      case "Ready for BUND":
        audio = new Audio(Sound_bund);
        break;
      case "Ready for EUR/DOL":
      audio = new Audio(Sound_eurodollar);
        break;
      default:
        // audio = new Audio(Sound_default);         
    }
    switch (element) {
      case 'newUserForex':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        if (audio !== undefined) audio.play();
        break; 
      case 'newMessageMeForex':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + pseudo + ' : ' + content;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        if (audio !== undefined) audio.play();
        break;

      case 'newMessageAllForex':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.pseudo + ' : ' + content.message;
        document.getElementById('msgContainer').appendChild(newElement);
        if (audio !== undefined) audio.play();
        scrollToBottom();
        break;

      case 'oldMessageForex':
        newElement.classList.add( element, 'messages')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + content.content   ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        
        break;
        case 'oldMessagesMeForex':
          newElement.classList.add('newMessageMeForex', 'messages');
          newElement.textContent =  "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + content.content + ' - ' ;
          document.getElementById('msgContainerAdmin').appendChild(newElement);
          scrollToBottom();
         
          break;
      case 'quitUserForex':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a quitté le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        if (audio !== undefined) audio.play();
        scrollToBottom();
        break; 
        
          
  }
}
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const textInput = document.getElementById('annonceplublicadmin').value;
    document.getElementById('annonceplublicadmin').value = '';
  
    if (textInput.length > 0) {
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    } else {
      return false;
    }
  }
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
              <button onClick={() => onClickSend('Ready For EUR/GBP')}>EUR/GBP</button>
            </div>
          
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready For GBP/USD')}>GBP/USD</button>
            </div>
            
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for USD/JPY')}>USD/JPY</button>
            </div>
          
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for EUR/DOL')}>EUR/DOL</button>
            </div>
        </div>
          <div className='button-tickers2'>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Ready for EUR/CHF')}>EUR/CHF</button>
              </div>
            
              <div className='Bouton'>
                <button onClick={() => onClickSend('Ready for AUD/USD')}>AUD/USD</button>
              </div>
              
              <div className='Bouton'>
                <button onClick={() => onClickSend('Ready for EUR/JPY')}>EUR/JPY</button>
              </div>

        </div>
        <div className='button-tickers3'>
          
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
            createElementFunction('newMessageMeForex', textInput);
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
                createElementFunction('newMessageMeForex', textInput);
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



    <div className='Premium'>
      <div className='Text'>
          <h2>Premium</h2>
      </div>

      <div className='Bouton-renforce'>
        <button onClick={() => onClickSend('Reinforce')}>Reinforce Position</button>
      </div>

      {/*<div className='Bouton'>
        <button onClick={() => onClickSend('Objective')}>Objective</button>
          </div>*/}
      <div><h2>Objective</h2></div>
      <div className='Placement-Boutton-Color'>
        <div className='Bouton-1'>
          <button onClick={() => onClickSend('RSELLPlus')}></button>
        </div>

        <div className='Bouton-2'>
          <button onClick={() => onClickSend('RSELL')}></button>
        </div>

        <div className='Bouton-3'>
          <button onClick={() => onClickSend('RBUYPlus')}></button>
        </div>

        <div className='Bouton-4'>
          <button onClick={() => onClickSend('RBUY')}></button>
        </div>
      </div>
    </div>

    <div className='Lots'>
      <h2>Information Lots</h2>
      <div className='Lots-input'>
          <h3>X</h3>
          <input type='text' placeholder='(X)' id='X' />
          <h3>= A</h3>
          <input type='text' placeholder='(A)' id='A' />
          <h3>+ B</h3> 
          <input type='text' placeholder='(B)' id='B' />
          <h3>+ C</h3>
          <input type='text' placeholder='(C)' id='C' />
      </div>
      <div className='Lots-Bouton'>
          <div className='Bouton'>
          <button onClick={() => onClickSend('SendLOT')}>SEND</button>
        </div>

        <div className='Bouton-reset'>
          <button onClick={() => onClickSend('ResetLOT')}>RESET</button>
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
                <button onClick={() => onClickSend('Think Little Profit')}>Little</button>
              </div>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Think BIG profit')}>BIG</button>
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
            <button onClick={() => onClickSend('Go short')}>GO SHORT</button>
          </div> 
      </div>    
      <div className='profits'>
            <h2>Profits</h2>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Think Little Profit')}>Little</button>
              </div>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Think BIG profit')}>BIG</button>
              </div>
          </div>
          <div className='Think-profit'>
              <div className='Bouton'>
                <button onClick={()=>onClickSend('ThinkProfiThink Profit')}>Think Profit</button>
              </div>
          </div>
          <div className='Exit-short'>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Thint Short')}>EXIT SHORT</button>
              </div>
          </div> 


      </div>
    </div> 
    <div className='Others'>
        <h2>Others signals</h2>
          <div className='Bouton'>
            <button onClick={()=>onClickSend('Cancel')}>Cancel READY Signal</button>
          </div>
          <div className='Bouton'>
      <button onClick={() => onClickSend('Jingle')}>Jingle</button>
    </div>

    </div>  



<div className='Instant-message'>
  
  <div>
 
    <div className='Bouton'>
      <button onClick={() => onClickSend('Stop @ entry price')}>STOP @ ENTRY PRICE</button>
    </div> 
        
      <select onChange={(e) => {
        const textInput = `${e.target.value}`;
        socket.emit('newMessageForex', textInput);
        createElementFunction('newMessageMeForex', textInput);
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
          createElementFunction('newMessageMeForex', textInput);
        } else {
          return false;
        }
      }}>
        <input type='text' placeholder='   Message direct' id='directTextInput' />
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