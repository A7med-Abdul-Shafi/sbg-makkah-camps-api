const express = require('express')
const router = express.Router()
const { waqf } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs');
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/waqf/dues/enma/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await waqf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    .route('/waqf/dues/enma/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await waqf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
    await waqf.findAll({
        where: {
            project: {
                [Op.or]: [
                    "شركة انماء المرافق والمقاولات", "شركة إنماء المرافق والمقاولات", "شركة انماء المرافق للمقاولات", "شركة إنماء المرافق للمقاولات"
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
            let waqf = {
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
            alameias.push(waqf);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('waqf'); //creating worksheet
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
    .route('/waqf/enma/api/file')
    .get(downloadFile);
module.exports = router
