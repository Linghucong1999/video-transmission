const express = require('express');
const Video = require('../controller/video/index');
const router = express.Router();


router.get('/send/stream',Video.sendStream);



module.exports = router;