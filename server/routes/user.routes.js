const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user-controller');

// Auth routes
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// User routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put("/:id", userController.updateUser);

// Admin routes
router.get('/admin', (req, res) => {
  // Check if user is admin
  if (req.user && req.user.role === 'admin') {
    // Admin-only code
    res.send('This page is only accessible to admins');
  } else {
    // If user is not an admin, send an error message
    res.status(401).send('Unauthorized');
  }
});

// Block user by ID
router.post('/block/:id', (req, res) => {
  // Check if user is admin
  if (req.user && req.user.role === 'admin') {
    // Block user logic
    res.send(`Blocked user with ID ${req.params.id}`);
  } else {
    // If user is not an admin, send an error message
    res.status(401).send('Unauthorized');
  }
});

// Unblock user by ID
router.post('/unblock/:id', (req, res) => {
  // Check if user is admin
  if (req.user && req.user.role === 'admin') {
    // Unblock user logic
    res.send(`Unblocked user with ID ${req.params.id}`);
  } else {
    // If user is not an admin, send an error message
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
