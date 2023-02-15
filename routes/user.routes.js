const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user-controller')




// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
// user DB
//  quand le chemin c'est ('/') je veux que tu me donne dans userController tout les users
router.get('/', userController.getAllUsers)
// un seul user
router.get('/:id', userController.userInfo)
// modification info user
router.put("/:id", userController.updateUser);


module.exports= router