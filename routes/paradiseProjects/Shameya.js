const express = require('express')
const router = express.Router()
const { paradise } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs')
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/paradise/dues/shameya/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
//////////////////////////// calculate settlement daily
router
    .route('/paradise/dues/shameya/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
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
    .route('/paradise/dues/shameya/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/paradise/dues/shameya/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await paradise.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
    function getDays(year, month) { 
        return new Date(year, month, 0).getDate(); 
    }
const downloadFile = async (req, res) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().substring(0, 10);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().substring(0, 10);
    const month = (new Date()).getMonth();
    const currentYear = date.getFullYear();
    const monthDays = getDays(currentYear, month + 1);
    await paradise.findAll({
        where: {
            project: {
                [Op.or]: [
                    "مشروع توسعة الحرم المكي (الشامية)" , "مشروع توسعة الحرم المكي (الشاميه)" , "مشروع توسعة الحرم المكي - الشامية"
                ]
            },
            out_date: {
                [Op.or]: {
                    [Op.gte]: firstDay,
                    [Op.is]: null
                },
            }
        }
    }).then(async objects => {
        var alameias = [];
        let length = objects.length;
        for (let i = 0; i < length; i++) {
            let datavalues = objects[i].dataValues;
            let paradise = {
                emp_no: datavalues.emp_no,
                class: datavalues.class,
                name: datavalues.name,
                profession: datavalues.profession,
                nationality: datavalues.nationality,
                iqama_no: datavalues.iqama_no,
                passport_no: datavalues.passport_no,
                in_date: datavalues.in_date <= firstDay ? firstDay : datavalues.in_date,
                out_date: datavalues.out_date >= lastDay || datavalues.out_date == null ? lastDay : datavalues.out_date,
                amount: datavalues.in_date <= firstDay && datavalues.out_date >= lastDay && monthDays === 28
                    ? 28
                    :datavalues.in_date <= firstDay && datavalues.out_date >= lastDay && monthDays === 30
                    ? 30
                    :datavalues.in_date <= firstDay && datavalues.out_date >= lastDay && monthDays === 31
                    ? 31
                    : datavalues.in_date <= firstDay && datavalues.out_date == null
                    ? monthDays

                    : datavalues.in_date <= firstDay && datavalues.out_date < lastDay
                        ? new Date(datavalues.out_date).getDate()

                        : datavalues.in_date > firstDay && datavalues.out_date >= lastDay 
                        ? Math.ceil(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()/(1000 * 3600 * 24)  - new Date(datavalues.in_date)/(1000 * 3600 * 24))
                        : datavalues.in_date > firstDay && datavalues.out_date == null
                        ? Math.ceil(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime()/(1000 * 3600 * 24)  - new Date(datavalues.in_date)/(1000 * 3600 * 24))
                        
                        : new Date(datavalues.out_date) / (1000 * 3600 * 24) - new Date(datavalues.in_date) / (1000 * 3600 * 24) + 1,
                coupon: datavalues.coupon,
                mobile: datavalues.mobile,
            };
            alameias.push(paradise);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('paradise'); //creating worksheet
        worksheet.columns = [
            { header: 'الرقم الوظيفي', key: 'emp_no', width: 12 },
            { header: 'الفئة', key: 'class', width: 12 },
            { header: 'الإسم', key: 'name', width: 22 },
            { header: 'المهنة', key: 'profession', width: 15 },
            { header: 'الجنسية', key: 'nationality', width: 10 },
            { header: 'رقم الإقامة', key: 'iqama_no', width: 15 },
            { header: 'رقم الجواز', key: 'passport_no', width: 12 },
            { header: 'تاريخ التسكين', key: 'in_date', width: 15 },
            { header: 'تاريخ الخروج', key: 'out_date', width: 12 },
            { header: 'عدد الأيام', key: 'amount', width: 12 },
            { header: 'بون الطعام', key: 'coupon', width: 10 },
            { header: 'جوال', key: 'mobile', width: 10 },
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
    .route('/paradise/shameya/api/file')
    .get(downloadFile);
module.exports = router
