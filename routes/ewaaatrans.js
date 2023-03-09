const express = require('express')
const router = express.Router()
const {ewaaatrans} = require('../models')

router
    .route('/transewaaa')
    .post(async (req, res) => {
        const extra = req.body
        await ewaaatrans.create(extra)
        res.json(extra)
    });
    module.exports = router;
