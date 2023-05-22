const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// Route pour récupérer toutes les publications
router.get('/', postController.readPost);

// Route pour créer une nouvelle publication
router.post('/', postController.createPost);

// Route pour mettre à jour une publication existante
router.put('/:id', postController.updatePost);

module.exports = router;
