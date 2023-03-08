import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from '../../actions/user.actions';
import { UidContext } from './../../components/AppContext';
import './../../styles/Salle-forex.scss';

const FOREX = () => {
  const uid = useContext(UidContext);
  const [loadUser, setLoadUser] = useState(true);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const lastName = userData.lastName;
  const isAdmin = uid && userData.role === 'admin' ? true : false;
  
  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
  });

/*============== Socket io ==================*/

    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('getUsers');
    });
    // On demande le pseudo + edit de l'onglet de la page avec le pseudo
    var pseudo;

    do {
      pseudo = prompt('quel est ton nom ?');
    } while (!pseudo);
    
    socket.emit('pseudo', pseudo);
    
    socket.on('pseudoError', (message) => {
      alert(message);
      document.location.href = '/'; // redirection vers une page d'erreur
    });
    
    socket.on('pseudoValid', (message) => {
      alert(message);
      // code pour accéder au service
    });
    
    document.title = pseudo + ' - ' + document.title;
    // ============ Event ========== //

    // transmet le pseudo et la connection d'un user a l'admin
    socket.on('newUser', (pseudo) => {
      createElementFunction('newUser', pseudo);
      
    });

    // message all
    socket.on("newMessageAll", (content) => {
      createElementFunction('newMessageAll', content)
    });
    // vieux message
    socket.on('oldMessage', (messages) => {
      messages.forEach( message => {
        if(message.sender === pseudo) {
          createElementFunction('oldMessagesMe', message)
        } else {
          createElementFunction('oldMessages', message)
        }
      })
      
    })
    //writting  - notwWritting
    socket.on("writting", (pseudo) => {
      document.getElementById('isWritting').textContent = pseudo + 'est en train d\écrire';
    })
    socket.on("notWritting", () => {
      document.getElementById('isWritting').textContent = '';
    })
    // écoute du user quit
    socket.on('quitUser', (pseudo) => {
      createElementFunction('quitUser', pseudo);
    });





  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const textInput = document.getElementById('msgInput').value;
    document.getElementById('msgInput').value = '';
  
    if (textInput.length > 0) {
      socket.emit('newMessage', textInput);
      createElementFunction('newMessageMe', textInput);
    } else {
      return false;
    }
  }
  
/*=================== Fonction chat ===================*/
    // writting
/*
    const writting = () => {
   
      socket.emit("writting", pseudo);
    };
    
    const notWritting = () => {
      socket.emit("notWritting");
    };
    
*/
    function createElementFunction(element, content) {
    const newElement = document.createElement('div');

    switch (element) {
      case 'newUser':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        break; 
      case 'newMessageMe':
        newElement.classList.add(element, 'message')
        newElement.textContent = pseudo + ':' + content;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        break;
      case 'newMessageAll':
        newElement.classList.add(element, 'message')
        newElement.textContent = content.pseudo + ':' + content.message;
        document.getElementById('msgContainer').appendChild(newElement);
        break;
      case 'oldMessages':
        newElement.classList.add(element, 'message')
        newElement.textContent = content.sender + ':' + content.content;
        document.getElementById('msgContainer').appendChild(newElement);
        break;
      case 'oldMessagesMe':
        newElement.classList.add('newMessageMe', 'message')
        newElement.textContent =  content.sender + ':' + content.content;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        break;

     /* case "writting":
        document.getElementById("isWritting").textContent = `${content} est en train d'écrire`;
        break;*/
      case 'quitUser':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a quitté le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        break; 
  }
}

  return (
      <div className='all-forex'>
        <h1> Bienvenue dans la salle Forex</h1>
        <div className='channelList'>
          <h2>Liste des Salles</h2>
          <ul id='roomList'></ul>
        </div>
        {!isAdmin && (
          <>
          <div className='chat-container' id="isWritting">
             </div>
            <div className='msgContainer' id='msgContainer'>
            </div> 
          </>
        )}
        {isAdmin && (
          <div className='chat-container'>
            <div className='msgContainerAdmin' id='msgContainerAdmin'>
            </div>
            <div >
            <form onSubmit={handleFormSubmit} >
            <input type='text' placeholder='Votre message' id='msgInput' /*onFocus={writting} onKeyDown={writting} onBlur={notWritting}  autoFocus*/ />

              <button type='submit'>Envoyer</button>
            </form>
            </div>
          </div>
        )}
      </div>
  );
}

export default FOREX;
