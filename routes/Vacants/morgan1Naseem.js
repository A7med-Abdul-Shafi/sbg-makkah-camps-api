const express = require('express')
const router = express.Router()
const { morgan1naseem, morgan1naseemrooms } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs'); 
const Sequelize = require('sequelize');    
const upload = require('../../middlewares/multer.config');
const excelMorgan1Naseem = require('../../controllers/excelMorgan1NaseemVacant.js');

function getRoomCapacity(object, row) {
    return object[row];
}

const downloadFile = async (req, res) => {
    await morgan1naseem.findAll({
        attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['morgan1naseem.room_no'],  
            // raw: true,
            order: Sequelize.literal('count DESC')
    }).then(async objects => {
        const capacity = await morgan1naseemrooms.findAll({
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
            let morgan1naseem = {
                room_no: datavalues.room_no,
                nationality: datavalues.nationality,
                count: getRoomCapacity(roomsCapacity,datavalues.room_no)>datavalues.count
                ? 
                getRoomCapacity(roomsCapacity,datavalues.room_no)-datavalues.count 
                : 
                null               
            };
            
            alameias.push(morgan1naseem);
        }
        console.log(alameias);
        
        const vacancies = alameias.filter((person) => {  
            return (person.count < getRoomCapacity(roomsCapacity,person.room_no)) ? person.count : null ; 
        });
        console.log(vacancies)
        const jsonAlameias = JSON.parse(JSON.stringify(vacancies));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('morgan1naseem'); //creating worksheet
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
    .route('/morgan1naseemvacant/file')  
    .get(downloadFile);
    
router
    .route('/vacantmorgan1naseem/uploadfile')
    .post(upload.single("file"), excelMorgan1Naseem.uploadVacantFile);

router
    .route("/searchvacant/morgan1naseem")
    .get(async (req, res) => {
        const { q } = req.query;
            const data = await morgan1naseemrooms.findAll({
                where: {
                    room: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
    });

router
    .route('/morgan1naseemvacant/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await morgan1naseemrooms.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (morgan1naseem) {
                // Check if record exists in db
                if (morgan1naseem) {
                    morgan1naseem.update(record)
                    console.log('تم تحديث سجل بنجاح')
                }
            })
            .catch(function (err) {
                res.send(err)
            })
        res.json(record);
    });
module.exports = router
