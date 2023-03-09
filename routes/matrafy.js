const express = require("express");
const router = express.Router();
const { matrafy, matrafyrooms } = require('../models');
const upload = require('../middlewares/multer.config');
const excelMatrafy = require('../controllers/excelMatrafy.js');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const date = new Date()
router
    .route('/matrafy')
    .get(async (req, res) => {
        const alameiaData = await matrafy.findAll()
        res.send(alameiaData)
    });
    ///////////////////////////// matrafy Rooms List
router
.route('/matrafyrooms/list')    
.get(async (req,res)=> {
    const alameiaRoomsList = await matrafyrooms.findAll({
        where: {
            capacity: {
                [Op.gt]: 0,
            }
        },
        attributes: ['room','capacity']
    })
    res.send(alameiaRoomsList)
})
///////////////////////////// matrafy Rooms List
///////////////////////////////////////////////////// الفراغات
router
    .route('/matrafy/vacant') 
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({ 
            attributes: ['id','room_no','nationality', [Sequelize.fn('count', Sequelize.col('room_no')), 'count']],  
            group: ['matrafy.room_no'],  
            raw: true,
            order: Sequelize.literal('count DESC')
        })        
        res.send(countAlameia);                     
    });       
router   
    .route('/matrafy/filter') 
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            attributes: ['id','room_no'],
        })        
        res.send(countAlameia);                     
    });       
/////////////////////////////////////////////////////// الفراغات
    ///////////////////////////////////// Delete all whwer out_date < firstDay
router.delete('/matrafy/delete', async (req, res) => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const result = await matrafy.destroy({
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
    .route('/matrafy/projects')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            attributes: ['project'],
            group: ['matrafy.project'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
//////////////////////////////////////////// Projects - settelement - Filter
router
    .route('/matrafy/in_reason')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            attributes: ['in_reason'],
            group: ['matrafy.in_reason'],
        })
        res.send(countAlameia);
    });
//////////////////////////////////////////// Projects - settelement - Filter
///////////////////////////////////////////search 
router
    .route("/matrafy/search")
    .get(async (req, res) => {
        const { q } = req.query;
        if (q.includes('/') || q.includes('-') || typeof +q === 'string') {
            console.log(typeof q)
            const data = await matrafy.findAll({
                where: {
                    room_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (isNaN(parseFloat(q))) {
            const data = await matrafy.findAll({
                where: {
                    name: {
                        [Op.startsWith]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length < 8 && typeof parseInt(q) === 'number') {
            const data = await matrafy.findAll({
                where: {
                    emp_no: {
                        [Op.like]: q
                    }
                }
            });
            res.json(data);
        } else if (q.length === 10) {
            const data = await matrafy.findAll({
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
    .route('/matrafy/update/:id')
    .put(async (req, res) => {
        const { id } = req.params;
        const record = req.body;
        console.log(record)
        await matrafy.findByPk(id,
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
///////////////////////////////// edit labor
///////////////////////////////////////// عدد العمال في القاعدة
router
    .route('/matrafy/count')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.or]: {
                        [Op.gte]: new Date(),
                        [Op.is]: null
                    }
                },

            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['matrafy.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
///////////////////////////////////////// عدد العمال في القاعدة
//////////////////////////////////////// عدد الإخلاءات
router
    .route('/matrafy/count/clear')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.not]: null
                },
            },
            attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
            group: ['matrafy.id'],
            raw: true,
            order: Sequelize.literal('count DESC')
        })
        res.send(countAlameia);
    });
//////////////////////////////////////// عدد الإخلاءات
////////////////////////////////////////// Edit
router
    .route("/matrafy/search/edit")
    .get(async (req, res) => {
        const { q } = req.query;
        const data = await matrafy.findAll({
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
    .route('/matrafy/project/egypts')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamans')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistans')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indias')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshs')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesias')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipins')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }],
                [Op.and]: [{ project: "مباني الخدمات" }]
            }
        })
        res.send(countAlameia);
    });
//المطاف
router
    .route('/matrafy/project/egyptm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiam')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiam')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة صحن المطاف " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptsh')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamansh')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistansh')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiash')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshsh')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiash')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مشروع توسعة الحرم المكي (الشامية) " }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinsh')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptsa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamansa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistansa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiasa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshsa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiasa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "توسعة المسجد الحرام - الساحات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinsa')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptce')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamance')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistance')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiace')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshce')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiace')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المحطة المركزية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipince')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptinf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamaninf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistaninf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiainf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshinf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiainf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "التوسعة - إدارة البنية التحتية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipininf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptsaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamansaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistansaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiasaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshsaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiasaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة السلامة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinsaf')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptwarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanwarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanwarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiawarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshwarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiawarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "المطاف - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinwarm')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egypthou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanhou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanhou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiahou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshhou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiahou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "موظفين المجمعات السكنية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinhou')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptmas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanmas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanmas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiamas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshmas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiamas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مؤسسة مسار المتقدمة للنقل المحدودة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinmas')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiaib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiaib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "عيسى بن لادن (ابليك)" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinib')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egypt16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yaman16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistan16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/india16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladesh16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesia16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "مباني الخدمات_القطاع 16" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipin16')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiaco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiaco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "محطة القطار - الخرسانة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinco')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptmar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanmar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanmar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiamar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshmar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiamar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "جسر المروة" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinmar')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptshw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanshw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanshw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiashw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshshw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiashw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الشامية - المستودعات" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinshw')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egypthr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanhr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanhr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiahr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshhr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiahr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "إدارة خدمات الموارد البشرية" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinhr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/project/egyptrr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/yamanrr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/pakistanrr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indiarr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/bangladeshrr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/indonesiarr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
            where: {
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }],
                [Op.and]: [{ project: "الطريق الدائري الأول" }]
            }
        })
        res.send(countAlameia);
    });
router
    .route('/matrafy/project/philipinrr')
    .get(async (req, res) => {
        const countAlameia = await matrafy.findAll({
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
    .route('/matrafy/dues/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
            where: {
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
            where: {
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    router
    .route('/matrafy/dues/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/clear/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/clear2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/clear3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/masar/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/masar2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/masar3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/mataf3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/shameya3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik2/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/egypt')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/yaman')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countYaman = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/pakistan')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPakistan = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/india')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndia = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/bangladesh')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countBangladesh = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/indonesia')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countIndonesia = await matrafy.findAll({
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
    .route('/matrafy/dues/iblik3/philipin')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countPhilipin = await matrafy.findAll({
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
    .route('/matrafy/egypt')
    .get(async (req, res) => {
        const countEgypt = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "مصر" }, { nationality: "مصري" }, { nationality: "مصرى" }]
            }
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/yaman')
    .get(async (req, res) => {
        const countYaman = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "يمني" }, { nationality: "يمنى" }, { nationality: "اليمن" }]
            }
        });
        res.send(countYaman);
    });
router
    .route('/matrafy/pakistan')
    .get(async (req, res) => {
        const countPakistan = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "باكستاني" }, { nationality: "باكستانى" }, { nationality: "باكستان" }]
            }
        });
        res.send(countPakistan);
    });
router
    .route('/matrafy/india')
    .get(async (req, res) => {
        const countIndia = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "هندي" }, { nationality: "هندى" }, { nationality: "الهند" }]
            }
        });
        res.send(countIndia);
    });
router
    .route('/matrafy/bangladesh')
    .get(async (req, res) => {
        const countBangladesh = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "بنجلاديش" }, { nationality: "بنجلاديشي" }, { nationality: "بنجلاديشى" }]
            }
        });
        res.send(countBangladesh);
    });
router
    .route('/matrafy/indonesia')
    .get(async (req, res) => {
        const countIndonesia = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "إندونيسي" }, { nationality: "اندونيسي" }, { nationality: "اندونيسى" }, { nationality: "إندونيسى" }, { nationality: "اندونيسيا" }, { nationality: "إندونيسيا" }, { nationality: "اندونسيا" }, { nationality: "إندونسيا" }]
            }
        });
        res.send(countIndonesia);
    });
router
    .route('/matrafy/philipin')
    .get(async (req, res) => {
        const countPhilipin = await matrafy.findAll({
            where: {
                // [Op.and]: [{ out_data: "null" }, { out_data: 6 }],
                [Op.or]: [{ nationality: "الفلبين" }, { nationality: "فلبيني" }, { nationality: "فلبينى" }]
            }
        });
        res.send(countPhilipin);
    });

// حصر العمال حسب الجنسيات

router
    .route('/matrafy/uploadfile')
    .post(upload.single("file"), excelMatrafy.uploadFile);
router
    .route('/matrafy')
    .post(async (req, res) => {
        const alameiaData = { emp_no: req.body.emp_no, name: req.body.name, project: req.body.project, nationality: req.body.nationality, room_no: req.body.room_no, coupon: req.body.coupon, in_date: req.body.in_date, iqama_no: req.body.iqama_no, in_reason: req.body.in_reason, emp_photo: req.body.emp_photo, iqama_photo: req.body.iqama_photo };
        console.log(alameiaData)
        await matrafy.create(alameiaData);
        res.json(alameiaData);
    });

router
    .route('/matrafy/api/file')
    .get(excelMatrafy.downloadFile);


router
    .route('/matrafy/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const data = await matrafy.findByPk(id);
        res.json(data);
    });

module.exports = router;
