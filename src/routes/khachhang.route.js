const express = require('express');
const khachhang = require('../controllers/khachhang.controller.js');

const router = express.Router()

router.route("/:id")
    .get(khachhang.findOne)
    .put(khachhang.update)
    .delete(khachhang.delete)
router.route('/')
    .get(khachhang.findAll)
    .post(khachhang.create)
    .delete(khachhang.deleteAll)

module.exports = router