const express = require('express');
const middleware = require('./users_middleware');
const controller = require('./users_controller');

const router = express.Router();

router.post('/', middleware.validateUser, controller.CreateUser);
router.patch('/:id', middleware.validateAdmin, controller.UpdateUser);
router.delete('/:id', middleware.validateAdmin, controller.DeleteUser);

module.exports = router;
