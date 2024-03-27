const video = require('./video');
const runway = require('./runway');

module.exports = app => {
    app.use('/video', video);
    app.use('/runway', runway);
}