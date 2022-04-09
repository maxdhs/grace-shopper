const client = require("./client");
// const { getUserByUsername } = require("./users"); Will probably need in future

async function createBeer({
  id,
  name,
  description,
  image,
  abv,
  brewery,
  style,
  price,
  score,
}) {
  try {
    const {
      rows: [beer],
    } = await client.query(
      `
          INSERT INTO beers(id, name, description, image, abv, brewery, style, price, score)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *;
        `,
      [id, name, description, image, abv, brewery, style, price, score]
    );

    return beer;
  } catch (error) {
    throw error;
  }
}

async function deleteBeer(id) {
  try {
    await client.query(
      `
        DELETE
        FROM beers
        WHERE id=$1;
        `,
      [id]
    );

    const message = {
      success: true,
      error: "none",
      message: "beer successfully deleted",
    };

    return message;
  } catch (error) {
    throw error;
  }
}

async function editBeer({ id, name, description, price }) {
  try {
    let updatedBeer = await getBeerById(id);

    if (!updatedBeer) {
      throw Error("Beer does not exist with that id");
    }

    if (name) {
      await client.query(
        `
          UPDATE beers
          SET name=$1
          WHERE id=$2
          RETURNING *;
        `,
        [name, id]
      );
    }

    if (description) {
      await client.query(
        `
          UPDATE beers
          SET description=$1
          WHERE id=$2
          RETURNING *;
        `,
        [description, id]
      );
    }

    if (price) {
      await client.query(
        `
          UPDATE beers
          SET price=$1
          WHERE id=$2
          RETURNING *;
        `,
        [price, id]
      );
    }

    updatedBeer = await getBeerById(id);
    return updatedBeer;
  } catch (error) {
    throw error;
  }
}

async function getBeerByName(name) {
  try {
    const {
      rows: [beer],
    } = await client.query(`
      SELECT *
      FROM beers
      WHERE name=${name}
    `);

    if (!beer) {
      throw Error("Beer does not exist with that name");
    }

    return beer;
  } catch (error) {
    throw error;
  }
}

async function getBeerByStyle(style) {
  try {
    const {
      rows: [beer],
    } = await client.query(`
      SELECT *
      FROM beers
      WHERE style=${style}
    `);

    if (!beer) {
      throw Error("Beer does not exist with that style");
    }

    return beer;
  } catch (error) {
    throw error;
  }
}

async function getBeerByBrewery(brewery) {
  try {
    const {
      rows: [beer],
    } = await client.query(`
      SELECT *
      FROM beers
      WHERE brewery=${brewery}
    `);

    if (!beer) {
      throw Error("Beer does not exist with that style");
    }

    return beer;
  } catch (error) {
    throw error;
  }
}

async function getAllBeers() {
  try {
    const { rows: beer } = await client.query(`
        SELECT *
        FROM beers;
      `);

    return beer;
  } catch (error) {
    throw error;
  }
}

async function getBeerById(id) {
  try {
    const {
      rows: [beer],
    } = await client.query(`
      SELECT *
      FROM beers
      WHERE id=${id}
    `);

    if (!beer) {
      throw Error("Beer does not exist with that id");
    }

    return beer;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBeer,
  deleteBeer,
  editBeer,
  getBeerById,
  getBeerByName,
  getBeerByStyle,
  getAllBeers,
  getBeerByBrewery,
};