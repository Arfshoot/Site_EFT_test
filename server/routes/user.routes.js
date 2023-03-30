const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user-controller')

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get('/', userController.getAllUsers);

// admin only
router.get('/admin', (req, res) => {
  // check if user is admin
  if (req.user && req.user.role === 'admin') {
    // admin only code
    res.send('This page is only accessible to admins');
  } else {
    // if user is not an admin, send an error message
    res.status(401).send('Unauthorized');
  }
});
// delete user by id
router.delete('/:id', (req, res) => {
    // check if user is admin
    if (req.user && req.user.role === 'admin') {
      UserModel.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send({ message: err }));
    } else {
      // if user is not an admin, send an error message
      res.status(401).send('Unauthorized');
    }
  });
router.get('/:id', userController.userInfo)
router.put("/:id", userController.updateUser);

module.exports= router