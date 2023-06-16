const mongoose = require('mongoose');
// le +process.env.DB_USER_PASS renvois a notre .env avec nos données d'auth
mongoose 
     .connect(process.env.DB_CONNECT_URL,
    {
        useNewUrlParser: true,
    }
    )
    // check si c bon connecter
    .then(()=> console.log('Connecté à la base de données mongodb.'))
    // si erreur nous la signale
    .catch((err)=> console.log('Connexion échouée à la base de données mongodb:', err))





    