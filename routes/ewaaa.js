const express = require("express");
const router = express.Router();
const { ewaaa, ewaaarooms } = require('../models');
const upload = require('../middlewares/multer.config');
const excelEwaaa = require('../controllers/excelEwaaa.js');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const date = new Date() 
router 
    .route('/ewaaa')
    .get(async (req, res) => {
        const alameiaData = await ewaaa.findAll()
        res.send(alameiaData)
    });
    ///////////////////////////// ewaaa Rooms List
router
.route('/ewaaarooms/list')    
.get(async (req,res)=> {
    const alameiaRoomsList = await ewaaarooms.findAll({
        where: {
            capacity: {
                [Op.gt]: 0,
            }
        },
        attributes: ['room','capacity']
    })
    res.send(alameiaRoomsList)
})
///////////////////////////// ewaaa Rooms List
///////////////////////////////////////////////////// الفراغات
router
    .route('/ewaaa/vacant') 
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({ 
            attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['ewaaa.room_no'],  
            raw: true,
            order: Sequelize.literal('count DESC')
        })        
        res.send(countAlameia);                     
    });       
router   
    .route('/ewaaa/filter') 
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            attributes: ['id','room_no'],
        })        
        res.send(countAlameia);                     
    });       
/////////////////////////////////////////////////////// الفراغات
    ///////////////////////////////////// Delete all whwer out_date < firstDay
router.delete('/ewaaa/delete', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const result = await ewaaa.destroy({
        where: {
                out_date:{
                    [Op.lt]: firstDay
                }
            }})
    res.json(result)
});
///////////////////////////////////// Delete all whwer out_date < firstDay
//////////////////////////////////////////// Projects - settelement - Filter
router
    .route('/ewaaa/projects')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            attributes: ['project'],
            group: ['ewaaa.project'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
//////////////////////////////////////////// Projects - settelement - Filter
router
    .route('/ewaaa/in_reason')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            attributes: ['in_reason'],
            group: ['ewaaa.in_reason'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
///////////////////////////////////////////search 
router
    .route("/ewaaa/search")
    .get(async (req, res) => {
        const { q } = req.query;
        if (q.includes('/') || q.includes('-') || typeof +q === 'string') {
            console.log(typeof q)
            const data = await ewaaa.findAll({
                where: {
                    room_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (isNaN(parseFloat(q))) {
            const data = await ewaaa.findAll({
                where: {
                    name: {
                        [Op.startsWith]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length < 8 && typeof parseInt(q) === 'number') {
            const data = await ewaaa.findAll({
                where: {
                    emp_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length === 10) {
            const data = await ewaaa.findAll({
                where: {
                    iqama_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        
        }
    });
///////////////////////////////////////////search by name
///////////////////////////////edit labor
router
    .route('/ewaaa/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await ewaaa.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (ewaaa) {
                // Check if record exists in db
                if (ewaaa) {
                    ewaaa.update(record)
                    console.log('تم تحديث سجل بنجاح')
                }
            })
            .catch(function (err) {
                res.send(err)
            })
        res.json(record);
    });
///////////////////////////////// edit labor
///////////////////////////////////////// عدد العمال في القاعدة
router
    .route('/ewaaa/count')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.or]: {
                        [Op.gte]: new Date(),
                        [Op.is]: null
                    }
                },

            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['ewaaa.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
///////////////////////////////////////// عدد العمال في القاعدة
//////////////////////////////////////// عدد الإخلاءات
router
    .route('/ewaaa/count/clear')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.not]: null
                },
            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['ewaaa.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
//////////////////////////////////////// عدد الإخلاءات
////////////////////////////////////////// Edit
router
    .route("/ewaaa/search/edit")
    .get(async (req, res) => {
        const { q } = req.query;
        const data = await ewaaa.findAll({
            where: {
                emp_no: {
                    [Op.like]: q
                }
            }
        });
        res.json(data);
    });
////////////////////////////////////////// Edit
///////////////////////////////////////////// حصر العمال حسب المشروع
router
    .route('/ewaaa/project/egypts')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamans')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistans')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indias')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshs')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesias')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipins')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
//المطاف
router
    .route('/ewaaa/project/egyptm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiam')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiam')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
//المطاف
//shameya
router
    .route('/ewaaa/project/egyptsh')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamansh')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistansh')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiash')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshsh')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiash')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinsh')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
//shameya
//sahat
router
    .route('/ewaaa/project/egyptsa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamansa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistansa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiasa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshsa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiasa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinsa')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
////////////////////////////sahat
///////////////////////////////central station
router
    .route('/ewaaa/project/egyptce')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamance')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistance')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiace')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshce')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiace')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipince')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
///////////////////////central station

///////////////////////// infra structure
router
    .route('/ewaaa/project/egyptinf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamaninf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistaninf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiainf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshinf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiainf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipininf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
////////////////////////// infra structure
////////////////////////// safety
router
    .route('/ewaaa/project/egyptsaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamansaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistansaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiasaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshsaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiasaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinsaf')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
////////////////////////// safety
//////// حصر العمال حسب المشروع
/////////////////////// warehouse mataf
router
    .route('/ewaaa/project/egyptwarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanwarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanwarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiawarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshwarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiawarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinwarm')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
/////////////////////// warehouse mataf
////////////////////////// housing
router
    .route('/ewaaa/project/egypthou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanhou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanhou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiahou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshhou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiahou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinhou')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
/////////////////////// housing
///////////////////////////// masar
router
    .route('/ewaaa/project/egyptmas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanmas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanmas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiamas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshmas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiamas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinmas')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
//////////////////////////////// masar
////////////////////////////// iblik
router
    .route('/ewaaa/project/egyptib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiaib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiaib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinib')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
////////////////////////////// iblik
///////////////////////////// section 16
router
    .route('/ewaaa/project/egypt16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yaman16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistan16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/india16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladesh16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesia16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipin16')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مباني الخدمات-القطاع 16" }, { project: "مباني الخدمات - القطاع 16" }, { project: "مباني الخدمات -القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
/////////////////////////// section 16
/////////////////////////// station concrete
router
    .route('/ewaaa/project/egyptco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiaco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiaco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinco')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });

/////////////////////////// station concrete
/////////////////////////// marwa
router
    .route('/ewaaa/project/egyptmar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanmar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanmar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiamar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshmar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiamar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinmar')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
/////////////////////////// marwa
///////////////////////////shameya warehouse
router
    .route('/ewaaa/project/egyptshw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanshw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanshw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiashw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshshw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiashw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinshw')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
///////////////////////////shameya warehouse
/////////////////////////// HR
router
    .route('/ewaaa/project/egypthr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanhr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanhr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiahr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshhr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiahr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinhr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
/////////////////////////// HR
/////////////////////////// ring road
router
    .route('/ewaaa/project/egyptrr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/yamanrr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/pakistanrr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indiarr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/bangladeshrr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/indonesiarr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaaa/project/philipinrr')
    .get(async (req, res) => {
        const countAlameia = await ewaaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
/////////////////////////// ring road
////////////////////////////////////////////////////////////////////// المستخلص
////////////////////////////////////////////// حساب المستخلص يومي
router
    .route('/ewaaa/dues/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.lte]: lastDay,
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.eq]: firstDay 
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.lte]: lastDay,
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.eq]: firstDay 
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewaaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaaa/dues/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewaaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
//////////////////////////////////end of calculate settlement daily
///////////////////////////////////////// pure days full month  - كل المشاريع
router
    .route('/ewaaa/dues/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPhilipin);
    });
/////////////////////////////////////////// Case 1
router
    .route('/ewaaa/dues/clear/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/clear/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "اليمن", "يمنى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/clear/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستان", "باكستاني", "باكستانى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/clear/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["أندونيسي", "اندونيسي", "اندونيسيا", "إندونيسيا", "إندونيسى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/clear/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الهند", "هندي", "هندى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/clear/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/clear/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////////// Case 1
///////////////////////////////////////// Case 2
router
    .route('/ewaaa/dues/clear2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/clear2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/clear2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/clear2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/clear2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/clear2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/clear2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////////////// Case 2
//////////////////////////////////////////// Case 3
router
    .route('/ewaaa/dues/clear3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/clear3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/clear3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/clear3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/clear3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/clear3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/clear3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////////////// Case 3
//////////////////////////////////////////////////////////// Masar duse
/////////////////////////////////////// pure days full month
router
    .route('/ewaaa/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////// Case 1
router
    .route('/ewaaa/dues/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////// Case 1
///////////////////////////////////// Case 2
router
    .route('/ewaaa/dues/masar2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/masar2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "اليمن", "يمنى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/masar2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستان", "باكستاني", "باكستانى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/masar2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["أندونيسي", "اندونيسي", "اندونيسيا", "إندونيسيا", "إندونيسى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/masar2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الهند", "هندي", "هندى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/masar2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/masar2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////// Case 2
///////////////////////////////////// Case 3
router
    .route('/ewaaa/dues/masar3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/masar3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/masar3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/masar3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/masar3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/masar3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/masar3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مؤسسة مسار المتقدمة للنقل المحدودة", "مسار"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////// Case 3
//////////////////////////////////////////////////////// Mataf duse
//////////////////////////////////// pure days full month
router
    .route('/ewaaa/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////// pure days full month
//////////////////////////////////////// Case 1
router
    .route('/ewaaa/dues/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////////// Case 1
//////////////////////////////////////// Case 2
router
    .route('/ewaaa/dues/mataf2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/mataf2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "اليمن", "يمنى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/mataf2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستان", "باكستاني", "باكستانى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/mataf2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["أندونيسي", "اندونيسي", "اندونيسيا", "إندونيسيا", "إندونيسى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/mataf2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الهند", "هندي", "هندى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/mataf2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/mataf2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////////// Case 2
//////////////////////////////////////// Case 3
router
    .route('/ewaaa/dues/mataf3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/mataf3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/mataf3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/mataf3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/mataf3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/mataf3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/mataf3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["توسعة صحن المطاف", "المطاف"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPhilipin);
    });
////////////////////////////////////// Case 3
/////////////////////////////////////////////////////// Shameya duse
////////////////////////////////////// pure days full month
router
    .route('/ewaaa/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPhilipin);
    });
//////////////////////////////////////// pure days full month
/////////////////////////////////////// Case 1
router
    .route('/ewaaa/dues/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
/////////////////////////////////////// Case 1
/////////////////////////////////////// Case 2
router
    .route('/ewaaa/dues/shameya2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/shameya2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "اليمن", "يمنى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/shameya2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستان", "باكستاني", "باكستانى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/shameya2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["أندونيسي", "اندونيسي", "اندونيسيا", "إندونيسيا", "إندونيسى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/shameya2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الهند", "هندي", "هندى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/shameya2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/shameya2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
/////////////////////////////////////// Case 2
/////////////////////////////////////// Case 3
router
    .route('/ewaaa/dues/shameya3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/shameya3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/shameya3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/shameya3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/shameya3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/shameya3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/shameya3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["مشروع توسعة الحرم المكي (الشامية) ", "الشامية"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPhilipin);
    });
/////////////////////////////////////// Case 3
//////////////////////////////////////////////// Shameya duse
//////////////////////////////////////////////////////////////// IBLIK duse
///////////////////////////////////// pure days full month
router
    .route('/ewaaa/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date:
                {
                    [Op.or]: {
                        [Op.gt]: lastDay,
                        [Op.is]: null
                    }
                }
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////// pure days full month
///////////////////////////////////// Case 1
router
    .route('/ewaaa/dues/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.lte]: firstDay
                },
                out_date: {
                    [Op.lte]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////// Case 1
///////////////////////////////////// Case 2
router
    .route('/ewaaa/dues/iblik2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/iblik2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "اليمن", "يمنى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/iblik2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستان", "باكستاني", "باكستانى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/iblik2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["أندونيسي", "اندونيسي", "اندونيسيا", "إندونيسيا", "إندونيسى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/iblik2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الهند", "هندي", "هندى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/iblik2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/iblik2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date:
                {
                    [Op.lt]: lastDay,
                },
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////// Case 2
///////////////////////////////////// Case 3
router
    .route('/ewaaa/dues/iblik3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["مصر", "مصرى", "مصري"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/dues/iblik3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["يمني", "يمنى", "اليمن"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/dues/iblik3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["باكستاني", "باكستانى", "باكستان"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/dues/iblik3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["هندي", "هندى", "الهند"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/dues/iblik3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["بنجلاديش", "بنجلاديشي", "بنجلاديشى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/dues/iblik3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["إندونيسي", "اندونيسي", "اندونيسى", "إندونيسى", "اندونيسيا"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/dues/iblik3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewaaa.findAll({
            where: {
                nationality: {
                    [Op.or]: ["الفلبين", "فلبيني", "فلبينى"]
                },
                project: {
                    [Op.or]: ["عيسي بن لادن ( إبليك)", "عيسى بن لادن (إبليك)", "عيسى بن لادن (ابليك)"]
                },
                in_date: {
                    [Op.gt]: firstDay
                },
                out_date: {
                    [Op.or]: {
                        [Op.gte]: lastDay,
                        [Op.is]: null
                    },
                }
            },
        });
        res.send(countPhilipin);
    });
///////////////////////////////////// Case 3
/////////////////////////////////////////////////// IBLIK duse
/////////////////////////////////////////////////////////////////////////// المستخلص

///////////////////////////////////////// حصر العمال حسب الجنسيات
router
    .route('/ewaaa/egypt')
    .get(async (req, res) => {
        const countEgypt = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }]
            }
        });
        res.send(countEgypt);
    });
router
    .route('/ewaaa/yaman')
    .get(async (req, res) => {
        const countYaman = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }]
            }
        });
        res.send(countYaman);
    });
router
    .route('/ewaaa/pakistan')
    .get(async (req, res) => {
        const countPakistan = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }]
            }
        });
        res.send(countPakistan);
    });
router
    .route('/ewaaa/india')
    .get(async (req, res) => {
        const countIndia = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }]
            }
        });
        res.send(countIndia);
    });
router
    .route('/ewaaa/bangladesh')
    .get(async (req, res) => {
        const countBangladesh = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }]
            }
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaaa/indonesia')
    .get(async (req, res) => {
        const countIndonesia = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }]
            }
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaaa/philipin')
    .get(async (req, res) => {
        const countPhilipin = await ewaaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }]
            }
        });
        res.send(countPhilipin);
    });

// حصر العمال حسب الجنسيات

router
    .route('/ewaaa/uploadfile')
    .post(upload.single("file"), excelEwaaa.uploadFile);
router
    .route('/ewaaa')
    .post(async (req, res) => {
        const alameiaData = { emp_no: req.body.emp_no, name: req.body.name, project: req.body.project, nationality: req.body.nationality, room_no: req.body.room_no, coupon: req.body.coupon, in_date: req.body.in_date, iqama_no: req.body.iqama_no, in_reason: req.body.in_reason, emp_photo: req.body.emp_photo, iqama_photo: req.body.iqama_photo };
        console.log(alameiaData)
        await ewaaa.create(alameiaData);
        res.json(alameiaData);
    });

router
    .route('/ewaaa/api/file')
    .get(excelEwaaa.downloadFile);


router
    .route('/ewaaa/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const data = await ewaaa.findByPk(id);
        res.json(data);
    });

module.exports = router;
