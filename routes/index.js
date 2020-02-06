const express = require('express');
const router = express.Router();

const roleController = require('../app/controllers/roleController');
const homeController = require('../app/controllers/homeController');
const userController = require('../app/controllers/userController');
const groupController = require('../app/controllers/groupController');
const groupUserController = require('../app/controllers/groupUserController');
const chatGroupController = require('../app/controllers/chatGroupController');
const chatUserController = require('../app/controllers/chatUserController');


router.get('/chat', chatUserController._index);

router.get('/chat-user', chatUserController.index);

router.get('/chat-group', chatGroupController.index);


// Home
router.get('/', homeController.index);

// Roles
router.get('/roles', roleController.findAll);


// Users
router.get('/users', userController.index);
//router.get('/users/create', userController.create);
router.get('/users/data', userController.findAll);
router.get('/users/_data', userController._findAll);
router.post('/users', userController.store);
router.get('/users/:id', userController.edit);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);
//router.delete('/users', userController.deleteAll);

// Groups
router.get('/groups', groupController.index);
router.get('/groups/data', groupController.findAll);
router.get('/groups/:id', groupController.edit);
router.post('/groups', groupController.store);
router.put('/groups/:id', groupController.update);
router.delete('/groups/:id', groupController.delete);
//router.delete('/groups', groupController.deleteAll);

// Groups Users
router.get('/group-users', groupUserController.index);
router.get('/group-users', groupUserController.findAll);
router.post('/group-users', groupUserController.store);
router.get('/group-users/users/:groupName', groupUserController.users);
router.get('/group-users/groups/:userId', groupUserController.groupsByUserID);
//router.get('/group-users/:id', groupUserController.findOne);
//router.post('/group-users', groupUserController.create);
router.put('/group-users/:id', groupUserController.update);
router.delete('/group-users/:id', groupUserController.delete);
router.delete('/group-users', groupUserController.deleteAll);

module.exports = router;
