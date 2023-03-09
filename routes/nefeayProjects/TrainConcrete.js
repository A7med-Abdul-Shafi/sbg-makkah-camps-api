const express = require('express')
const router = express.Router()
const { nefeay } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs')
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/nefeay/dues/trainconcrete/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    .route('/nefeay/dues/trainconcrete/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await nefeay.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
    await nefeay.findAll({
        where: {
            project: {
                [Op.or]: [
                    "محطة القطار المركزية - الخرسانة" , "محطة القطار المركزية-الخرسانة"
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
            let nefeay = {
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
            alameias.push(nefeay);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('nefeay'); //creating worksheet
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
    .route('/nefeay/trainconcrete/api/file')
    .get(downloadFile);
module.exports = router
