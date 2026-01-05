let express = require('express');
let {receiveEmail,sendandreceiveMail} = require('../controller/email.controller');
let router = express.Router();

router.post('/receive', receiveEmail)
router.post('/sendandreceive',sendandreceiveMail)



module.exports = router;