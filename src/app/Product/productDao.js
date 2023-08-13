/**
 Ryula
 2023.08.11
 */
async function selectProd(connection) {
    const selectProdListQuery = `
                SELECT product_id, product_name, product_price, product_sex
                FROM Product;
                `;
    const [prodRows] = await connection.query(selectProdListQuery);
    return prodRows;
}

/**
 Ryula
 2023.08.13
 */
async function selectProdPage(connection, prodId) {
    const selectProdListQuery = `
                SELECT product_id, product_name, product_price, product_sex
                FROM Product
                WHERE product_id=?;
                `;

    const [prodRows] = await connection.query(selectProdListQuery, [prodId]);
    //console.log(prodRows[0].product_id);
    return prodRows;
}

/**
 Ryula
 2023.08.13
 */
async function selectProdImg(connection, prodId) {
    const selectProdListQuery = `
                SELECT img_url
                FROM Image
                WHERE product_id=?;
                `;

    const [prodRows] = await connection.query(selectProdListQuery, [prodId]);
    //console.log(prodRows[0].product_id);
    return prodRows;
}

module.exports = {
    selectProd,
    selectProdPage,
    selectProdImg,
};
