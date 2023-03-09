const express = require("express");
const router = express.Router();
const { ewab, ewaabrooms } = require('../models');
const upload = require('../middlewares/multer.config');
const excelEwaab = require('../controllers/excelEwaab.js');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const date = new Date()
router
    .route('/ewaab')
    .get(async (req, res) => {
        const alameiaData = await ewab.findAll()
        res.send(alameiaData)
    });
    ///////////////////////////// ewaab Rooms List
router
.route('/ewaabrooms/list')    
.get(async (req,res)=> {
    const alameiaRoomsList = await ewaabrooms.findAll({
        where: {
            capacity: {
                [Op.gt]: 0,
            }
        },
        attributes: ['room','capacity']
    })
    res.send(alameiaRoomsList)
})
///////////////////////////// ewaab Rooms List
///////////////////////////////////////////////////// الفراغات
router
    .route('/ewaab/vacant') 
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({ 
            attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['ewab.room_no'],  
            raw: true,
            order: Sequelize.literal('count DESC')
        })        
        res.send(countAlameia);                     
    });       
router   
    .route('/ewaab/filter') 
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            attributes: ['id','room_no'],
        })        
        res.send(countAlameia);                     
    });       
/////////////////////////////////////////////////////// الفراغات
    ///////////////////////////////////// Delete all whwer out_date < firstDay
router.delete('/ewaab/delete', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const result = await ewab.destroy({
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
    .route('/ewaab/projects')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            attributes: ['project'],
            group: ['ewab.project'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
//////////////////////////////////////////// Projects - settelement - Filter
router
    .route('/ewaab/in_reason')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            attributes: ['in_reason'],
            group: ['ewab.in_reason'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
///////////////////////////////////////////search 
router
    .route("/ewab/search")
    .get(async (req, res) => {
        const { q } = req.query;
        if (q.includes('/') || q.includes('-') || typeof +q === 'string') {
            console.log(typeof q)
            const data = await ewab.findAll({
                where: {
                    room_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (isNaN(parseFloat(q))) {
            const data = await ewab.findAll({
                where: {
                    name: {
                        [Op.startsWith]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length < 8 && typeof parseInt(q) === 'number') {
            const data = await ewab.findAll({
                where: {
                    emp_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length === 10) {
            const data = await ewab.findAll({
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
    .route('/ewaab/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await ewab.findByPk(id,
            {
                where:
                {
                    id: id
                }
            })
            .then(function (ewaab) {
                // Check if record exists in db
                if (ewaab) {
                    ewaab.update(record)
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
    .route('/ewaab/count')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                out_date: {
                    [Op.or]: {
                        [Op.gte]: new Date(),
                        [Op.is]: null
                    }
                },

            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['ewab.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
///////////////////////////////////////// عدد العمال في القاعدة
//////////////////////////////////////// عدد الإخلاءات
router
    .route('/ewaab/count/clear')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                out_date: {
                    [Op.not]: null
                },
            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['ewab.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
//////////////////////////////////////// عدد الإخلاءات
////////////////////////////////////////// Edit
router
    .route("/ewaab/search/edit")
    .get(async (req, res) => {
        const { q } = req.query;
        const data = await ewab.findAll({
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
    .route('/ewaab/project/egypts')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamans')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistans')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indias')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshs')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesias')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipins')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
//المطاف
router
    .route('/ewaab/project/egyptm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiam')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiam')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptsh')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamansh')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistansh')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiash')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshsh')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiash')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinsh')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptsa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamansa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistansa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiasa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshsa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiasa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinsa')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptce')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamance')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistance')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiace')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshce')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiace')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipince')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptinf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamaninf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistaninf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiainf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshinf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiainf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipininf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptsaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamansaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistansaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiasaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshsaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiasaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinsaf')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptwarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanwarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanwarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiawarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshwarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiawarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinwarm')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egypthou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanhou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanhou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiahou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshhou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiahou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinhou')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptmas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanmas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanmas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiamas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshmas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiamas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinmas')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiaib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiaib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinib')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egypt16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yaman16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistan16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/india16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladesh16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesia16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipin16')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiaco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiaco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinco')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptmar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanmar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanmar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiamar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshmar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiamar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinmar')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptshw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanshw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanshw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiashw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshshw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiashw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinshw')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egypthr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanhr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanhr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiahr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshhr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiahr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinhr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/project/egyptrr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/yamanrr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/pakistanrr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indiarr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/bangladeshrr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/indonesiarr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/ewaab/project/philipinrr')
    .get(async (req, res) => {
        const countAlameia = await ewab.findAll({
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
    .route('/ewaab/dues/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await ewab.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/dues/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewab.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/ewaab/dues/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/clear/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/clear/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/clear/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/clear/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/clear/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/clear/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/clear/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/clear2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/clear3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/masar2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/masar3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/mataf2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/mataf3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/shameya2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/shameya3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/iblik2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await ewab.findAll({
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
    .route('/ewaab/dues/iblik3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await ewab.findAll({
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
    .route('/ewaab/egypt')
    .get(async (req, res) => {
        const countEgypt = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }]
            }
        });
        res.send(countEgypt);
    });
router
    .route('/ewaab/yaman')
    .get(async (req, res) => {
        const countYaman = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }]
            }
        });
        res.send(countYaman);
    });
router
    .route('/ewaab/pakistan')
    .get(async (req, res) => {
        const countPakistan = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }]
            }
        });
        res.send(countPakistan);
    });
router
    .route('/ewaab/india')
    .get(async (req, res) => {
        const countIndia = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }]
            }
        });
        res.send(countIndia);
    });
router
    .route('/ewaab/bangladesh')
    .get(async (req, res) => {
        const countBangladesh = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }]
            }
        });
        res.send(countBangladesh);
    });
router
    .route('/ewaab/indonesia')
    .get(async (req, res) => {
        const countIndonesia = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }]
            }
        });
        res.send(countIndonesia);
    });
router
    .route('/ewaab/philipin')
    .get(async (req, res) => {
        const countPhilipin = await ewab.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }]
            }
        });
        res.send(countPhilipin);
    });

// حصر العمال حسب الجنسيات

router
    .route('/ewaab/uploadfile')
    .post(upload.single("file"), excelEwaab.uploadFile);
router
    .route('/ewaab')
    .post(async (req, res) => {
        const alameiaData = { emp_no: req.body.emp_no, name: req.body.name, project: req.body.project, nationality: req.body.nationality, room_no: req.body.room_no, coupon: req.body.coupon, in_date: req.body.in_date, iqama_no: req.body.iqama_no, in_reason: req.body.in_reason, emp_photo: req.body.emp_photo, iqama_photo: req.body.iqama_photo };
        console.log(alameiaData)
        await ewab.create(alameiaData);
        res.json(alameiaData);
    });

router
    .route('/ewaab/api/file')
    .get(excelEwaab.downloadFile);


router
    .route('/ewaab/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const data = await ewab.findByPk(id);
        res.json(data);
    });

module.exports = router;
