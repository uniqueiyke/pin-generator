const { Router } = require('express');
const router = Router();
const apiController = require('../controllers/api-controller')
const auth = require('../lib/middlewares/user_auth');
const cors = require('../lib/middlewares/cors')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a api');
});

router.get('/cards', auth, apiController.fetch_cards);
router.get('/get/cards', cors(), apiController.fetch_by_api);
router.post('/update/cards', auth, apiController.update_cards);
router.post('/create/cards', auth, apiController.create_cards);
router.delete('/delete/card/:id', auth, apiController.delete_card);
module.exports = router;
