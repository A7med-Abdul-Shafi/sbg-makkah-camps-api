const express = require('express')
const router = express.Router()
const { matrafy } = require('../../models')
const { Op } = require('sequelize')
const excel = require('exceljs')
////////////////////////////////////////////// حساب المستخلص يومي
const date = new Date();
router
    .route('/matrafy/dues/servicebuildingssec16/food/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
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
    .route('/matrafy/dues/servicebuildingssec16/food/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
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
    .route('/matrafy/dues/servicebuildingssec16/food/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
                coupon: {
                    [Op.like]: "نعم"
                }
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/food/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
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
    .route('/matrafy/dues/servicebuildingssec16/dayone')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
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
    .route('/matrafy/dues/servicebuildingssec16/dayone1')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
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
    .route('/matrafy/dues/servicebuildingssec16/indaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/cleardaytwo')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday3')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday4')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 4);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday5')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 5);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday6')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 6);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday7')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 7);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday8')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 8);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday9')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 9);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday10')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 10);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday11')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 11);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday12')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 12);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday13')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 13);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday14')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 14);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday15')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 15);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday16')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 16);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday17')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 17);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday18')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 18);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday19')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 19);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday20')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 20);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday21')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 21);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday22')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 22);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday23')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 23);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday24')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 24);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday25')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 25);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday26')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 26);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday27')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 27);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday28')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 28);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday29')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 29);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday30')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 30);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                out_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/inday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
                    ]
                },
                in_date: {
                    [Op.eq]: firstDay
                },
            },
        });
        res.send(countEgypt);
    });
router
    .route('/matrafy/dues/servicebuildingssec16/clearday31')
    .get(async (req, res) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 31);
        const countEgypt = await matrafy.findAll({
            where: {
                project: {
                    [Op.or]: [
                        "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
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
    await matrafy.findAll({
        where: {
            project: {
                [Op.or]: [
                    "مباني الخدمات_القطاع16" , "مباني الخدمات - القطاع 16 " , "مباني الخدمات_القطاع 16"
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
            let matrafy = {
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
            alameias.push(matrafy);
        }
        console.log(alameias);
        const jsonAlameias = JSON.parse(JSON.stringify(alameias));
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('matrafy'); //creating worksheet
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
    .route('/matrafy/servicebuildingssec16/api/file')
    .get(downloadFile);
module.exports = router
