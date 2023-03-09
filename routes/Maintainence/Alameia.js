const express = require('express')
const router = express.Router()
const { alameiaMaintainence } = require('../../models')
const { Op } = require('sequelize')
////////////////////////////////////////////////// الحرمين
router  
    .route("/haramain/maintainence/list").get(async (req, res) => {  
        const alameiaMaintainenceList = await alameiaMaintainence.findAll({
            where: {
                housing: {
                    [Op.like]: "الحرمين"
                }
            }
        })
        res.send(alameiaMaintainenceList)    
    });   
router.route("/haramain/maintainence/new").post(async (req, res) => {   
    const todo = { emp_no: req.body.emp_no, name: req.body.name, room_no: req.body.room_no, iqama_no: req.body.iqama_no, nationality: req.body.nationality, content: req.body.content, housing:req.body.housing }   
    const addTodo = await alameiaMaintainence.create(todo)
    res.json(addTodo)      
}) 
router.route("/haramainmaintainence/delete/:id").delete(async (req, res) => {
    const id = req.params.id 
    const item = await alameiaMaintainence.findOne({
        where: {
            id: id
        }
    })
    const deleteTodo = await item.destroy()
    const reply = `Username ${deleteTodo.username} with ID ${deleteTodo._id} deleted`
    res.json(reply)        
}) 
router.route('/haramainmaintainence/update/:id')
.patch(async (req, res) => { 
    const id = req.params.id
    const status = "تم معالجة الطلب"
    const findTodo = await alameiaMaintainence.update({
        status: status
    },
    {
        where: {id: id}
    }
    )   
    res.send({ message: `${findTodo.username} updated` })
});
router  
    .route("/alameiamaintainence/list").get(async (req, res) => {  
        const alameiaMaintainenceList = await alameiaMaintainence.findAll({
            where: {
                housing: {
                    [Op.like]: "العالمية"
                }
            }
        })
        res.send(alameiaMaintainenceList)    
    }); 
router  
    .route("/alameiamaintainence/list/open").get(async (req, res) => {  
        const alameiaMaintainenceList = await alameiaMaintainence.findAll({
            where: {
                status:"تحت الإجراء"
            }
        })
        res.send(alameiaMaintainenceList)    
    }); 
router.route("/alameia/maintainence/new").post(async (req, res) => {   
    const todo = { emp_no: req.body.emp_no, name: req.body.name, room_no: req.body.room_no, iqama_no: req.body.iqama_no, nationality: req.body.nationality, content: req.body.content, housing:req.body.housing }   
    const addTodo = await alameiaMaintainence.create(todo)
    res.json(addTodo)      
}) 
router.route("/alameiamaintainence/delete/:id").delete(async (req, res) => {
    const id = req.params.id 
    const item = await alameiaMaintainence.findOne({
        where: {
            id: id
        }
    })
    const deleteTodo = await item.destroy()
    const reply = `Username ${deleteTodo.username} with ID ${deleteTodo._id} deleted`
    res.json(reply)        
}) 
router.route('/alameiamaintainence/update/:id')
.patch(async (req, res) => { 
    const id = req.params.id
    const status = "تم معالجة الطلب"
    const findTodo = await alameiaMaintainence.update({
        status: status
    },
    {
        where: {id: id}
    }
    )   
    res.send({ message: `${findTodo.username} updated` })
});

////////////////////////////////////////////////// إيواء 1
router  
    .route("/ewaaamaintainence/list").get(async (req, res) => {  
        const alameiaMaintainenceList = await alameiaMaintainence.findAll({
            where: {
                housing: {
                    [Op.like]: "إيواء 1"
                }
            }
        })
        res.send(alameiaMaintainenceList)    
    }); 
router.route("/ewaaa/maintainence/new").post(async (req, res) => {   
    const todo = { emp_no: req.body.emp_no, name: req.body.name, room_no: req.body.room_no, iqama_no: req.body.iqama_no, nationality: req.body.nationality, content: req.body.content, housing:req.body.housing }   
    const addTodo = await alameiaMaintainence.create(todo)
    res.json(addTodo)      
}) 
router.route("/ewaaamaintainence/delete/:id").delete(async (req, res) => {
    const id = req.params.id 
    const item = await alameiaMaintainence.findOne({
        where: {
            id: id
        }
    })
    const deleteTodo = await item.destroy()
    const reply = `Username ${deleteTodo.username} with ID ${deleteTodo._id} deleted`
    res.json(reply)        
}) 
router.route('/ewaaamaintainence/update/:id')
.patch(async (req, res) => { 
    const id = req.params.id
    const status = "تم معالجة الطلب"
    const findTodo = await alameiaMaintainence.update({
        status: status
    },
    {
        where: {id: id}
    }
    )   
    res.send({ message: `${findTodo.username} updated` })
});
////////////////////////////////////////////////// إيواء 2
router  
    .route("/ewaabmaintainence/list").get(async (req, res) => {  
        const alameiaMaintainenceList = await alameiaMaintainence.findAll({
            where: {
                housing: {
                    [Op.like]: "إيواء 2"
                }
            }
        })
        res.send(alameiaMaintainenceList)    
    }); 
router.route("/ewaab/maintainence/new").post(async (req, res) => {   
    const todo = { emp_no: req.body.emp_no, name: req.body.name, room_no: req.body.room_no, iqama_no: req.body.iqama_no, nationality: req.body.nationality, content: req.body.content, housing:req.body.housing }   
    const addTodo = await alameiaMaintainence.create(todo)
    res.json(addTodo)      
}) 
router.route("/ewaabmaintainence/delete/:id").delete(async (req, res) => {
    const id = req.params.id 
    const item = await alameiaMaintainence.findOne({
        where: {
            id: id
        }
    })
    const deleteTodo = await item.destroy()
    const reply = `Username ${deleteTodo.username} with ID ${deleteTodo._id} deleted`
    res.json(reply)        
}) 
router.route('/ewaabmaintainence/update/:id')
.patch(async (req, res) => { 
    const id = req.params.id
    const status = "تم معالجة الطلب"
    const findTodo = await alameiaMaintainence.update({
        status: status
    },
    {
        where: {id: id}
    }
    )   
    res.send({ message: `${findTodo.username} updated` })
});

module.exports = router
