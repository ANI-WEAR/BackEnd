module.exports = function(app) {
    const test = require('./testController');
    //const jwtMiddleware = require('../../../config/jwtMiddleware');
    app.get('/test', test.default);
}