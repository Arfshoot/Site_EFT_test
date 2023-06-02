import React, { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { getUser } from '../../actions/user.actions';
import { UidContext } from '../../components/AppContext';
import './../../styles/Salle-forex.scss';

// import js et scss et images
import openposition from './../../images/salles/openpositions.png'
import barretrade from './../../images/salles/trade-exemple.png'
import publicAnnonce from './../../images/salles/Public announce.png'




const FOREX = () => {
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const isAdmin = uid && userData.role === 'admin' ? true : false;
  const moment = require('moment')
// utilisez des ports différents pour les connexions des clients
const socket = io('http://localhost:4001', {
  transports: ['websocket'],
});
  
  function scrollToBottom() {
    const chatDiv = document.getElementById('msgContainer');
    chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
  }



/*============== Socket io ==================*/
 const pseudo = userData.pseudo
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('pseudo', pseudo);
    });
    // On demande le pseudo + edit de l'onglet de la page avec le pseudo
   


    document.title = pseudo + ' - ' + document.title;





    // ========= Boutons =========== // 
    const audioRef = useRef(null);

       const onClickButton = () => {
      const audio = audioRef.current;
      audio.play();
      const textInput = "BUY";
      
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    };
    
    const onClickButton2 = () => {
      const audio = audioRef.current;
      audio.play();
      const textInput = "SELL";
      
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    };

    const onClickButton3 = () => {
      const audio = audioRef.current;
      audio.play();
      const textInput = "Green";
      
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    };

    const onClickButton4 = () => {
      const audio = audioRef.current;
      audio.play();
      const textInput = "Orange";
      
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    };

    const onClickButton5 = () => {
      const audio = audioRef.current;
      audio.play();
      const textInput = "Red";
      
      socket.emit('newMessageForex', textInput);
      createElementFunction('newMessageMeForex', textInput);
    };
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

    switch (element) {
      case 'newUserForex':
        newElement.classList.add(element, 'message');
        newElement.textContent = content + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);

        break; 
      case 'newMessageMeForex':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + pseudo + ' : ' + content;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        
        
        break;

      case 'newMessageAllForex':
        newElement.classList.add(element, 'message')
        newElement.textContent = "[" + formattedTimestamp + "] " + '' + content.pseudo + ' : ' + content.message;
        document.getElementById('msgContainer').appendChild(newElement);
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

     <div className='Bouton'>
      <audio ref={audioRef} src="../audio/BuyNow.mp3" />
      <button onClick={onClickButton}>BUY</button>
    </div>  
    
     <div className='Bouton'>
      <audio ref={audioRef} src="../audio/BuyNow.mp3" />
      <button onClick={onClickButton2}>SELL</button>
    </div>

    <div className='Bouton'>
      <audio ref={audioRef} src="../audio/BuyNow.mp3" />
      <button onClick={onClickButton3}>Green</button>
    </div>

    <div className='Bouton'>
      <audio ref={audioRef} src="../audio/BuyNow.mp3" />
      <button onClick={onClickButton4}>Orange</button>
    </div>

    <div className='Bouton'>
      <audio ref={audioRef} src="../audio/BuyNow.mp3" />
      <button onClick={onClickButton5}>Red</button>
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
        <h1 className='titre'>Forex trading room</h1>
      </div>
      <div className='msgContainerAdmin' id='msgContainerAdmin'>           
      </div> 
      <div className="publicAnnonce">
        <div className="img-public">
          <img src={publicAnnonce} alt="img-hautparleur"></img>
          <input type="text" name="Annonce"></input>
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