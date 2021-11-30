const router = require('express').Router();
const Controller = require('../controllers/user.controller');
const { validateUser } = require('../validators/user.validator');

router.post('/', validateUser, Controller.createUser);
router.put('/:id', validateUser, Controller.updateUser);
router.get('/', Controller.getAllUsers);
router.get('/:id', Controller.getUser);
router.delete('/:id', Controller.deleteUser);

module.exports = router;
