const express = require('express');
const nhanvien = require('../controllers/nhanvien.controller.js');

const router = express.Router()

router.route("/:id")
    .get(nhanvien.findOne)
    .put(nhanvien.update)
    .delete(nhanvien.delete)
router.route('/')
    .get(nhanvien.findAll)
    .post(nhanvien.create)
    .delete(nhanvien.deleteAll)

module.exports = router