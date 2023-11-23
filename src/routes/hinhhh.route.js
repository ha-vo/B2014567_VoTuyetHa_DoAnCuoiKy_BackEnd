const express = require('express');
const hinhhh = require('../controllers/hinhhh.controller.js');

const router = express.Router()

router.route("/:id")
    .get(hinhhh.findOne)
    .put(hinhhh.update)
    .delete(hinhhh.delete)
router.route('/')
    .get(hinhhh.findAll)
    .post(hinhhh.create)
    .delete(hinhhh.deleteAll)

module.exports = router