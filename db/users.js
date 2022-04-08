const { client } = require('.');

const createUser = async (email, username, password) => {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const resp = await client.query(
      `
        INSERT INTO users (email,username,password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [email, username, hashedPassword]
    );
    const user = resp.rows;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async (username, password) => {
  try {

    const user = await client.query(`
      SELECT * FROM users
      WHERE username = $1;
    `[username]);

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if(passwordMatch){
      delete user.password;
      return user;
    }

  } catch (error) {
    throw error;
  }
}

const userCheck = async (email, username) => {
  try {
    const resp = await client.query(
      `
      SELECT * FROM users
      WHERE email = $1 OR username = $2;
      `,
      [email, username]
    );
    const user = resp.rows[0];
    return user;
  } catch (err) {
    throw err;
  }
};



module.exports = {
  createUser,
  userCheck,
  getUser
};
