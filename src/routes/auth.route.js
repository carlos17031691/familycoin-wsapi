var express = require('express');
var router = express.Router();
import authController from '../controllers/auth.controller'

router.post('/register', async (req, res) => {
  return await authController.register(req,res);
});

router.post('/login', async (req, res) => {
  return await authController.login(req,res);
});

module.exports = router;
