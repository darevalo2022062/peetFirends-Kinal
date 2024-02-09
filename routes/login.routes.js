const { Router } = require('express');
const { check } = require('express-validator');
const { loginGet } = require('../controllers/login.controller');
const router = Router();

router.get("/", loginGet);

module.exports = router;