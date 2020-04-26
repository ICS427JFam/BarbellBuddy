const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Barbell Buddy Express Server');
});

router.use('/api', require('./api'));

module.exports = router;
