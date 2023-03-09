const express = require('express')
const router = express.Router()
const { matrafy, matrafyrooms } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs'); 
const Sequelize = require('sequelize');    
const upload = require('../../middlewares/multer.config');
const excelMatrafy = require('../../controllers/excelMatrafyVacant.js');

function getRoomCapacity(object, row) {
    return object[row];
}

const downloadFile = async (req, res) => {
    await matrafy.findAll({
        attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['matrafy.room_no'],  
            // raw: true,
            order: Sequelize.literal('count DESC')
    }).then(async objects => {
        const capacity = await matrafyrooms.findAll({
            where: {
                capacity: {
                    [Op.gt]: 0
                }
            },
            attributes: ['room', 'capacity']
        });
        const roomsCapacity = capacity?.reduce(function(map, obj) {
            map[obj.room] = obj.capacity;
            return map;
        }, {});

        var alameias = [];
        let length = objects.length;
        for (let i = 0; i < length; i++) {
            let datavalues = objects[i].dataValues;
            let matrafy = {
                room_no: datavalues.room_no,
                nationality: datavalues.nationality,
                count: getRoomCapacity(roomsCapacity,datavalues.room_no)>datavalues.count
                ? 
                getRoomCapacity(roomsCapacity,datavalues.room_no)-datavalues.count 
                : 
                null               
            };
            
            alameias.push(matrafy);
        }
        console.log(alameias);
        
        const vacancies = alameias.filter((person) => {  
            return (person.count < getRoomCapacity(roomsCapacity,person.room_no)) ? person.count : null ; 
        });
        console.log(vacancies)
        const jsonAlameias = JSON.parse(JSON.stringify(vacancies));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('matrafy'); //creating worksheet
        worksheet.columns = [
            { header: 'رقم الغرفة', key: 'room_no', width: 12 },
            { header: 'الجنسية', key: 'nationality', width: 12 },
            { header: 'عدد الفراغات', key: 'count', width: 22 },
        ];
        // Add Array Rows
        worksheet.addRows(jsonAlameias);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'Alameia.xlsx');
        return workbook.xlsx.write(res)
            .then(function () {
                res.status(200).end();
            });
    });
}

router
    .route('/matrafyvacant/file')  
    .get(downloadFile);
    
router
    .route('/vacantmatrafy/uploadfile')
    .post(upload.single("file"), excelMatrafy.uploadVacantFile);

router
    .route("/searchvacant/matrafy")
    .get(async (req, res) => {
        const { q } = req.query;
            const data = await matrafyrooms.findAll({
                where: {
                    room: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
    });

router
    .route('/matrafyvacant/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await matrafyrooms.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (matrafy) {
                // Check if record exists in db
                if (matrafy) {
                    matrafy.update(record)
                    console.log('تم تحديث سجل بنجاح')
                }
            })
            .catch(function (err) {
                res.send(err)
            })
        res.json(record);
    });
module.exports = router
