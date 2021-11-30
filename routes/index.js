const router = require('express').Router();
const userRouter = require('./user.router');

router.get('/', (req, res) => {
  res.json({ msg: 'Masuk pak Eko' });
});

router.use('/users', userRouter);

module.exports = router;
