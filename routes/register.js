const express = require("express");
const router = express.Router();
const { register } = require('../models');
const bcrypt = require("bcrypt");

router.route('/getall')
.get(async (req, res) => {
    const listofdatabase = await register.findAll()
    res.send(listofdatabase);
});

router.route('/register')
.post(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await register.findOne(
        { 
        where: {
            username : username
        }
    })
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    await bcrypt.hash(password, 10).then((hash) => {
        register.create({
            username: username,
            password: hash,
        });
        res.json( "تم إنشاء مستخدم بنجاح" );
    });
});

module.exports = router;