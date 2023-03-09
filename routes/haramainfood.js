const express = require('express')
const router = express.Router()
const {haramainfood} = require('../models')

router
    .route('/foodharamain')
    .post(async (req, res) => {
        const extra = req.body
        await haramainfood.create(extra)
        res.json(extra)
    });
    module.exports = router;
