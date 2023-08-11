const prodProvider = require("./productProvider");
const prodService = require("./productService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 Ryula
 2023.08.11
 */
exports.getProdList = async function (req, res) {
    // 상품 전체 조회
    const prodListResult = await prodService.selectProd();

    return res.send(prodListResult);
};

exports.postUsers = async function (req, res) {

};