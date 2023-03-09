const express = require('express')
const router = express.Router()
const {ewaaafood} = require('../models')

router
    .route('/foodewaaa')
    .post(async (req, res) => {
        const extra = req.body
        await ewaaafood.create(extra)
        res.json(extra)
    });
    module.exports = router;
