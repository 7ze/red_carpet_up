const router = require('express-promise-router')();
const { auth_controller } = require('../controllers');

router.post('/register', auth_controller.register);
router.post('/login', auth_controller.login);

module.exports = router;
