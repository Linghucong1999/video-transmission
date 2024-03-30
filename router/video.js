const express = require('express');
const Video = require('../controller/video/index');
const router = express.Router();


router.get('/send/stream', Video.sendStream);
router.get('/createBundleRenderer/html', Video.getVideoHtml);


module.exports = router;