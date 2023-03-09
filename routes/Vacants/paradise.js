const express = require('express')
const router = express.Router()
const { paradise, paradiserooms } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs'); 
const Sequelize = require('sequelize');    
const upload = require('../../middlewares/multer.config');
const excelParadise = require('../../controllers/excelParadiseVacant.js');

function getRoomCapacity(object, row) {
    return object[row];
}

const downloadFile = async (req, res) => {
    await paradise.findAll({
        attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['paradise.room_no'],  
            // raw: true,
            order: Sequelize.literal('count DESC')
    }).then(async objects => {
        const capacity = await paradiserooms.findAll({
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
            let paradise = {
                room_no: datavalues.room_no,
                nationality: datavalues.nationality,
                count: getRoomCapacity(roomsCapacity,datavalues.room_no)>datavalues.count
                ? 
                getRoomCapacity(roomsCapacity,datavalues.room_no)-datavalues.count 
                : 
                null               
            };
            
            alameias.push(paradise);
        }
        console.log(alameias);
        
        const vacancies = alameias.filter((person) => {  
            return (person.count < getRoomCapacity(roomsCapacity,person.room_no)) ? person.count : null ; 
        });
        console.log(vacancies)
        const jsonAlameias = JSON.parse(JSON.stringify(vacancies));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('paradise'); //creating worksheet
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
    .route('/paradisevacant/file')  
    .get(downloadFile);
    
router
    .route('/vacantparadise/uploadfile')
    .post(upload.single("file"), excelParadise.uploadVacantFile);

router
    .route("/searchvacant/paradise")
    .get(async (req, res) => {
        const { q } = req.query;
            const data = await paradiserooms.findAll({
                where: {
                    room: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
    });

router
    .route('/paradisevacant/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await paradiserooms.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (paradise) {
                // Check if record exists in db
                if (paradise) {
                    paradise.update(record)
                    console.log('تم تحديث سجل بنجاح')
                }
            })
            .catch(function (err) {
                res.send(err)
            })
        res.json(record);
    });
module.exports = router
