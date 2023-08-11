module.exports = function(app) {
    const prod = require('./productController');

    /**
     Ryula
     2023.08.11
     */
    // 상품 조회 API
    app.get('/prod', prod.getProdList);

};