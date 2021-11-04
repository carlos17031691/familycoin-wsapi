var express = require('express');
var router = express.Router();
import authController from '../controllers/auth.controller'
import AuthMiddleware from '../middlewares/apiAuth.middleware'

router.post('/register', async (req, res) => {
  return await authController.register(req,res);
});

router.post('/login', async (req, res) => {
  return await authController.login(req,res);
});

router.post('/emailValidate',AuthMiddleware.apiAuth, async (req, res) => {
  return await authController.emailValidate(req,res);
});

router.post('/getUserInfo',AuthMiddleware.apiAuth, async (req, res) => {
  return await authController.getUserInfo(req,res);
});

module.exports = router;
