const express = require('express')
const router = express.Router()
const { morgan2bathaa } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs');
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/morgan2bathaa/dues/alameiaconsums/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    .route('/morgan2bathaa/dues/alameiaconsums/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await morgan2bathaa.findAll({
            where: {
                project: {
                    [Op.or]: [
                        'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
    await morgan2bathaa.findAll({
        where: {
            project: {
                [Op.or]: [
                    'الشركة العالمية للمواد الاستهلاكية', 'الشركة العالمية للمواد الإستهلاكية', 'الشركة العالميه للمواد الاستهلاكيه', 'الشركه العالميه للمواد الإستهلاكيه'
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
            let morgan2bathaa = {
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
            alameias.push(morgan2bathaa);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('morgan2bathaa'); //creating worksheet
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
    .route('/morgan2bathaa/alameiaconsums/api/file')
    .get(downloadFile);
module.exports = router
//////////////////////////////////end of calculate settlement daily
