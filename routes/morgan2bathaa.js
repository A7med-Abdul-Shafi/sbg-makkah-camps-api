const express = require("express");
const router = express.Router();
const { morgan2bathaa, morgan2bathaarooms } = require('../models');
const upload = require('../middlewares/multer.config');
const excelMorgan2Bathaa = require('../controllers/excelMorgan2Bathaa.js');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const date = new Date()
router
    .route('/morgan2bathaa')
    .get(async (req, res) => {
        const alameiaData = await morgan2bathaa.findAll()
        res.send(alameiaData)
    });
    ///////////////////////////// morgan2bathaa Rooms List
router
.route('/morgan2bathaarooms/list')    
.get(async (req,res)=> {
    const alameiaRoomsList = await morgan2bathaarooms.findAll({
        where: {
            capacity: {
                [Op.gt]: 0,
            }
        },
        attributes: ['room','capacity']
    })
    res.send(alameiaRoomsList)
})
///////////////////////////// morgan2bathaa Rooms List
///////////////////////////////////////////////////// الفراغات
router
    .route('/morgan2bathaa/vacant') 
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({ 
            attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['morgan2bathaa.room_no'],  
            raw: true,
            order: Sequelize.literal('count DESC')
        })        
        res.send(countAlameia);                     
    });       
router   
    .route('/morgan2bathaa/filter') 
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            attributes: ['id','room_no'],
        })        
        res.send(countAlameia);                     
    });       
/////////////////////////////////////////////////////// الفراغات
    ///////////////////////////////////// Delete all whwer out_date < firstDay
router.delete('/morgan2bathaa/delete', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const result = await morgan2bathaa.destroy({
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
    .route('/morgan2bathaa/projects')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            attributes: ['project'],
            group: ['morgan2bathaa.project'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
//////////////////////////////////////////// Projects - settelement - Filter
router
    .route('/morgan2bathaa/in_reason')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            attributes: ['in_reason'],
            group: ['morgan2bathaa.in_reason'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
///////////////////////////////////////////search 
router
    .route("/morgan2bathaa/search")
    .get(async (req, res) => {
        const { q } = req.query;
        if (q.includes('/') || q.includes('-') || typeof +q === 'string') {
            console.log(typeof q)
            const data = await morgan2bathaa.findAll({
                where: {
                    room_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (isNaN(parseFloat(q))) {
            const data = await morgan2bathaa.findAll({
                where: {
                    name: {
                        [Op.startsWith]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length < 8 && typeof parseInt(q) === 'number') {
            const data = await morgan2bathaa.findAll({
                where: {
                    emp_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length === 10) {
            const data = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await morgan2bathaa.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (morgan2bathaa) {
                // Check if record exists in db
                if (morgan2bathaa) {
                    morgan2bathaa.update(record)
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
    .route('/morgan2bathaa/count')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.or]: {
                        [Op.gte]: new Date(),
                        [Op.is]: null
                    }
                },

            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['morgan2bathaa.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
///////////////////////////////////////// عدد العمال في القاعدة
//////////////////////////////////////// عدد الإخلاءات
router
    .route('/morgan2bathaa/count/clear')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.not]: null
                },
            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['morgan2bathaa.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
//////////////////////////////////////// عدد الإخلاءات
////////////////////////////////////////// Edit
router
    .route("/morgan2bathaa/search/edit")
    .get(async (req, res) => {
        const { q } = req.query;
        const data = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egypts')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamans')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistans')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indias')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshs')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesias')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipins')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
//المطاف
router
    .route('/morgan2bathaa/project/egyptm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiam')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiam')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptsh')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamansh')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistansh')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiash')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshsh')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiash')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinsh')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptsa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamansa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistansa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiasa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshsa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiasa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinsa')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptce')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamance')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistance')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiace')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshce')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiace')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipince')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptinf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamaninf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistaninf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiainf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshinf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiainf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipininf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptsaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamansaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistansaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiasaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshsaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiasaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinsaf')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptwarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanwarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanwarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiawarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshwarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiawarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinwarm')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egypthou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanhou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanhou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiahou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshhou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiahou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinhou')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptmas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanmas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanmas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiamas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshmas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiamas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinmas')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiaib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiaib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinib')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egypt16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yaman16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistan16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/india16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladesh16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesia16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipin16')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiaco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiaco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinco')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptmar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanmar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanmar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiamar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshmar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiamar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinmar')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptshw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanshw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanshw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiashw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshshw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiashw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinshw')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egypthr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanhr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanhr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiahr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshhr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiahr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinhr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/project/egyptrr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/yamanrr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/pakistanrr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indiarr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/bangladeshrr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/indonesiarr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/morgan2bathaa/project/philipinrr')
    .get(async (req, res) => {
        const countAlameia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/dues/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/morgan2bathaa/dues/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/clear3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/masar3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/mataf3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/shameya3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/dues/iblik3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await morgan2bathaa.findAll({
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
    .route('/morgan2bathaa/egypt')
    .get(async (req, res) => {
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }]
            }
        });
        res.send(countEgypt);
    });
router
    .route('/morgan2bathaa/yaman')
    .get(async (req, res) => {
        const countYaman = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }]
            }
        });
        res.send(countYaman);
    });
router
    .route('/morgan2bathaa/pakistan')
    .get(async (req, res) => {
        const countPakistan = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }]
            }
        });
        res.send(countPakistan);
    });
router
    .route('/morgan2bathaa/india')
    .get(async (req, res) => {
        const countIndia = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }]
            }
        });
        res.send(countIndia);
    });
router
    .route('/morgan2bathaa/bangladesh')
    .get(async (req, res) => {
        const countBangladesh = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }]
            }
        });
        res.send(countBangladesh);
    });
router
    .route('/morgan2bathaa/indonesia')
    .get(async (req, res) => {
        const countIndonesia = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }]
            }
        });
        res.send(countIndonesia);
    });
router
    .route('/morgan2bathaa/philipin')
    .get(async (req, res) => {
        const countPhilipin = await morgan2bathaa.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }]
            }
        });
        res.send(countPhilipin);
    });

// حصر العمال حسب الجنسيات

router
    .route('/morgan2bathaa/uploadfile')
    .post(upload.single("file"), excelMorgan2Bathaa.uploadFile);
router
    .route('/morgan2bathaa')
    .post(async (req, res) => {
        const alameiaData = { emp_no: req.body.emp_no, name: req.body.name, project: req.body.project, nationality: req.body.nationality, room_no: req.body.room_no, coupon: req.body.coupon, in_date: req.body.in_date, iqama_no: req.body.iqama_no, in_reason: req.body.in_reason, emp_photo: req.body.emp_photo, iqama_photo: req.body.iqama_photo };
        console.log(alameiaData)
        await morgan2bathaa.create(alameiaData);
        res.json(alameiaData);
    });

router
    .route('/morgan2bathaa/api/file')
    .get(excelMorgan2Bathaa.downloadFile);


router
    .route('/morgan2bathaa/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const data = await morgan2bathaa.findByPk(id);
        res.json(data);
    });

module.exports = router;
