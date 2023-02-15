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
  const {lastName, firstName, email, password, adress, ville, codePostal, pays, age, statut, connu, broker} = req.body
  const userIp = req.ip;

  try {
    const user = await UserModel.create({lastName, firstName, email, password, adress, ville, codePostal, pays, age, statut, connu, broker, userIp});
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
}


// apport du signin avec creation du token propre a chaque user valide 3 jours (modifialbe en haut) 
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
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