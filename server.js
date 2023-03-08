const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const http = require('http');
const { checkUser, requireAuth } = require('./middelware/auth.middelware');
const cors = require('cors');
const  mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['sessionId', 'Content-Type'],
    credentials: true
  }
});
// determine le port qu'il doit utilisé dans notre fichier config
require('dotenv').config({path: './config/.env'})
// appel des fichiers 
require('./config/bd')

// CORS 

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false,
  optionsSuccessStatus: 204,
}  
app.use(cors(corsOptions));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// ============================ Socket.io ===================================== //
// enregistremen du pseudo 
//On va cherche les models 

require ('./models/sallemsg.model.js');
require('./models/room.model.js');
require('./models/user.model.js');
const User = mongoose.model('user');
const Chat = mongoose.model('Salle-Msg');
const Room = mongoose.model('room');

// connexion socket
io.on('connection', (socket) => {

  socket.on('pseudo', (pseudo) => {
    User.findOne({ pseudo: pseudo }, (err, user) => {
      if(err){
        console.log(err);
        socket.emit('error', 'Erreur de base de données');
      } else if(user) {
        socket.pseudo = pseudo;  
        socket.emit('pseudoValid', 'Pseudo valide'); //pseudo valide
        socket.pseudo = pseudo;  
        socket.broadcast.emit('newUser', pseudo) 
      }else{
        socket.emit('pseudoError', 'Pseudo invalide'); // pseudo invalide 
      }

      Chat.find({ sender: socket.pseudo }, function(err, messages) {
        if (err) {
            console.log(err);
        } else {
            socket.emit('oldMessage', messages);
        }
    });
      // message enregistrer en base
      socket.on('newMessage', (message) => {
        var chat = new Chat();
        chat.content = message;
        chat.sender = socket.pseudo;
        chat.timestamp = Date.now(); // Ajouter la date et l'heure actuelles
        chat.save();
        socket.broadcast.emit('newMessageAll', {message: message, pseudo: socket.pseudo});
      });
    // deconnection du user à la salle
    socket.on('disconnect', () => {
      socket.broadcast.emit('quitUser', socket.pseudo);
    });
        // writting  / not writting
    /*socket.on('writting', (pseudo) => {
      socket.broadcast.emit('writting', pseudo)
    })
    socket.on('writting', () => {
      socket.broadcast.emit('notWritting')
    })*/

    });
  });

});






server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});