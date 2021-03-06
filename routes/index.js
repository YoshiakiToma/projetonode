const express = require('express');
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
//const { routes } = require('../app');

const router = express.Router();
router.get('/', homeController.index);
router.get('/users/login', userController.login);

// Rotas POST's
router.get('/post/add', postController.add);
router.post('/post/add', postController.addAction);

router.get('/post/:slug/edit', postController.edit);
router.post('/post/:slug/edit', postController.editAction);

router.get('/post/:slug', postController.view);



module.exports = router;