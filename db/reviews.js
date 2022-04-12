const { client } = require(".");
const { getProducts } = require("./products");

const createReview = async({creatorId, productId, message}) => {
    try {
        const {rows: review} = await client.query(`
            INSERT INTO reviews ("creatorId", "productId", message)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[creatorId, productId, message]);
        return review;
    } catch (error) {
        throw error;
    }
};

const getAllReviews = async() => {
    try {
        const {rows: reviews} = await client.query(`
            SELECT * FROM reviews;
        `)
        return reviews;
    } catch (error) {
        throw error;
    }
};

const getProductReviews = async() => {
    const allProducts = await getProducts();
    try {
        for(const product of allProducts) {
            const {rows: reviews} = await client.query(`
                SELECT reviews.*
                FROM products
                JOIN reviews
                ON products.id = reviews."productId"
                WHERE products.id = $1;
            `,[product.id]);
            product.reviews = reviews;
        };
        return allProducts;
    } catch (error) {
        throw error;
    }
};

const getProductReviewsByProductId = async(id) => {
    try {
        const products = await getProductReviews();
        const filteredProducts = products.filter(product => {
            if(product.id === id) {
                return true;
            }
        });
        return filteredProducts;
    } catch (error) {
        throw error;
    }
};

// const getReviewById = async(id) => {
//     try {
//         const {rows: review} = await client.query(`
//             SELECT * FROM reviews
//             WHERE id = $1;
//         `,[id])
//         return review;
//     } catch (error) {
        
//     }
// }

const editReview = async({id, message}) => {
    try {
        await client.query(`
            UPDATE reviews
            SET message = $1
            WHERE id = $2
            RETURNING *;
        `, [message, id]);
        const {rows: review} = await client.query(`
            SELECT * FROM reviews
            WHERE id = $1
        `,[id]);
        return review;
    } catch (error) {
        throw error;
    }
};

const destroyReview = async(id) => {
    try {
        const {rows: [review]} = await client.query(`
            DELETE FROM reviews
            WHERE id = $1;
        `,[id]);
        return review;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getProductReviews,
    getProductReviewsByProductId,
    editReview,
    destroyReview
}