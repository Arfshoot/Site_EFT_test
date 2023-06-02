// gestion de la modification user et suppression user

// appel base de données
const UserModel = require('../models/user.model')
// utilitaire mail


// verification controlle que les id sont reconnue par la base
const ObjectID = require('mongoose').Types.ObjectId


// fontion pour aller chercher des infos dans la base de donnes/ user = chercher dans la base et select prend les tous et retourne moi une réponse en json avec tout les users -password (sauf le password)
module.exports.getAllUsers = async (req, res) => {

    const users = await UserModel.find().select('-password')
    res.status(200).json(users)
}

// infos d'un seul user
// on questionne si l'id est valide (dans notre base de donnée) si non alors retourné une erreur  si oui alors rechercher les infos par l'ID du user et les affichés (sans le password)
module.exports.userInfo = async (req, res) => {
    console.log(req.params)
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('Id Inconnue :' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Id Inconnue : ' + err)
    }).select('-password')
}
// Block user by ID
module.exports.blockUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { blocked: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

// Unblock user by ID
module.exports.unblockUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id);

  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { blocked: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
// modification des infos user

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            
            lastName : req.body.lastName,
            firstName : req.body.firstName,
            secondName : req.body.secondName,
            adress : req.body.adress,
            complmtAdress : req.body.complmtAdress,
            ville : req.body.ville,
            codePostal : req.body.codePostal,
            etatProv : req.body.etatProv,
            pays : req.body.pays,
            phone : req.body.phone,
            age : req.body.age,
            categorieSP : req.body.categorieSP,
            statut : req.body.statut,
            raisonS : req.body.raisonS,
            broker : req.body.broker,
            role : req.body.role,
            pseudo : req.body.pseudo 
          },
        },
        // paramètre obligatoire pour un put
        { new: true, upsert: true, setDefaultsOnInsert: true })
        .then((data) => res.send(data))
        .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  

// delete profil
// Suppression d'un utilisateur par ID
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

