const excel = require('exceljs');
const readXlsxFile = require('read-excel-file/node');
const {rahmaneya} = require('../models');
// const rahmaneya = require('../models/rahmaneya.js');
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
                let rahmaneya = {
                    emp_no: rows[i][0],
                    class: rows[i][1],
                    name: rows[i][2],
                    room_no: rows[i][3],
                    profession: rows[i][4],
                    nationality: rows[i][5],
                    project: rows[i][6],
                    iqama_no: rows[i][7],
                    passport_no: rows[i][8],
                    in_date: rows[i][9],
                    in_reason: rows[i][10],
                    out_date: rows[i][11],
                    out_reason: rows[i][12],
                    coupon: rows[i][13],
                    mobile: rows[i][14],
                    housing: rows[i][15]
                }
                haramains.push(rahmaneya);
            }
            rahmaneya.bulkCreate(haramains).then(() => {
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
}

exports.downloadFile = (req, res) => {
    rahmaneya.findAll().then(async objects => {
        var haramains = [];
        let length = objects.length;
        for (let i = 0; i < length; i++) {
            let datavalues = objects[i].dataValues;
            let rahmaneya = {
                emp_no: datavalues.emp_no,
                class: datavalues.class,
                name: datavalues.name,
                room_no: datavalues.room_no,
                profession: datavalues.profession,
                nationality: datavalues.nationality,
                project: datavalues.project,
                iqama_no: datavalues.iqama_no,
                passport_no: datavalues.passport_no,
                in_date: datavalues.in_date,
                in_reason: datavalues.in_reason,
                out_date: datavalues.out_date,
                out_reason: datavalues.out_reason,
                coupon: datavalues.coupon,
                mobile: datavalues.mobile,
                housing: datavalues.housing
            };
            haramains.push(rahmaneya);
        }
        const jsonHaramains = JSON.parse(JSON.stringify(haramains));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('rahmaneya'); //creating worksheet
        worksheet.columns = [
            { header: '?????????? ??????????????', key: 'emp_no', width: 12 },
            { header: '??????????', key: 'class', width: 12 },
            { header: '??????????', key: 'name', width: 22 },
            { header: '?????? ????????????', key: 'room_no', width: 8 },
            { header: '????????????', key: 'profession', width: 15 },
            { header: '??????????????', key: 'nationality', width: 10 },
            { header: '??????????????', key: 'project', width: 25 },
            { header: '?????? ??????????????', key: 'iqama_no', width: 15 },
            { header: '?????? ????????????', key: 'passport_no', width: 12 },
            { header: '?????????? ??????????????', key: 'in_date', width: 15 },
            { header: '?????? ??????????????', key: 'in_reason', width: 23 },
            { header: '?????????? ????????????', key: 'out_date', width: 12 },
            { header: '?????? ????????????', key: 'out_reason', width: 17 },
            { header: '?????? ????????????', key: 'coupon', width: 10 },
            { header: '????????', key: 'mobile', width: 10 },
            { header: '??????????', key: 'housing', width: 15 }
        ];
        // Add Array Rows
        worksheet.addRows(jsonHaramains);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'Haramain.xlsx');
        return workbook.xlsx.write(res)
            .then(function () {
                res.status(200).end();
            });
    });
}

/** 
 * Upload multiple Excel Files
 *  
 * @param {*} req 
 * @param {*} res 
 */

exports.downloadFile = (req, res) => {
    rahmaneya.findAll().then(async objects => {
        var haramains = [];
        let length = objects.length;
        for (let i = 0; i < length; i++) {
            let datavalues = objects[i].dataValues;
            let rahmaneya = {
                emp_no: datavalues.emp_no,
                class: datavalues.class,
                name: datavalues.name,
                room_no: datavalues.room_no,
                profession: datavalues.profession,
                nationality: datavalues.nationality,
                project: datavalues.project,
                iqama_no: datavalues.iqama_no,
                passport_no: datavalues.passport_no,
                in_date: datavalues.in_date,
                in_reason: datavalues.in_reason,
                out_date: datavalues.out_date,
                out_reason: datavalues.out_reason,
                coupon: datavalues.coupon,
                mobile: datavalues.mobile,
                housing: datavalues.housing
            };
            haramains.push(rahmaneya);
        }
        console.log(haramains);
        const jsonHaramains = JSON.parse(JSON.stringify(haramains));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('rahmaneya'); //creating worksheet
        worksheet.columns = [
            { header: '?????????? ??????????????', key: 'emp_no', width: 12 },
            { header: '??????????', key: 'class', width: 12 },
            { header: '??????????', key: 'name', width: 22 },
            { header: '?????? ????????????', key: 'room_no', width: 8 },
            { header: '????????????', key: 'profession', width: 15 },
            { header: '??????????????', key: 'nationality', width: 10 },
            { header: '??????????????', key: 'project', width: 25 },
            { header: '?????? ??????????????', key: 'iqama_no', width: 15 },
            { header: '?????? ????????????', key: 'passport_no', width: 12 },
            { header: '?????????? ??????????????', key: 'in_date', width: 15 },
            { header: '?????? ??????????????', key: 'in_reason', width: 23 },
            { header: '?????????? ????????????', key: 'out_date', width: 12 },
            { header: '?????? ????????????', key: 'out_reason', width: 17 },
            { header: '?????? ????????????', key: 'coupon', width: 10 },
            { header: '????????', key: 'mobile', width: 10 },
            { header: '??????????', key: 'housing', width: 15 }
        ];
        // Add Array Rows
        worksheet.addRows(jsonHaramains);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'Haramain.xlsx');
        return workbook.xlsx.write(res)
            .then(function () {
                res.status(200).end();
            });
    });
}