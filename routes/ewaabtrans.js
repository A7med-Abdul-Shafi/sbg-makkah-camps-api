const express = require('express')
const router = express.Router()
const {ewaabtrans} = require('../models')

router
    .route('/transewaab')
    .post(async (req, res) => {
        const extra = req.body
        await ewaabtrans.create(extra)
        res.json(extra)
    });
    module.exports = router;
