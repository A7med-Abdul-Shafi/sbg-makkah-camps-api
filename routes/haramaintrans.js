const express = require('express')
const router = express.Router()
const {haramaintrans} = require('../models')

router
    .route('/transharamain')
    .post(async (req, res) => {
        const extra = req.body
        await haramaintrans.create(extra)
        res.json(extra)
    });
    module.exports = router;
