const prod = require("./productController");
module.exports = function(app) {
    const prod = require('./productController');

    /**
     Ryula
     2023.08.11
     */
    // 상품 조회 API
    app.get('/prod', prod.getProdList);
    /**
     Ryula
     2023.08.13
     */
    // 특정 상품 조회 API
    app.get('/prod/:prod_id', prod.getProdPage);
};