const mongoose = require('mongoose');
// le +process.env.DB_USER_PASS renvois a notre .env avec nos données d'auth
mongoose 
    .connect('mongodb://' + process.env.DB_USER_PASS + '@' + process.env.DB_URL,
    {
        useNewUrlParser: true,
    }
    )
    // check si c bon connecter
    .then(()=> console.log('Connecté à mongodb'))
    // si erreur nous la signale
    .catch((err)=> console.log('Connexion échouée', err))





    