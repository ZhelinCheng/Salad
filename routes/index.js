const express = require('express');
const router = express.Router();
const sourceGroup = require('../source/images').group
const parmeterCheck = require('../middleware/parameterCheck')

// random/!400x300/

router.get('/:class/:size?/:text?', parmeterCheck(sourceGroup))


module.exports = router;
