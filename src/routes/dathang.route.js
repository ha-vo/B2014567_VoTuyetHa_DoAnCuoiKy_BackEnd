const express = require('express');
const dathang = require('../controllers/dathang.controller.js');

const router = express.Router()

router.route("/:id")
    .get(dathang.findOne)
    .put(dathang.update)
    .delete(dathang.delete)
router.route('/')
    .get(dathang.findAll)
    .post(dathang.create)
    .delete(dathang.deleteAll)

module.exports = router