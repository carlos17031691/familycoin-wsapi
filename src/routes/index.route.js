import {index } from '../controllers/index.controller'
import AuthMiddleware from '../middlewares/apiAuth.middleware'
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',AuthMiddleware.apiAuth,(req, res) => {
  return index(req, res);
});


module.exports = router;
