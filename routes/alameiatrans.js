const express = require('express')
const router = express.Router()
const {alameiatrans} = require('../models')

router
    .route('/transalameia')
    .post(async (req, res) => {
        const extra = req.body
        await alameiatrans.create(extra)
        res.json(extra)
    });
    module.exports = router;
