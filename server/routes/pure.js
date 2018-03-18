/**
 * Created by ChengZheLin on 2018/3/18.
 */

'use strict';
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;