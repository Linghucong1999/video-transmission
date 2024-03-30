const express = require('express');
const Runway = require('../controller/runway');
const router = express.Router();

router.get('/send/text', Runway.runWayText);
router.post('/send/image', Runway.getImage);
router.get('/delete/image', Runway.deleteImage);



module.exports = router;