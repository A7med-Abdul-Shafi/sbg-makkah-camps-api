const express = require("express");
const router = express.Router();
const { users } = require('../models');
const bcrypt = require("bcrypt");

router.route('/users/list')
.get(async (req, res) => {
    const listOfUsers = await users.findAll()
    const result = JSON.stringify(listOfUsers)
    if (!result?.length) {   
        return res.status(400).json({ message: 'No users found' })
    } 
    res.send(result); 
});   


router.route('/users/new')
.post( async (req, res) => {
    const { emp_no, house, username, email, password, roles } = req.body;
    const emailLowerCase = email.toLowerCase();
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await users.findOne( 
        { 
        where: {
            username : username   
        } 
    }) 
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    await bcrypt.hash(password, 10).then((hash) => {
        users.create({
            emp_no: emp_no,
            house: house,
            username: username,
            email: emailLowerCase,
            password: hash,
            roles: roles
        });
        res.json( "تم إنشاء مستخدم بنجاح" );
    });
});

router.route('/update')
.put(async (req, res) => {
    const { id, username, roles, active, password } = req.body
    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }
    // Does the user exist to update?
    const user = await users.findByPk(id)  
    if (!user) {   
        return res.status(400).json({ message: 'User not found' })   
    } 
    // Check for duplicate 
    const duplicate = await users.findOne({ username })
    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    user.username = username
    user.roles = roles
    user.active = active
    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }
    const updatedUser = await user.save()  
    res.json({ message: `${updatedUser.username} updated` })
});

// @desc Delete a user
// @route DELETE /users
// @access Private
router.route('/users/delete/:id')
.delete(async (req, res) => {
    const { id } = req.params
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }
    // Does the user still have assigned notes? 
    // Does the user exist to delete?
    const user = await users.findByPk(id)
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    const result = await user.destroy()
    const reply = `Username ${result.username} with ID ${result._id} deleted`
    res.json(reply)
});




module.exports = router;
