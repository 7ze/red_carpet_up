const router = require('express-promise-router')();
const { auth_controller } = require('../controllers');

router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);
router.post('/token', auth_controller.token);
router.delete('/logout', auth_controller.logout);

module.exports = router;
