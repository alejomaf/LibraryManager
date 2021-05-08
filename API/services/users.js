const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idUser, name, email, password 
    FROM User LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows[0]);
  const meta = {page};

  return {
    data,
    meta
  }
}
/*
const getByEmail = (email) =>{
  return new Promise((resolve, reject) => {
    db.query(`SELECT *
    FROM User WHERE email = ?`,[email], (err, rows) => {
      if(err) reject(err)
      resolve(rows[0])
    });
  });
};
*/

async function getByEmail(email){
  const user = await db.query(
    `SELECT idUser, name, email, password 
    FROM User WHERE email = ?`,[email]
  );
  return user[0];
}

async function getById(idUser){
  const user = await db.query(
    `SELECT idUser, name, email, password 
    FROM User WHERE idUser = ?`,[idUser]
  );
  return user[0];
}

async function create(user){
  const result = await db.query(
    `INSERT INTO User
    (name, email, password) 
    VALUES 
    (?, ?, ?)`, 
    [
      user.name, user.email,
      user.password
    ]
  );

  let message = 'Error in creating users';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

async function update(id, user){
  const result = await db.query(
    `UPDATE User 
    SET name=?, password=?, email=? 
    WHERE id=?`, 
    [
      user.name, user.password,
      user.email, id
    ]
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM User WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getByEmail,
  getById
}
