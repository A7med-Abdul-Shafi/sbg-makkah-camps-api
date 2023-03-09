const express = require('express')
const router = express.Router()
const { morgan1naseem } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs')
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/morgan1naseem/dues/warehouseshameya/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    .route('/morgan1naseem/dues/warehouseshameya/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan1naseem.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الشامية - المستودعات" , "مستودعات الشامية"
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
    await morgan1naseem.findAll({
        where: {
            project: {
                [Op.or]: [
                    "الشامية - المستودعات" , "مستودعات الشامية"
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
            let morgan1naseem = {
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
            alameias.push(morgan1naseem);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('morgan1naseem'); //creating worksheet
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
    .route('/morgan1naseem/warehouseshameya/api/file')
    .get(downloadFile);
module.exports = router
