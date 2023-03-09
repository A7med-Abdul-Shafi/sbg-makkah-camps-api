const express = require("express");
const router = express.Router();
const { batawy2, batawy2rooms } = require('../models');
const upload = require('../middlewares/multer.config');
const excelBatawy2 = require('../controllers/excelBatawy2.js');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const date = new Date()
router
    .route('/batawy2')
    .get(async (req, res) => {
        const alameiaData = await batawy2.findAll()
        res.send(alameiaData)
    });
    ///////////////////////////// batawy2 Rooms List
router
.route('/batawy2rooms/list')    
.get(async (req,res)=> {
    const alameiaRoomsList = await batawy2rooms.findAll({
        where: {
            capacity: {
                [Op.gt]: 0,
            }
        },
        attributes: ['room','capacity']
    })
    res.send(alameiaRoomsList)
})
///////////////////////////// batawy2 Rooms List
///////////////////////////////////////////////////// الفراغات
router
    .route('/batawy2/vacant') 
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({ 
            attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['batawy2.room_no'],  
            raw: true,
            order: Sequelize.literal('count DESC')
        })        
        res.send(countAlameia);                     
    });       
router   
    .route('/batawy2/filter') 
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            attributes: ['id','room_no'],
        })        
        res.send(countAlameia);                     
    });       
/////////////////////////////////////////////////////// الفراغات
    ///////////////////////////////////// Delete all whwer out_date < firstDay
router.delete('/batawy2/delete', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const result = await batawy2.destroy({
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
    .route('/batawy2/projects')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            attributes: ['project'],
            group: ['batawy2.project'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
//////////////////////////////////////////// Projects - settelement - Filter
router
    .route('/batawy2/in_reason')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            attributes: ['in_reason'],
            group: ['batawy2.in_reason'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
///////////////////////////////////////////search 
router
    .route("/batawy2/search")
    .get(async (req, res) => {
        const { q } = req.query;
        if (q.includes('/') || q.includes('-') || typeof +q === 'string') {
            console.log(typeof q)
            const data = await batawy2.findAll({
                where: {
                    room_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (isNaN(parseFloat(q))) {
            const data = await batawy2.findAll({
                where: {
                    name: {
                        [Op.startsWith]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length < 8 && typeof parseInt(q) === 'number') {
            const data = await batawy2.findAll({
                where: {
                    emp_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length === 10) {
            const data = await batawy2.findAll({
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
    .route('/batawy2/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await batawy2.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (batawy2) {
                // Check if record exists in db
                if (batawy2) {
                    batawy2.update(record)
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
    .route('/batawy2/count')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.or]: {
                        [Op.gte]: new Date(),
                        [Op.is]: null
                    }
                },

            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['batawy2.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
///////////////////////////////////////// عدد العمال في القاعدة
//////////////////////////////////////// عدد الإخلاءات
router
    .route('/batawy2/count/clear')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.not]: null
                },
            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['batawy2.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
//////////////////////////////////////// عدد الإخلاءات
////////////////////////////////////////// Edit
router
    .route("/batawy2/search/edit")
    .get(async (req, res) => {
        const { q } = req.query;
        const data = await batawy2.findAll({
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
    .route('/batawy2/project/egypts')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamans')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistans')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indias')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshs')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesias')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipins')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
//المطاف
router
    .route('/batawy2/project/egyptm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiam')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiam')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptsh')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamansh')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistansh')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiash')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshsh')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiash')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinsh')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptsa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamansa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistansa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiasa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshsa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiasa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinsa')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptce')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamance')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistance')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiace')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshce')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiace')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipince')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptinf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamaninf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistaninf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiainf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshinf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiainf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipininf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptsaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamansaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistansaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiasaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshsaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiasaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinsaf')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptwarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanwarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanwarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiawarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshwarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiawarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinwarm')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egypthou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanhou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanhou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiahou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshhou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiahou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinhou')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptmas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanmas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanmas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiamas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshmas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiamas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinmas')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiaib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiaib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinib')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egypt16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yaman16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistan16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/india16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladesh16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesia16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipin16')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiaco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiaco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinco')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptmar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanmar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanmar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiamar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshmar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiamar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinmar')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptshw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanshw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanshw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiashw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshshw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiashw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinshw')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egypthr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanhr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanhr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiahr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshhr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiahr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinhr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/project/egyptrr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/yamanrr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/pakistanrr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indiarr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/bangladeshrr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/indonesiarr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/batawy2/project/philipinrr')
    .get(async (req, res) => {
        const countAlameia = await batawy2.findAll({
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
    .route('/batawy2/dues/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await batawy2.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await batawy2.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/dues/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/clear/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/clear2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/clear3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/masar2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/masar3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/mataf3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/shameya3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await batawy2.findAll({
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
    .route('/batawy2/dues/iblik3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await batawy2.findAll({
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
    .route('/batawy2/egypt')
    .get(async (req, res) => {
        const countEgypt = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }]
            }
        });
        res.send(countEgypt);
    });
router
    .route('/batawy2/yaman')
    .get(async (req, res) => {
        const countYaman = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }]
            }
        });
        res.send(countYaman);
    });
router
    .route('/batawy2/pakistan')
    .get(async (req, res) => {
        const countPakistan = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }]
            }
        });
        res.send(countPakistan);
    });
router
    .route('/batawy2/india')
    .get(async (req, res) => {
        const countIndia = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }]
            }
        });
        res.send(countIndia);
    });
router
    .route('/batawy2/bangladesh')
    .get(async (req, res) => {
        const countBangladesh = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }]
            }
        });
        res.send(countBangladesh);
    });
router
    .route('/batawy2/indonesia')
    .get(async (req, res) => {
        const countIndonesia = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }]
            }
        });
        res.send(countIndonesia);
    });
router
    .route('/batawy2/philipin')
    .get(async (req, res) => {
        const countPhilipin = await batawy2.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }]
            }
        });
        res.send(countPhilipin);
    });

// حصر العمال حسب الجنسيات

router
    .route('/batawy2/uploadfile')
    .post(upload.single("file"), excelBatawy2.uploadFile);
router
    .route('/batawy2')
    .post(async (req, res) => {
        const alameiaData = { emp_no: req.body.emp_no, name: req.body.name, project: req.body.project, nationality: req.body.nationality, room_no: req.body.room_no, coupon: req.body.coupon, in_date: req.body.in_date, iqama_no: req.body.iqama_no, in_reason: req.body.in_reason, emp_photo: req.body.emp_photo, iqama_photo: req.body.iqama_photo };
        console.log(alameiaData)
        await batawy2.create(alameiaData);
        res.json(alameiaData);
    });

router
    .route('/batawy2/api/file')
    .get(excelBatawy2.downloadFile);


router
    .route('/batawy2/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const data = await batawy2.findByPk(id);
        res.json(data);
    });

module.exports = router;
