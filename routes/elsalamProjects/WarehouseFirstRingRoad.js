const express = require('express')
const router = express.Router()
const { elsalam } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs')
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/elsalam/dues/warehousefrr/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    .route('/elsalam/dues/warehousefrr/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await elsalam.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
    await elsalam.findAll({
        where: {
            project: {
                [Op.or]: [
                    "الطريق الدائري الاول - المستودعات" , "الطريق الدائري الأول - المستودعات" , "الطريق الدائري - المستودعات"
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
            let elsalam = {
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
            alameias.push(elsalam);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('elsalam'); //creating worksheet
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
    .route('/elsalam/warehousefrr/api/file')
    .get(downloadFile);
module.exports = router
