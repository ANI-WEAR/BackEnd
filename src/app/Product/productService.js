const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const prodProvider = require("./productProvider");
const prodDao = require("./productDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

/**
 Ryula
 2023.08.11
 */
exports.selectProd = async function () {
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const prodResult = await prodDao.selectProd(connection);
        //console.log(`추가된 회원 : ${prodResult[0].product_price}`);

        connection.release();

        const len=prodResult.length;
        let result={};

        for(let i=0;i<len;i++){
            result[i]={'product_name': prodResult[i].product_name, 'product_price': prodResult[i].product_price, 'hash_tag': prodResult[i].hash_tag};
        }

        return response(baseResponse.SUCCESS, result);
    } catch (err) {
        logger.error(`App - selectProd Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

/**
 Ryula
 2023.08.13
 */
exports.selectProdPage = async function (prod_id) {
    try{
        const connection = await pool.getConnection(async (conn) => conn);

        const prodResult = await prodDao.selectProdPage(connection, prod_id);
        //console.log(`추가된 회원 : ${prodResult}`);

        connection.release();

        if(prodResult.length!=1){
            return errResponse(baseResponse.PRODUCT_ID_WRONG);
        }

        const result={'prod_id':prodResult[0].product_id, 'name': prodResult[0].product_name};
        //console.log(result);

        return response(baseResponse.SUCCESS, result);
    } catch (err) {
        logger.error(`App - selectProdPage Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createUser = async function (email, password, nickname) {
    try{
        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});
    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}