const express = require("express");
const router = express.Router();
const { customer } = require('../models');
const upload = require('../middlewares/multer.config');
const excelCustomer = require('../controllers/excelCustomer');
const { Op } = require("sequelize"); 

////////////////////////////////////////// Edit
router
    .route("/customer/search/edit")
    .get(async (req, res) => {
        const { q } = req.query;
        const data = await customer.findAll({
            where: {   
                emp_no: {
                    [Op.like]: q 
                }
            }
        });
        res.json(data);
    });
////////////////////////////////////////// Edit

///////////////////////////////edit labor
router
    .route('/customer/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await customer.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (customer) {     
                // Check if record exists in db
                if (customer) {
                    customer.update(record)
                    console.log('تم تحديث سجل بنجاح')
                }
            })
            .catch(function (err) {
                res.send(err) 
            })
        res.json(record);   
    }); 
    router
    .route('/customer/uploadfile')
    .post(upload.single("file"), excelCustomer.uploadFile);
module.exports = router;