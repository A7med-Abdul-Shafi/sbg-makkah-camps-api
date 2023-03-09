const readXlsxFile = require('read-excel-file/node');
const {fedarooms} = require('../models');
// const alameia = require('../models/alameia.js');
const path = require('path');

exports.uploadVacantFile = (req, res) => {
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
                    room: rows[i][0],
                    capacity: rows[i][1],
                }
                haramains.push(alameia);
            }
            fedarooms.bulkCreate(haramains).then(() => {
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
