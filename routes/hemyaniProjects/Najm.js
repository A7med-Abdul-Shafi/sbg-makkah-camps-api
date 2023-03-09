const express = require('express')
const router = express.Router()
const { hemyani } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs');
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/hemyani/dues/najm/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"
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
    .route('/hemyani/dues/najm/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    .route('/hemyani/dues/najm/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await hemyani.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
    await hemyani.findAll({
        where: {
            project: {
                [Op.or]: [
                    "شركة نجم الانجاز" , "شركة نجم الإنجاز" , "شركة نجم - الأنجاز" , "شركة نجم - الانجاز"    
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
            let hemyani = {
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
            alameias.push(hemyani);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('hemyani'); //creating worksheet
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
    .route('/hemyani/najm/api/file')
    .get(downloadFile);
module.exports = router
