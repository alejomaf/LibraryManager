const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(req,page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idBookshelf, rowB, columnB, name, User_idUser 
    FROM Bookshelf WHERE User_idUser = ? LIMIT ?,?`, 
    [req.userId, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(bookshelf){
  const result = await db.query(
    `INSERT INTO Bookshelf
    (name, columnB, rowB, User_idUser) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      bookshelf.name, bookshelf.columnB,
      bookshelf.rowB, bookshelf.User_idUser
    ]
  );

  let message = 'Error in creating bookshelfs';

  if (result.affectedRows) {
    message = 'Bookshelf created successfully';
  }

  return {message};
}

async function update(id, bookshelf){
  const result = await db.query(
    `UPDATE Bookshelf 
    SET rowB=?, columnB=?, name=? 
    WHERE id=?`, 
    [
      bookshelf.rowB, bookshelf.columnB,
      bookshelf.name, id
    ]
  );

  let message = 'Error in updating bookshelf';

  if (result.affectedRows) {
    message = 'Bookshelf updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Bookshelf WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting bookshelf';

  if (result.affectedRows) {
    message = 'Bookshelf deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove
}
