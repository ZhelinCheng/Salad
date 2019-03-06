const express = require('express');
const router = express.Router();

router.get('/random/:size/:bg/:color', function(req, res, next) {
  console.log(req.params, req.query)

  res.json({
    code: 200
  })
});

module.exports = router;
