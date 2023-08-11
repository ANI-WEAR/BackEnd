/**
 Ryula
 2023.08.11
 */
async function selectProd(connection) {
    const selectProdListQuery = `
                SELECT product_name, product_price, hash_tag 
                FROM Product;
                `;
    const [prodRows] = await connection.query(selectProdListQuery);
    return prodRows;
}

module.exports = {
    selectProd,
};
