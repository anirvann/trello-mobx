const router = require('express').Router();

router.use('/lists', require('./lists'));
router.use('/cards', require('./cards'));

module.exports = router;