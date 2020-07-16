const {Router} = require('express');
const router = Router();

const auth = require('../lib/middlewares/user_auth');

const staffController = require('../controllers/user-controller');

/* Post create user. */
router.post('/register', staffController.register_user);
router.post('/login', staffController.login_user);
router.get('/user/profile', auth, staffController.get_uers);
router.get('/user/refresh-key', auth, staffController.refresh_api_key);

module.exports = router;
