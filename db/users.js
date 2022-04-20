const client = require("./client.js");
const bcrypt = require("bcrypt");

async function createUser({
    email,
    password,
    first_name,
    last_name,
    administrator = false,
}) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    try {
        const {
            rows: [user],
        } = await client.query(
            `
      INSERT INTO users(email, password, first_name, last_name, administrator) 
      VALUES($1, $2, $3, $4, $5) 
      ON CONFLICT (email) DO NOTHING 
      RETURNING *;
    `,
            [email, hashedPassword, first_name, last_name, administrator]
        );

        delete user.password;

        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({ email, password }) {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return null;
        }
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordsMatch) {
            delete user.password;
            return user;
        }
    } catch (error) {
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
          SELECT * FROM users
          WHERE email = $1;
      `,
            [email]
        );
        return user;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        const {
            rows: [user],
        } = await client.query(
            `
          SELECT * FROM users
          WHERE id = $1;
      `,
            [id]
        );
        if (user) {
            delete user.password;
            return user;
        }
        return;
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM users;
        `);
        for (const row of rows) {
            delete row.password;
        }
        return rows;
    } catch (error) {
        throw error;
    }
}

// async function updateUser({ email, password }) {
//     try {
//     } catch (error) {
//         next(error);
//     }
// }

// async function deleteUser({ id, email }) {
//     try {
//         client.query(
//             `
//         DELETE FROM USERS
//         WHERE id=$1
//         AND email=$2;
//         `,
//             [id, email]
//         );
//         return {
//             name: "userDeleted",
//             message: `Account for ${email} deleted.`,
//         };
//     } catch (error) {
//         next(error);
//     }
// }

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserByEmail,
    getUserById,
    // deleteUser,
};
