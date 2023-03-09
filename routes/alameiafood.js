const express = require('express')
const router = express.Router();
const {alameiafood} = require('../models')

router
    .route('/foodalameia')
    .post(async (req, res) => {
        const extra = req.body
        await alameiafood.create(extra)
        res.json(extra)
    });
    module.exports = router;
