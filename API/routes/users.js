const express = require('express');
const router = express.Router();
const users = require('../services/users');
const bcrypt = require('bcryptjs');
const jwt = require("jwt-simple");
const moment = require("moment");
const middleware = require('./middleware');




router.post('/login', async function (req, res, next) {
  const user = await users.getByEmail(req.body.email);
  if (user === undefined) {
    res.json({
      error: "Error, email or password not found"
    });
  } else {
    if(!bcrypt.compareSync(req.body.password, user.password)){
      res.json({
        error: "Error, email or password not found"
      });
    }else{
      res.json({
        successfull: createToken(user),
        done: "Login correct"
      });
    }
  }
  res.json({
    error: "Error, email or password not found"
  });
});

const createToken = (user) => {
  let payload = {
    userId: user.idUser,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload,process.env.TOKEN_KEY);
};

router.post('/', async function (req, res, next) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});


router.use(middleware.checkToken);



/* GET users. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});




router.get("/mainUser", (req, res) => {
  users.getById(req.userId)
  .then(rows => {
    res.json(rows);
  })
  .catch(err => console.log(err));
});

router.put('/:id', async function (req, res, next) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;