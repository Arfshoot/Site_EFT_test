const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    }) 
}


module.exports.signUp = async (req, res) => {
  console.log("Server.aut-controler.signup (Creation User)")
  const {lastName, firstName, email, password, adress, ville, codePostal, pays, age, statut, connu, broker, pseudo} = req.body
  const userIp = req.ip;

  try {
    
    const user = await UserModel.create({ lastName, firstName, email, password, adress, ville, codePostal, pays, age, statut, connu, broker, userIp, pseudo});
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    console.log("Server.aut-controler.signup (Error creation User)")
    console.log(err)
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}


// apport du signin avec creation du token propre a chaque user valide 3 jours (modifialbe en haut) 
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    console.log("Server.aut-controler.signin")
    try {
      const user = await UserModel.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user._id})
    } catch (err){
        const errors = signInErrors(err);
        res.status(200).send({ errors })
    }
  }
  


// logout 
  module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }