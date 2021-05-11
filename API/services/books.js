const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(idBookshelf, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idBook, title, author, pages, Bookshelf_idBookshelf, toRead, stars 
    FROM Book WHERE Bookshelf_idBookshelf = ? LIMIT ?,?`, 
    [idBookshelf, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(book){
  const result = await db.query(
    `INSERT INTO Book
    (title, author, pages, Bookshelf_idBookshelf, toRead, stars) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`, 
    [
      book.title, book.author,
      book.pages, book.Bookshelf_idBookshelf,
      book.toRead, book.stars
    ]
  );

  let message = 'Error in creating books';

  if (result.affectedRows) {
    message = 'Book created successfully';
  }

  return {message};
}

async function update(id, book){
  const result = await db.query(
    `UPDATE Book 
    SET title=?, author=?, pages=?, Bookshelf_idBookshelfs=?, toRead=?, stars=? 
    WHERE id=?`, 
    [
      book.title, book.author,
      book.pages, book.Bookshelf_idBookshelfs,
      book.toRead, book.stars, id
    ]
  );

  let message = 'Error in updating book';

  if (result.affectedRows) {
    message = 'Book updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Book WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting book';

  if (result.affectedRows) {
    message = 'Book deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove
}
