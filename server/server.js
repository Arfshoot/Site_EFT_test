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
const httpServer = http.createServer(app);
const httpServer1 = http.createServer(app);
const httpServer2 = http.createServer(app);
const { Server: SocketIOServer } = require('socket.io');


// determine le port qu'il doit utilisé dans notre fichier config
require('dotenv').config({path: './config/.env'})
// appel des fichiers 
require('./config/bd')

// CORS 

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
  
  'allowedHeaders': ['sessionId', 'Content-Type', "All"],
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

require ('./models/salleForex.model.js');
require('./models/user.model.js');
require ('./models/salleIndice.model.js')
const User = mongoose.model('user');
const Chat = mongoose.model('SalleForex');
const Indice = mongoose.model('SalleIndice')


// connexion socket//
// instance de SocketIO pour la salle de chat Forex
const ioForex = new SocketIOServer(httpServer1, {
  cors: {
    path: '/salle-forex', // nom de route différent
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['sessionId', 'Content-Type'],
    credentials: true
  }
});

ioForex.on('connection', (socket) => {

  socket.on('pseudo', (pseudo) => {
    User.findOne({ pseudo: pseudo }, (err, user) => {
      if(err){
        console.log(err);
        socket.emit('error', 'Erreur de base de données');
      } else if(user) {
        socket.pseudo = pseudo;  
        socket.emit('pseudoValid', 'Pseudo valide'); //pseudo valide
        socket.pseudo = pseudo;  
        socket.broadcast.emit('newUserForex', pseudo) 
      }else{
        socket.emit('pseudoError', 'Pseudo invalide'); // pseudo invalide 
      }

      Chat.find({ sender: socket.pseudo }, function(err, messages) {
        if (err) {
            console.log(err);
        } else {
            socket.emit('oldMessageForex', messages);
        }
    });
      // message enregistrer en base
      socket.on('newMessageForex', (message) => {
        var chat = new Chat();
        chat.content = message;
        chat.sender = socket.pseudo;
        chat.timestamp = Date.now(); // Ajouter la date et l'heure actuelles
        chat.save();
        socket.broadcast.emit('newMessageAllForex', {message: message, pseudo: socket.pseudo});
      });
    // deconnection du user à la salle
    socket.on('disconnect', () => {
      socket.broadcast.emit('quitUserForex', socket.pseudo);
    });


    });
  });

});

// instance de SocketIO pour la salle de chat Indice
const ioIndice = new SocketIOServer(httpServer2, {
  
  cors: {
    path: '/salle-indice', // nom de route différent
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['sessionId', 'Content-Type'],
    credentials: true
  }
});


ioIndice.on('connection', (socket) => {

  socket.on('pseudo', (pseudo) => {
    User.findOne({ pseudo: pseudo }, (err, user) => {
      if(err){
        console.log(err);
        socket.emit('error', 'Erreur de base de données');
      } else if(user) {
        socket.pseudo = pseudo;  
        socket.emit('pseudoValid', 'Pseudo valide'); //pseudo valide
        socket.pseudo = pseudo;  
        socket.broadcast.emit('newUserIndice', pseudo) 
      }else{
        socket.emit('pseudoError', 'Pseudo invalide'); // pseudo invalide 
      }

      Indice.find({ sender: socket.pseudo }, function(err, messages) {
        if (err) {
            console.log(err);
        } else {
            socket.emit('oldMessageIndice', messages);
        }
    });
      // message enregistrer en base
      socket.on('newMessageIndice', (message) => {
        var indice = new Indice();
        indice.content = message;
        indice.sender = socket.pseudo;
        indice.timestamp = Date.now(); // Ajouter la date et l'heure actuelles
        indice.save();
        socket.broadcast.emit('newMessageAllIndice', {message: message, pseudo: socket.pseudo});
      });
    // deconnection du user à la salle
    socket.on('disconnect', () => {
      socket.broadcast.emit('quitUserIndice', socket.pseudo);
    });


    });
  });

});




httpServer.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
httpServer1.listen(4001, () => {
  console.log(`Server is listening on port 4001`);
});

httpServer2.listen(4002, () => {
  console.log(`Server is listening on port 4002`);
});
