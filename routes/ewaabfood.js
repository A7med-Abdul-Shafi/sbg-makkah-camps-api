const express = require('express')
const router = express.Router()
const {ewaabfood} = require('../models')

router
    .route('/foodewaab')
    .post(async (req, res) => {
        const extra = req.body
        await ewaabfood.create(extra)
        res.json(extra)
    });
    module.exports = router;
