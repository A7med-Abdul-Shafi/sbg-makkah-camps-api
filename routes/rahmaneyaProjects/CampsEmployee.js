const express = require('express')
const router = express.Router()
const { rahmaneya } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs');
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/rahmaneya/dues/campsemployee/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    .route('/rahmaneya/dues/campsemployee/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await rahmaneya.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
    await rahmaneya.findAll({
        where: {
            project: {
                [Op.or]: [
                    "موظفين المجمعات السكنية" , "موظفي المجمعات السكنية"
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
            let rahmaneya = {
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
            alameias.push(rahmaneya);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('rahmaneya'); //creating worksheet
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
    .route('/rahmaneya/campsemployee/api/file')
    .get(downloadFile);
module.exports = router
//////////////////////////////////end of calculate settlement daily
