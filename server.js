const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
// determine le port qu'il doit utilisé dans notre fichier config
require('dotenv').config({path: './config/.env'})
// appel des fichiers 
require('./config/bd')
const {checkUser, requireAuth} = require('./middelware/auth.middelware');
const cors = require('cors');
const app = express();

// CORS 



const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }  
app.use(cors(corsOptions));


// traiter la data qui transite de api vers register par exemple
app.use (bodyParser.json())
app.use (bodyParser.urlencoded({extended: true}))
app.use (cookieParser())


// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
  });


//routes
app.use ('/api/user', userRoutes)
app.use ('/api/post', postRoutes)



// process.env  prendra l'adresse determiné dans notre dossier config 
// server toujours à la fin
app.listen(process.env.PORT, () =>{ 
    console.log(`listening on port ${process.env.PORT}`);
})