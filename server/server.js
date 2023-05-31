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
// reset pwd
const crypto = require("crypto");

// Function to generate a random reset token
const generateResetToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

app.post("/api/user/reset-password", (req, res) => {
  const { email } = req.body;

  // Vérifiez si l'utilisateur existe dans la base de données
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    // Générez un jeton de réinitialisation du mot de passe
    const resetToken = generateResetToken();

    // Enregistrez le jeton de réinitialisation du mot de passe et la date d'expiration dans la base de données pour l'utilisateur
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure d'expiration du jeton
    user.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la sauvegarde du jeton de réinitialisation du mot de passe." });
      }

      // Envoyez l'e-mail de réinitialisation du mot de passe à l'utilisateur
      sendResetPasswordEmail(user.email, resetToken);

      return res.status(200).json({ message: "Un e-mail de réinitialisation du mot de passe a été envoyé." });
    });
  });
});
const sendResetPasswordEmail = (email, resetToken) => {
  // Logic to send the reset password email
  // You can use a library like Nodemailer to send the email
  
  // Example using Nodemailer
  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    host: 'mail.infomaniak.com',
    port: 465,
    secure: false,
    auth: {
      user: 'user.infomaniak',
      pass: 'pwd.infomaniak',
    },
  });
  
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Reset Your Password',
    text: `Click the following link to reset your password: ${resetToken}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Reset password email sent:', info.response);
    }
  });
};


app.post("/api/user/reset-password/:token", (req, res) => {
const { token } = req.params;
const { password } = req.body;

// Trouvez l'utilisateur avec le jeton de réinitialisation du mot de passe correspondant
User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
  if (err || !user) {
    return res.status(400).json({ message: "Jeton de réinitialisation du mot de passe non valide ou expiré." });
  }

  // Mettez à jour le mot de passe de l'utilisateur avec le nouveau mot de passe
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  user.save((err) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe." });
    }

    return res.status(200).json({ message: "Le mot de passe a été réinitialisé avec succès." });
  });
});
});

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
