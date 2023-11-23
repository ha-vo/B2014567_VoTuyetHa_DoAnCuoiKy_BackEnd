const express = require('express');
const chitietdathang = require('../controllers/chitietdathang.controller.js');

const router = express.Router()

router.route("/:id")
    .get(chitietdathang.findOne)
    .put(chitietdathang.update)
    .delete(chitietdathang.delete)
router.route('/')
    .get(chitietdathang.findAll)
    .post(chitietdathang.create)
    .delete(chitietdathang.deleteAll)

module.exports = router