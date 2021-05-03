const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idReminder, date, completed, User_idUser, Book_idBook 
    FROM Reminder LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(reminder){
  const result = await db.query(
    `INSERT INTO Reminder
    (date, completed, User_idUser, Book_idBook) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      reminder.date, reminder.completed,
      reminder.User_idUser, reminder.Book_idBook
    ]
  );

  let message = 'Error in creating reminders';

  if (result.affectedRows) {
    message = 'Reminder created successfully';
  }

  return {message};
}

async function update(id, reminder){
  const result = await db.query(
    `UPDATE Reminder 
    SET date=?, completed=?, User_idUser=?, Book_idBook=?
    WHERE id=?`, 
    [
      reminder.date, reminder.completed,
      reminder.User_idUser, reminder.Book_idBook, id
    ]
  );

  let message = 'Error in updating reminder';

  if (result.affectedRows) {
    message = 'Reminder updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM Reminder WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting reminder';

  if (result.affectedRows) {
    message = 'Reminder deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove
}