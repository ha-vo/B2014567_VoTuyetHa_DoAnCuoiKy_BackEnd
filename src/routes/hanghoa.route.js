const express = require('express');
const hanghoa = require('../controllers/hanghoa.controller.js');

const router = express.Router()

router.route("/:id")
    .get(hanghoa.findOne)
    .put(hanghoa.update)
    .delete(hanghoa.delete)
router.route('/')
    .get(hanghoa.findAll)
    .post(hanghoa.create)
    .delete(hanghoa.deleteAll)

module.exports = router