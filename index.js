const express = require('express');
const cors = require('cors');
const config = require('config-lite')({ config_basedir: __dirname });
const router = require('./router/router');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/view', express.static('public/view'));
app.use('/upload', express.static('upload'));
router(app);
app.listen(config.port, () => {
    console.log(`成功监听端口:http://localhost:${config.port}`);
})