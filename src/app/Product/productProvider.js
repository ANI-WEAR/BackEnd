const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const prodDao = require("./productDao");

/**
 Ryula
 2023.08.13
 */
exports.selectImg = async function (prodId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const imgResult = await prodDao.selectProdImg(connection, prodId);
    const len=imgResult.length;
    let result=[];

    for(let i=0;i<len;i++){
        result.push(imgResult[i].img_url);
    }

    //console.log(`추가된 회원 : ${result}`);
    connection.release();

    return result;
};