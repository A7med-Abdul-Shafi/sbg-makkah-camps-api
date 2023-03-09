const readXlsxFile = require('read-excel-file/node');
const { customer } = require('../models');
// const alameia = require('../models/alameia.js');
const path = require('path');

exports.uploadFile = (req, res) => {
    try {
        let filePath = path.join("../server/uploads/") + req.file.filename;
        readXlsxFile(filePath).then(rows => {
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
            // Remove Header ROW 
            rows.shift();
            const haramains = [];
            let length = rows.length;
            for (let i = 0; i < length; i++) {
                let alameia = {
                    emp_no: rows[i][0],
                    name: rows[i][1],
                    profession: rows[i][2],
                    nationality: rows[i][3],
                    project: rows[i][4],
                    iqama_no: rows[i][5], 
                    passport_no: rows[i][6],
                    mobile: rows[i][7],
                }
                haramains.push(alameia);
            }
            customer.bulkCreate(haramains).then(() => {
                const result = {
                    status: "ok",
                    filename: req.file.originalname,
                    message: "Upload Successfully!",
                }
                res.json(result);
            });
        });
    } catch (error) {
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
};
