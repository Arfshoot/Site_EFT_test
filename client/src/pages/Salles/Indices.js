import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from '../../actions/user.actions';
import { UidContext } from '../../components/AppContext';
import { ProductID } from '../../components/AppContext';
import './../../styles/Salle-indice.scss';

// import js et scss et images
import openposition from './../../images/salles/openpositions.png'
import barretrade from './../../images/salles/trade-exemple.png'
import publicAnnonce from './../../images/salles/Public announce.png'

//Import des sons
import Sound_default from './audio/new-message.mp3';
import Sound_Buy from './audio/buyBund.mp3'
import Sound_Sell from './audio/sellBund.mp3'
import Sound_Green from './audio/green.mp3'
import Sound_Orange from './audio/orange.mp3'
import Sound_Red from './audio/red.mp3'
import Sound_GOLong from './audio/goLong.mp3';
import Sound_GOShort from './audio/goShort.mp3';
import Sound_DAX from './audio/dax.mp3';
import Sound_BUND from './audio/bund.mp3';
import Sound_EURDOL from './audio/eurodollar.mp3';


const Indice = () => {
  const product = useContext(ProductID);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const isAdmin = uid && userData.role === 'admin' ? true : false;
  const moment = require('moment')
  
// utilisez des ports différents pour les connexions des clients
const socket = io('http://localhost:4002', {
  transports: ['websocket'],
  protocol: ['ws']
});
  
  function scrollToBottom() {
    const chatDiv = document.getElementById('msgContainer');
    //chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
  }




/*============== Socket io ==================*/
const pseudo = userData.pseudo
socket.on('connect', () => {
  console.log('Connected to Salle Indices server');
  socket.emit('pseudo', pseudo);
});
// On demande le pseudo + edit de l'onglet de la page avec le pseudo



document.title = pseudo + ' - ' + document.title;


    // ========= Boutons =========== // 

    // ========= Boutons =========== // 
    const onClickSend = (Value) => {
      const textInput = Value;
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    }

    
    // ============ Event ========== //

    // transmet le pseudo et la connection d'un user a l'admin
    socket.on('newUserIndice', (pseudo) => {
      createElementFunction('newUserIndice', pseudo);
      
    });

    // message all
    socket.on("newMessageAllIndice", (content) => {
      // Display message
      createElementFunction('newMessageAllIndice', content)
     
    });
    // vieux message
    socket.on('oldMessageIndice', (messages) => {
      messages.forEach( message => {
        if(message.sender === pseudo) {
          createElementFunction('oldMessagesMeIndice', message)
        } else {
          createElementFunction('oldMessagesIndice', message)
        }
      })
      
    })

    // écoute du user quit
    socket.on('quitUserIndice', (pseudo) => {
      createElementFunction('quitUserIndice', pseudo);
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
  }



  

  
/*=================== Fonction chat ===================*/

function createElementFunction(element, content) {
    const newElement = document.createElement('div');
    const formattedTimestamp = moment(content.timestamp).format('HH:mm:ss');
 
    // Select Sound to be played
    var audio = new Audio(Sound_default);
    switch (content){
      case "BUY":
        audio = new Audio(Sound_Buy);
        break;
      case "SELL":
        audio = new Audio(Sound_Sell);
        break;
      case "Green":
        audio = new Audio(Sound_Green);
        break;
      case "Orange":
        audio = new Audio(Sound_Orange);
        break;
      case "Red":
        audio = new Audio(Sound_Red);
        break;
      case "GO Long":
        audio = new Audio(Sound_GOLong);
        break;
      case "GO Short":
        audio = new Audio(Sound_GOShort);
        break;
      case "Ready for DAX":
        audio = new Audio(Sound_DAX);
        break;
      case "Ready for BUND":
        audio = new Audio(Sound_BUND);
        break;
      case "Ready for EUR/DOL":
        audio = new Audio(Sound_EURDOL);
        break;
      default:
        // audio = new Audio(Sound_default);         
    }
    // Use the right format to be sent to the backend for the message
    switch (element) {
      case 'newUserIndice':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        break; 

      case 'newMessageMeIndice':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + pseudo + ' : ' + content;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        audio.play();
        break;

      case 'newMessageAllIndice':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.pseudo + ' : ' + content.message;
        document.getElementById('msgContainer').appendChild(newElement);
        scrollToBottom();
        audio.play(); 
        break;

      case 'oldMessageIndice':
        newElement.classList.add( element, 'messages')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + content.content   ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        break;

      case 'oldMessagesMeIndice':
        newElement.classList.add('newMessageMeIndice', 'messages');
        newElement.textContent =  "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + content.content + ' - ' ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        break;

      case 'quitUserIndice':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a quitté le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        break; 

      default:
  }
}
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const textInput = document.getElementById('msgInputIndice').value;
    document.getElementById('msgInputIndice').value = '';
  
    if (textInput.length > 0) {
      socket.emit('newMessageIndice', textInput);
      createElementFunction('newMessageMeIndice', textInput);
    } else {
      return false;
    }
  }
  return (
      <div className='all-Indice'>
        
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
                <h1 className='titre'>Indice trading room</h1>
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
       {isAdmin && ( <>
    <div className='pannel'>
      
    <div className='Text'>
        <h2>Tickers</h2>
    </div>

    <div className='Bouton'>
        <button onClick={() => onClickSend('Ready For BUND')}>BUND</button>
      </div>
    
      <div className='Bouton'>
        <button onClick={() => onClickSend('Ready For CAC')}>CAC</button>
      </div>
      
      <div className='Bouton'>
        <button onClick={() => onClickSend('Ready for DAX')}>DAX</button>
      </div>
    
      <div className='Bouton'>
        <button onClick={() => onClickSend('Ready for FTSE')}>FTSE</button>
      </div>
      
      <div className='Bouton'>
        <button onClick={() => onClickSend('Ready for DJ')}>DJ</button>
      </div>
    
      <div className='Bouton'>
        <button onClick={() => onClickSend('Ready for Nsdq')}>Nsdq</button>
      </div>
      
      <div className='Bouton'>
        <button onClick={() => onClickSend('Cancel READY Signal')}>Cancel READY Signal</button>
      </div>  
      
      <div className='Text'>
        <h2>Current value</h2>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        const textInput = document.getElementById('Pricepoint').value;
        document.getElementById('Pricepoint').value = '';

        if (textInput.length > 0) {
          socket.emit('newMessageIndice', textInput);
          createElementFunction('newMessageMeIndice', textInput);
        } else {
          return false;
        }
      }}>
        <input type='text' placeholder='Current Value' id='Pricepoint' />
      </form>

      <form onSubmit={(e) => {
        e.preventDefault();
        const textInput = document.getElementById('FutrePricepoint').value;
        document.getElementById('FutrePricepoint').value = '';

        if (textInput.length > 0) {
          socket.emit('newMessageIndice', textInput);
          createElementFunction('newMessageMeIndice', textInput);
        } else {
          return false;
        }
      }}>
        <input type='text' placeholder='Future Value' id='FutrePricepoint' />
      </form>

      <div className='Bouton'>
          <button onClick={() => onClickSend('Buy Market')}>BUY Market</button>
      </div>  
    
      <div className='Bouton'>
        <button oonClick={() => onClickSend('Sell Market')}>SELL MARKET</button>
      </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('GAMBLE')}>THIS IS GAMBLE</button>
    </div>
    
    <div className='Text'>
        <h2>Signals</h2>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Green')}>Green</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Orange')}>Orange</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Red')}>Red</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Reinforce')}>Reinforce Position</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Objective')}>Objective</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('RSELLPlus')}>RSELL+</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('RSELL')}>RSELL</button>
    </div>


    <div className='Bouton'>
      <button onClick={() => onClickSend('RBUYPlus')}>RBUY+</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('RBUY')}>RBUY</button>
    </div>


    <div className='Text'>
      <h1>Information Lots</h1>
      <input type='text' placeholder='(X)' id='X' />
      <h3>=</h3>
      <input type='text' placeholder='(A)' id='A' />
      <h3>+</h3> 
      <input type='text' placeholder='(B)' id='B' />
      <h3>+</h3>
      <input type='text' placeholder='(C)' id='C' />
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('SendLOT')}>SEND</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('ResetLOT')}>RESET</button>
    </div>


    <div className='Bouton'>
      <button onClick={()=>onClickSend('GO Long')}>GO LONG</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Think Little Profit')}>Little</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Think BIG profit')}>BIG</button>
    </div>
    
    <div className='Bouton'>
      <button onClick={() => onClickSend('Exit Long')}>EXIT LONG</button>
    </div>


    <div className='Bouton'>
      <button onClick={() => onClickSend('Go short')}>GO SHORT</button>
    </div> 
     
    <div className='Bouton'>
      <button onClick={() => onClickSend('Think Little Profit')}>Little</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Think BIG profit')}>BIG</button>
    </div>
     
    <div className='Bouton'>
      <button onClick={() => onClickSend('Thint Short')}>EXIT SHORT</button>
    </div> 

    <div className='Bouton'>
      <button onClick={()=>onClickSend('ThinkProfiThink Profit')}>Think Profit</button>
    </div>
    
    <div className='Bouton'>
      <button onClick={()=>onClickSend('Cancel')}>Cancel READY Signal</button>
    </div> 

    <div className='Bouton'>
      <button onClick={() => onClickSend('Jingle')}>Jingle</button>
    </div>

    <div className='Bouton'>
      <button onClick={() => onClickSend('Stop @ entry price')}>STOP @ ENTRY PRICE</button>
    </div> 

    <div className='Text'>
      <h2>Instant-message</h2>
    </div>

      <select onChange={(e) => {
        const textInput = `${e.target.value}`;
        socket.emit('newMessageIndice', textInput);
        createElementFunction('newMessageMeIndice', textInput);
      }}>
        <option value=""></option>
        <option value="Bonjour !">Bonjour !</option>
        <option value="Bon appétit">Bon appétit</option>
        <option value="A demain">A demain</option>
      </select>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        const textInput = document.getElementById('directTextInput').value;
        document.getElementById('directTextInput').value = '';

        if (textInput.length > 0) {
          socket.emit('newMessageIndice', textInput);
          createElementFunction('newMessageMeIndice', textInput);
        } else {
          return false;
        }
      }}>
        <input type='text' placeholder='Message direct' id='directTextInput' />
        <button type='submit'>Envoyer</button>
      </form>
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
        <h1 className='titre'>Indice trading room</h1>
      </div>
      <div className='msgContainerAdmin' id='msgContainerAdmin'>           
      </div> 
      <div className="publicAnnonce">
        <div className="img-public">
          <img src={publicAnnonce} alt="img-hautparleur"></img>
        </div>
        <div className="annonceplublicadmin" id="annonceplublicadmin"></div>       
        <div>

        </div>
      </div>
    </div>
  </>
)}

      </div>
  );
}

export default Indice;