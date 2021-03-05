const router = require('express-promise-router')();
const user_controller = require('../controllers');

router.get('/', user_controller.users);
router.post('/register', user_controller.register);
router.post('/login', user_controller.login);

module.exports = router;
