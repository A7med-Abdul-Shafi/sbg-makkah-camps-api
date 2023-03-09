const express = require('express')
const router = express.Router()
const { saqaf } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs');
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/saqaf/dues/abrajkudai/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {    
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await saqaf.findAll({
            where: {
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await saqaf.findAll({
            where: { 
                project: { 
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    .route('/saqaf/dues/abrajkudai/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().substring(0, 10);
        const countEgypt = await saqaf.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"
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
    await saqaf.findAll({
        where: {
            project: {
                [Op.or]: ["أبراج كدي", "ابراج كدي", "ابراج كدى", "أبراج كدى"]
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
            let saqaf = {
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
            alameias.push(saqaf);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('saqaf'); //creating worksheet
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
    .route('/saqaf/abrajkudai/api/file')
    .get(downloadFile);
module.exports = router
//////////////////////////////////end of calculate settlement daily
