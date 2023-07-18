import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ProductID, UidContext } from '../../components/AppContext';
import './../../styles/Salle-indice.scss';

// import js et scss et images
import publicAnnonce from './../../images/salles/Public announce.png';
import png_cirque from './../../images/salles/cirque.png';
import png_Green from './../../images/salles/green.png';
import openposition from './../../images/salles/openpositions.png';
import png_Orange from './../../images/salles/orange.png';
import png_Red from './../../images/salles/red.png';
import barretrade from './../../images/salles/trade-exemple.png';

//Import des sons
import Sound_TheVTSignals from './audio/TheVTSignals.mp3';
import Sound_ThinkBigProfit from './audio/ThinkBigProfit.mp3';
import Sound_ThinkLittleProfit from './audio/ThinkLittleProfit.mp3';
import Sound_bund from './audio/bund.mp3';
import Sound_buyBund from './audio/buyBund.mp3';
import Sound_buyCac from './audio/buyCac.mp3';
import Sound_buyDax from './audio/buyDax.mp3';
import Sound_buyDowjones from './audio/buyDowjones.mp3';
import Sound_buyFootsee from './audio/buyFootsee.mp3';
import Sound_buyNasdaq from './audio/buyNasdaq.mp3';
import Sound_cac from './audio/cac.mp3';
import Sound_circus from './audio/circus_2.mp3';
import Sound_dax from './audio/dax.mp3';
import Sound_dowjones from './audio/dowjones.mp3';
import Sound_exit from './audio/exit.mp3';
import Sound_footsee from './audio/footsee.mp3';
import Sound_green from './audio/green.mp3';
import Sound_Gamble from './audio/im.mp3';
import Sound_default from './audio/message.mp3';
import Sound_nasdaq from './audio/nasdaq.mp3';
import Sound_orange from './audio/orange.mp3';
import Sound_ready from './audio/ready.mp3';
import Sound_red from './audio/red.mp3';
import Sound_reinforcePosition from './audio/reinforcePosition.mp3';
import Sound_reinforcedPosition from './audio/reinforcedPosition.mp3';
import Sound_sellBund from './audio/sellBund.mp3';
import Sound_sellCac from './audio/sellCac.mp3';
import Sound_sellDax from './audio/sellDax.mp3';
import Sound_sellDowjones from './audio/sellDowjones.mp3';
import Sound_sellFootsee from './audio/sellFootsee.mp3';
import Sound_sellNasdaq from './audio/sellNasdaq.mp3';
import Sound_stayAside from './audio/stayAside.mp3';
import Sound_stop_entry_price from './audio/stop_entry_price.mp3';

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
    const chatDiv = document.getElementById('msgContainerAdmin');
    chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;
  }


/*============== Socket io ==================*/
const pseudo = userData.pseudo
  socket.on('connect', () => {
    console.log('Connected to Salle Indices server');
    socket.emit('pseudo', pseudo);
    // On demande le pseudo + edit de l'onglet de la page avec le pseudo
    document.title = pseudo + ' [Salle Indices] - Efficient-Trading';
  });

    
    // Gestion des Event //

    // transmet le pseudo et la connection d'un user a l'admin
    socket.on('newUserIndice', (pseudo) => {
      var message =' a rejoint le chat';
      createElementFunction('newUserIndice', { sender: pseudo, content: message});
      
    });

    // message all
    socket.on("newMessageAllIndice", (message) => {
      // Display message
      createElementFunction('newMessageAllIndice', message)
     
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
      var message = ' a quitté le chat';
      createElementFunction('quitUserIndice', { sender: pseudo, content: message});
      document.title = 'Efficient-Trading';
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
 
/*============== Fin Socket io ==================*/ 

  
/*=================== Fonction chat ===================*/

function createElementFunction(element, content) {
    const newElement = document.createElement('div');

    // Heure du message
    const formattedTimestamp = moment(content.timestamp).format('HH:mm:ss');
    //Text a afficher 
    var TexttoDisplay=content.content;
    // Select Sound to be played
    var preaudio = undefined;
    var audio = new Audio(Sound_default);

    //Traitement des messages
    switch (content.content){
      case "Ready for Bund":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_bund);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for CAC":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_cac);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for DAX":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_dax);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for FTSE":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_footsee);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Ready for DJ":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_dowjones);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;  
      case "Ready for Nsdq":
        preaudio = new Audio(Sound_ready);
        audio = new Audio(Sound_nasdaq);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT>';
        break;
      case "Cancel Bund":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_bund);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel CAC":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_cac);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel DAX":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_dax);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel FTSE":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_footsee);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;
      case "Cancel DJ":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_dowjones);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break;  
      case "Cancel Nsdq":
        preaudio = new Audio(Sound_default);
        audio = new Audio(Sound_nasdaq);
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#C0C0C0";>' + content.content+'</FONT><p> No Need to stand ready anymore</p>';
        break; 

      //Traitement des Achats
      case "BuyMarket":
        audio = undefined;
        break;
        case "GO Long DAX":
          TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
          audio = new Audio(Sound_buyDax);
          break;
        case "GO Long Bund":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyBund);
        break;
      case "GO Long CAC":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyCac);
        break;
      case "GO Long FTSE":
        TexttoDisplay='<span style="color:#008000";>' + content.content+'</span>';
        audio = new Audio(Sound_buyFootsee);
        break;
      case "GO Long DJ":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyDowjones);
        break;
      case "GO Long Nsdq":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_buyNasdaq);
        break;
      case "Exit Long":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long Bund":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long CAC":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long FTSE":
        TexttoDisplay='<span style="color:#008000";>' + content.content+'</span>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long DJ":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Long Nsdq":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#008000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;

      //Traitement des Ventes
      case "Sell Market":
        audio = undefined;
        break;
      case "GO Short Bund":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellBund);
        break;
        case "GO Short DAX":
          TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
          audio = new Audio(Sound_sellDax);
          break;
        case "GO Short CAC":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellCac);
        break;
      case "GO Short FTSE":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellFootsee);
        break;
      case "GO Short DJ":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellDowjones);
        break;
      case "GO Short Nsdq":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_sellNasdaq);
        break;
      // Traitement de l'exit short
      case "Exit Short Bund":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short CAC":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short FTSE":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short DJ":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break;
      case "Exit Short Nsdq":
        TexttoDisplay='<FONT SIZE="5pt" COLOR="#FF0000";>' + content.content+'</FONT>';
        audio = new Audio(Sound_exit);
        break; 
       
      //Traitement des Pastilles  
      case "Green":
        TexttoDisplay = '<img src='+png_Green+' width="20">';
        audio = new Audio(Sound_green);
        break;
      case "Orange":
        TexttoDisplay = '<img src='+png_Orange+' width="20">';
        audio = new Audio(Sound_orange);
        break;
      case "Red":
        TexttoDisplay = '<img src='+png_Red+' width="20">';   
        audio = new Audio(Sound_red);
        break;

      case "New Price":
        audio = new Audio(Sound_default);
        break; 
      case "Think Little Profit":
        TexttoDisplay='New Price';
        audio = new Audio(Sound_ThinkLittleProfit);
        break;
      case "Think Big Profit":
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
      case "Stay aside":
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
        TexttoDisplay='<img src='+png_cirque+' width="120">';
        break;   
      default:
        // audio = new Audio(Sound_default);         
    }
    // Use the right format to be sent to the backend for the message
    switch (element) {
      case 'newUserIndice':
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content.sender + ' a rejoint le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        if (preaudio !== undefined) preaudio.play(); 
        if (audio !== undefined) audio.play();
        break; 

      case 'newMessageMeIndice':
        newElement.classList.add(element, 'message')
        newElement.innerHTML = "[" + formattedTimestamp + "] " + '' + pseudo + ' : ' + TexttoDisplay;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        if (preaudio !== undefined) preaudio.play(); 
        if (audio !== undefined) audio.play();
        break;

      case 'newMessageAllIndice':
        newElement.classList.add(element, 'message')
        newElement.innerHTML = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + TexttoDisplay
        document.getElementById('msgContainer').appendChild(newElement);
        scrollToBottom();
        if (preaudio !== undefined) preaudio.play(); 
        if (audio !== undefined) audio.play(); 
        break;

      case 'oldMessageIndice':
        newElement.classList.add( element, 'messages')
        newElement.innerHTML = "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + TexttoDisplay   ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        break;

      case 'oldMessagesMeIndice':
        newElement.classList.add('newMessageMeIndice', 'messages');
        newElement.innerHTML =  "[" + formattedTimestamp + "] " + '' + content.sender + ' : ' + TexttoDisplay + ' - ' ;
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        break;

      case 'quitUserIndice':
        newElement.classList.add(element, 'message');
        newElement.innerHTML = content + ' a quitté le chat ';
        document.getElementById('msgContainerAdmin').appendChild(newElement);
        scrollToBottom();
        break; 

      default:
  }
}

 // ========= Gestion du clic des Boutons =========== // 
 const onClickSend = (Value) => {
  var textInput = Value;

  if (textInput.substring(0,9) == "Ready for") { document.getElementById('Ticker').value = textInput;};

  var currenttickers = document.getElementById('Ticker').value.substring(9);

  if (currenttickers != "") {

    if (textInput == "GO Long") { textInput = Value + currenttickers};
    if (textInput == "GO Short") { textInput = Value + currenttickers};
    if (textInput == "New Price") { textInput = Value + currenttickers};
    if (textInput == "Think Profit") { textInput = Value + currenttickers};
    if (textInput == "Reinforce Position") { textInput = Value + currenttickers};
    if (textInput == "Exit Long") { textInput = Value + currenttickers};
    if (textInput == "Exit Short") { textInput = Value + currenttickers};

    // Envoi du message à la socket pour les clients
    socket.emit('newMessageIndice', textInput );
    // Affichage du message sur la console
    createElementFunction('newMessageMeIndice', {sender: pseudo, content: textInput});

  } else {
    if (textInput == "Jingle")  {
      socket.emit('newMessageIndice', textInput);
      createElementFunction('newMessageMeIndice', {sender: pseudo, content: textInput}); 
    }
  }

}
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const textInput = document.getElementById('msgInputIndice').value;
    document.getElementById('msgInputIndice').value = '';
  
    if (textInput.length > 0) {
      socket.emit('newMessageIndice', textInput);
      createElementFunction('newMessageMeIndice',  {sender: pseudo, content: textInput});
    } else {
      return false;
    }
  };
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
      <div className='Tickers'>
      <div className='Text'>
          <h2>Tickers</h2>
      </div>
        <div className='button-tickers1'>
        <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for DAX')}>DAX</button>
            </div>
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for CAC')}>CAC</button>
            </div>
            <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for Bund')}>Bund</button>
            </div>            
        </div>
          <div className='button-tickers2'>
          <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for Nsdq')}>Nsdq</button>
          </div>

          <div className='Bouton'>
              <button onClick={() => onClickSend('Ready for DJ')}>DJ</button>
          </div>
            
          <div className='Bouton'>
            <button onClick={() => onClickSend('Ready for FTSE')}>FTSE</button>
          </div>

        </div>
        <div className='button-tickers3'>
          
        <input  className='Form-Value' type='text' placeholder='Select a Ticker' disabled='true' id='Ticker' /> 

        <div className='Bouton-Buy'>
            <button disable='true' onClick={() => onClickSend('Buy Market')}>BUY Market</button>
        </div>  
      
        <div className='Bouton-sell'>
          <button disable='true' onClick={() => onClickSend('Sell Market')}>SELL MARKET</button>
        </div>
        </div>
        
      </div>
      <div className='Future-value'>
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
          <div className='Placement-Boutton-Color'>

            <div className='Bouton-2'>
              <button onClick={() => onClickSend('Ready to SELL')}></button>
            </div>

            <div className='Bouton-4'>
              <button onClick={() => onClickSend('Ready to Buy')}></button>
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
            socket.emit('newMessageIndice', textInput);
            createElementFunction('newMessageMeIndice', {sender: pseudo, content: textInput});
          } else {
            return false;
          }
        }}>
          <input  className='Form-Value' type='text' placeholder='Current Value' id='Pricepoint' />
        </form>
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
                <button onClick={() => onClickSend('Think BIG profit')}>BIG</button>
              </div>
          </div>
          <div className='Exit-short'>
              <div className='Bouton'>
                <button onClick={() => onClickSend('Exit Short')}>EXIT SHORT</button>
              </div>
          </div> 


      </div>
    </div> 


    <div className='Future-value'>
      <h2>Future Value</h2>
        <form onSubmit={(e) => {
              e.preventDefault();
              const textInput = document.getElementById('FutrePricepoint').value;
              document.getElementById('FutrePricepoint').value = '';

              if (textInput.length > 0) {
                socket.emit('newMessageIndice', textInput);
                createElementFunction('newMessageMeIndice', {sender: pseudo, content: textInput});
              } else {
                return false;
              }
            }}>
              <input type='text' placeholder='Future Value' id='FutrePricepoint' />
            </form>

         
      </div>

    <div className='Others'>
      <h2>Others signals</h2>
      <div className='bouton1'>
        <button onClick={() => onClickSend('Stop @ entry price')}>STOP @ ENTRY PRICE</button>
       </div> 
      <div className='bouton2'>
        <button onClick={()=>onClickSend('Cancel')}>Cancel READY Signal</button>
      </div>
      <div className='bouton3'>
        <button onClick={() => onClickSend('Reinforce')}>Reinforce Position</button>
      </div>
      <div className='bouton4'>
        <button onClick={() => onClickSend('Reinforced')}>Position has been Reinforced</button>
      </div>
      <div className='bouton5'>
        <button onClick={() => onClickSend('GAMBLE')}>THIS IS GAMBLE</button>
      </div>
      <div className='bouton6'>
        <button onClick={() => onClickSend('Jingle')}>Jingle</button>
      </div>
      <div className='bouton7'>
        <button onClick={() => onClickSend('Cirque')}>Cirque</button>
      </div>
    </div>  




  <div className='Instant-message'>
    <h2>Messagerie Instantanée</h2>
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

    <div>
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