// cart:
// cart table: id, userId, totalPrice
// 1. getCartById REVIEW
// 2. getCartByUserId REVIEW
// 3. editTotalPrice NOT STARTED
// 4. removeBeerFromCart * REVIEW
// 5. closeCart NOT STARTED
// 6. getBeersFromCart REVIEW
// 7. createCart * DONE NEEDS REVIEW THOUGH
async function createCart
({id, userId, isPurchased}) {
    try {
        const { rows: [cart] } = await client.query(`
        INSERT INTO cart(id, beerId, quanity, userId, totalPrice)
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [id, beerId, quanity, userId, totalPrice]);
        return cart;
    } catch (error) {
        throw error;
    }
}
async function getCartById (id) {
    try {
      const { rows: [ cart ] } = await client.query(`
        SELECT *
        FROM cart
        WHERE id=${ id };
      `);

      return cart;
    } catch (error) {
      throw error;
    }
  }
  async function getCartByUserId(userId) {
    try {
      const { rows: [ cart ] } = await client.query(`
        SELECT * FROM cart
        WHERE userId='${ userId }';
      `);
        return user;
    } catch (error) {
        throw error;
    }
}
//EDIT BY PRICE HERE
async function removeBeerFromCart(id) {
    try {
        const { rows: [cart] } = await client.query(`
            DELETE FROM cart
            WHERE id=${id}
            RETURNING *;
        `)
        return cart;
    } catch (error) {
        throw(error)
    }
}
async function getBeersFromCart(beerId) {
    try {
        const { rows: [cart] } = await client.query(`
        SELECT * FROM cart
        WHERE beerId='${ beerId }';
      `);
      return user;
    } catch (error) {
        throw error;
    }
}