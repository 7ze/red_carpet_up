const router = require('express-promise-router')();
const { users_controller } = require('../controllers');
const { is_logged_in } = require('../middleware');

router.get('/', is_logged_in, users_controller.users);

module.exports = router;
