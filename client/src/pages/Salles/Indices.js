import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from '../../actions/user.actions';
import { UidContext } from '../../components/AppContext';
import './../../styles/Salle-indice.scss';

// import js et scss et images
import openposition from './../../images/salles/openpositions.png'
import barretrade from './../../images/salles/trade-exemple.png'
import publicAnnonce from './../../images/salles/Public announce.png'
const Indice = () => {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const isAdmin = uid && userData.role === 'admin' ? true : false;
  const moment = require('moment')
  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
  });
  
  function scrollToBottom() {
    const chatDiv = document.getElementById('msgContainer');
    chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
  }



/*============== Socket io ==================*/

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('getUsers');
    });
    // On demande le pseudo + edit de l'onglet de la page avec le pseudo
    var pseudo;

    //do {
    //  pseudo = prompt('quel est ton nom ?');
    //} while (!pseudo);
    
    socket.emit('pseudo', pseudo);
    
    //socket.on('pseudoError', (message) => {
      //alert(message);
     // document.location.href = '/'; // redirection vers une page d'erreur
    //});
    
    //socket.on('pseudoValid', (message) => {
    //  alert(message);
      // code pour accéder au service
    //});
    
    document.title = pseudo + ' - ' + document.title;







    // ============ Event ========== //

    // transmet le pseudo et la connection d'un user a l'admin
    socket.on('newUser', (pseudo) => {
      createElementFunction('newUser', pseudo);
      
    });

    // message all
    socket.on("newMessageAllIndice", (content) => {
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
    socket.on('quitUser', (pseudo) => {
      createElementFunction('quitUserIndice', pseudo);
    });





  

  
/*=================== Fonction chat ===================*/

    function createElementFunction(element, content) {
    const newElement = document.createElement('div');
    const formattedTimestamp = moment(content.timestamp).format('HH:mm:ss');

    switch (element) {
      case 'newUser':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        
        
        break; 
      case 'newMessageMeIndice':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + pseudo + ' : ' + content;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        
        
        break;
      case 'newMessageAllIndice':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.pseudo + ' : ' + content.message;
        document.getElementById('msgContainer').appendChild(newElement);
        scrollToBottom();
        break;
      case 'oldMessageIndice':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + content.content   ;
        document.getElementById('msgContainer').appendChild(newElement);
        scrollToBottom();
        
        break;
        case 'oldMessagesMeIndice':
          newElement.classList.add('newMessageMe', 'message');
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
       {isAdmin && (
  <>
    <div className='pannel'>
      <button onClick={() => {
        const textInput = "Message envoyé par le bouton direct";
        socket.emit('newMessageIndice', textInput);
        createElementFunction('newMessageAdminIndice', textInput);
      }}>Envoyer un message direct</button>

      <select onChange={(e) => {
        const textInput = `Option sélectionnée: ${e.target.value}`;
        socket.emit('newMessageIndice', textInput);
        createElementFunction('newMessageAdminIndice', textInput);
      }}>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>

      <input type='text' placeholder='Texte optionnel' id='optionalTextInput' />

      <button onClick={() => {
        const optionalText = document.getElementById('optionalTextInput').value;
        const textInput = `Message envoyé avec texte optionnel: ${optionalText}`;
        socket.emit('newMessageIndice', textInput);
        createElementFunction('newMessageAdminIndice', textInput);
      }}>Envoyer avec texte optionnel</button>

      <form onSubmit={(e) => {
        e.preventDefault();
        const textInput = document.getElementById('directTextInput').value;
        document.getElementById('directTextInput').value = '';

        if (textInput.length > 0) {
          socket.emit('newMessageIndice', textInput);
          createElementFunction('newMessageAdminIndice', textInput);
        } else {
          return false;
        }
      }}>
        <input type='text' placeholder='Message direct' id='directTextInput' />
        <button type='submit'>Envoyer directement dans le chat</button>
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
        <div className="annonceplublicadmin">texte</div>       
        <div>

        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="form-admin" >
        <input type='text' placeholder='Votre message' id='msgInputIndice' />
        <button type='submit'>Envoyer</button>
      </form>
    </div>
  </>
)}

      </div>
  );
}

export default Indice;