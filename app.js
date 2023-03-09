const express = require('express');
const cors = require("cors");
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');
const corsOptions = require('./config/corsOptions') 

const port = process.env.PORT || 3001;
const Role = db.role;
app.use(bodyParser.json());
app.use(express.static('resources'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

// routers   
const customerRouter = require('./routes/customer');
app.use('/', customerRouter);

const registerRouter = require('./routes/register');
app.use('/', registerRouter);

const alameiaRouter = require('./routes/alameia');
app.use('/', alameiaRouter);

const haramainRouter = require('./routes/haramain');
app.use('/', haramainRouter);

const ewaaaRouter = require('./routes/ewaaa');
app.use('/', ewaaaRouter);

const ewaabRouter = require('./routes/ewaab');
app.use('/', ewaabRouter);

const usersRouter = require('./routes/users');
app.use('/', usersRouter);

app.use('/auth', require('./routes/authRoutes'));

/////////////////////////////////// Buildings
const sawady2Router = require('./routes/sawady2');
app.use('/', sawady2Router);
const batawy1Router = require('./routes/batawy1');
app.use('/', batawy1Router);
const safaMashaerRouter = require('./routes/safamashaer');
app.use('/', safaMashaerRouter);
const matrafyRouter = require('./routes/matrafy');
app.use('/', matrafyRouter);
const saqafRouter = require('./routes/saqaf');
app.use('/', saqafRouter);
const fedaRouter = require('./routes/feda');
app.use('/', fedaRouter);
const sawady1Router = require('./routes/sawady1');
app.use('/', sawady1Router);
const rahmaneyaRouter = require('./routes/rahmaneya');
app.use('/', rahmaneyaRouter);
const elsalamRouter = require('./routes/elsalam');
app.use('/', elsalamRouter);
const elfatehRouter = require('./routes/elfateh');
app.use('/', elfatehRouter);
const paradiseRouter = require('./routes/paradise');
app.use('/', paradiseRouter);
const batawy2Router = require('./routes/batawy2');
app.use('/', batawy2Router);
const hemyaniRouter = require('./routes/hemyani');
app.use('/', hemyaniRouter);
const nefeayRouter = require('./routes/nefeay');
app.use('/', nefeayRouter);
const morgan1NaseemRouter = require('./routes/morgan1naseem');
app.use('/', morgan1NaseemRouter);
const morgan2BathaaRouter = require('./routes/morgan2bathaa');
app.use('/', morgan2BathaaRouter);
const waqfRouter = require('./routes/waqf');
app.use('/', waqfRouter);
/////////////////////////////////// Buildings
///////////////////////////////////////////////////////////// Projects
//////////////////////////////////////////// Alameia
const abrajkudai = require('./routes/alameiaProjects/AbrajKudai')
app.use('/', abrajkudai)
const alameiaAhla = require('./routes/alameiaProjects/AlameiaAhla')
app.use('/', alameiaAhla)
const alameiaConsums = require('./routes/alameiaProjects/alameiaconsums')
app.use('/', alameiaConsums)
const alameiaMaintainence = require('./routes/alameiaProjects/alameiamaintainence')
app.use('/', alameiaMaintainence)
const campsEmployee = require('./routes/alameiaProjects/CampsEmployee')
app.use('/', campsEmployee)
const centralStation = require('./routes/alameiaProjects/centralStation')
app.use('/', centralStation)
const enma = require('./routes/alameiaProjects/Enma')
app.use('/', enma)
const eamarMaterial = require('./routes/alameiaProjects/EamarMaterial')
app.use('/', eamarMaterial)
const firstRingRoad = require('./routes/alameiaProjects/FirstRingRoad')
app.use('/', firstRingRoad)
const hrServices = require('./routes/alameiaProjects/Hrservices')
app.use('/', hrServices)
const iblik = require('./routes/alameiaProjects/Iblik')
app.use('/', iblik)
const infraStracture = require('./routes/alameiaProjects/InfraStractureHaram')
app.use('/', infraStracture)
const marwa = require('./routes/alameiaProjects/Marwa')
app.use('/', marwa)
const masar = require('./routes/alameiaProjects/Masar')
app.use('/', masar)
const mataf = require('./routes/alameiaProjects/Mataf')
app.use('/', mataf)
const najm = require('./routes/alameiaProjects/Najm')
app.use('/', najm)
const sahat = require('./routes/alameiaProjects/Sahat')
app.use('/', sahat)
const salama = require('./routes/alameiaProjects/Salama')
app.use('/', salama)
const securityBuildings = require('./routes/alameiaProjects/SecurityBuildings')
app.use('/', securityBuildings)
const serviceBuildings = require('./routes/alameiaProjects/ServiceBuildings')
app.use('/', serviceBuildings)
const serviceBuildingsSec16 = require('./routes/alameiaProjects/ServiceBuildingsSec16')
app.use('/', serviceBuildingsSec16)
const shameya = require('./routes/alameiaProjects/Shameya')
app.use('/', shameya)
const trainConcrete = require('./routes/alameiaProjects/TrainConcrete')
app.use('/', trainConcrete)
const warehouseFrr = require('./routes/alameiaProjects/WarehouseFirstRingRoad')
app.use('/', warehouseFrr)
const warehouseMataf = require('./routes/alameiaProjects/WarehouseMataf')
app.use('/', warehouseMataf)
const warehouseShameya = require('./routes/alameiaProjects/WarehouseShameya')
app.use('/', warehouseShameya)
const zakzoki = require('./routes/alameiaProjects/ZakzokiFireFighting')
app.use('/', zakzoki)
const metalsaudidecoration = require('./routes/alameiaProjects/MetalSaudiDecoration')
app.use('/', metalsaudidecoration)
const invoiceReport = require('./routes/alameiaProjects/InvoiceReport')
app.use('/', invoiceReport)

//////////////////////////////////////////// Alameia
//////////////////////////////////////////// Ewaaa
const abrajkudai1 = require('./routes/ewaaaProjects/AbrajKudai')
app.use('/', abrajkudai1)
const alameiaAhla1 = require('./routes/ewaaaProjects/AlameiaAhla')
app.use('/', alameiaAhla1)
const alameiaConsums1 = require('./routes/ewaaaProjects/alameiaconsums')
app.use('/', alameiaConsums1)
const alameiaMaintainence1 = require('./routes/ewaaaProjects/alameiamaintainence')
app.use('/', alameiaMaintainence1)
const campsEmployee1 = require('./routes/ewaaaProjects/CampsEmployee')
app.use('/', campsEmployee1)
const centralStation1 = require('./routes/ewaaaProjects/centralStation')
app.use('/', centralStation1)
const enma1 = require('./routes/ewaaaProjects/Enma')
app.use('/', enma1)
const eamarMaterial1 = require('./routes/ewaaaProjects/EamarMaterial')
app.use('/', eamarMaterial1)
const firstRingRoad1 = require('./routes/ewaaaProjects/FirstRingRoad')
app.use('/', firstRingRoad1)
const hrServices1 = require('./routes/ewaaaProjects/Hrservices')
app.use('/', hrServices1)
const iblik1 = require('./routes/ewaaaProjects/Iblik')
app.use('/', iblik1)
const infraStracture1 = require('./routes/ewaaaProjects/InfraStractureHaram')
app.use('/', infraStracture1)
const marwa1 = require('./routes/ewaaaProjects/Marwa')
app.use('/', marwa1)
const masar1 = require('./routes/ewaaaProjects/Masar')
app.use('/', masar1)
const mataf1 = require('./routes/ewaaaProjects/Mataf')
app.use('/', mataf1)
const najm1 = require('./routes/ewaaaProjects/Najm')
app.use('/', najm1)
const sahat1 = require('./routes/ewaaaProjects/Sahat')
app.use('/', sahat1)
const salama1 = require('./routes/ewaaaProjects/Salama')
app.use('/', salama1)
const securityBuildings1 = require('./routes/ewaaaProjects/SecurityBuildings')
app.use('/', securityBuildings1)
const serviceBuildings1 = require('./routes/ewaaaProjects/ServiceBuildings')
app.use('/', serviceBuildings1)
const serviceBuildingsSec161 = require('./routes/ewaaaProjects/ServiceBuildingsSec16')
app.use('/', serviceBuildingsSec161)
const shameya1 = require('./routes/ewaaaProjects/Shameya')
app.use('/', shameya1)
const trainConcrete1 = require('./routes/ewaaaProjects/TrainConcrete')
app.use('/', trainConcrete1)
const warehouseFrr1 = require('./routes/ewaaaProjects/WarehouseFirstRingRoad')
app.use('/', warehouseFrr1)
const warehouseMataf1 = require('./routes/ewaaaProjects/WarehouseMataf')
app.use('/', warehouseMataf1)
const warehouseShameya1 = require('./routes/ewaaaProjects/WarehouseShameya')
app.use('/', warehouseShameya1)
const zakzoki1 = require('./routes/ewaaaProjects/ZakzokiFireFighting')
app.use('/', zakzoki1)
const metalsaudidecoration1 = require('./routes/ewaaaProjects/MetalSaudiDecoration')
app.use('/', metalsaudidecoration1)
const invoiceReport1 = require('./routes/ewaaaProjects/InvoiceReport')
app.use('/', invoiceReport1)
//////////////////////////////////////////// Ewaaa
//////////////////////////////////////////// Ewaab
const abrajkudai2 = require('./routes/ewaabProjects/AbrajKudai')
app.use('/', abrajkudai2)
const alameiaAhla2 = require('./routes/ewaabProjects/AlameiaAhla')
app.use('/', alameiaAhla2)
const alameiaConsums2 = require('./routes/ewaabProjects/alameiaconsums')
app.use('/', alameiaConsums2)
const alameiaMaintainence2 = require('./routes/ewaabProjects/alameiamaintainence')
app.use('/', alameiaMaintainence2)
const campsEmployee2 = require('./routes/ewaabProjects/CampsEmployee')
app.use('/', campsEmployee2)
const centralStation2 = require('./routes/ewaabProjects/centralStation')
app.use('/', centralStation2)
const enma2 = require('./routes/ewaabProjects/Enma')
app.use('/', enma2)
const eamarMaterial2 = require('./routes/ewaabProjects/EamarMaterial')
app.use('/', eamarMaterial2)
const firstRingRoad2 = require('./routes/ewaabProjects/FirstRingRoad')
app.use('/', firstRingRoad2)
const hrServices2 = require('./routes/ewaabProjects/Hrservices')
app.use('/', hrServices2)
const iblik2 = require('./routes/ewaabProjects/Iblik')
app.use('/', iblik2)
const infraStracture2 = require('./routes/ewaabProjects/InfraStractureHaram')
app.use('/', infraStracture2)
const marwa2 = require('./routes/ewaabProjects/Marwa')
app.use('/', marwa2)
const masar2 = require('./routes/ewaabProjects/Masar')
app.use('/', masar2)
const mataf2 = require('./routes/ewaabProjects/Mataf')
app.use('/', mataf2)
const najm2 = require('./routes/ewaabProjects/Najm')
app.use('/', najm2)
const sahat2 = require('./routes/ewaabProjects/Sahat')
app.use('/', sahat2)
const salama2 = require('./routes/ewaabProjects/Salama')
app.use('/', salama2)
const securityBuildings2 = require('./routes/ewaabProjects/SecurityBuildings')
app.use('/', securityBuildings2)
const serviceBuildings2 = require('./routes/ewaabProjects/ServiceBuildings')
app.use('/', serviceBuildings2)
const serviceBuildingsSec162 = require('./routes/ewaabProjects/ServiceBuildingsSec16')
app.use('/', serviceBuildingsSec162)
const shameya2 = require('./routes/ewaabProjects/Shameya')
app.use('/', shameya2)
const trainConcrete2 = require('./routes/ewaabProjects/TrainConcrete')
app.use('/', trainConcrete2)
const warehouseFrr2 = require('./routes/ewaabProjects/WarehouseFirstRingRoad')
app.use('/', warehouseFrr2)
const warehouseMataf2 = require('./routes/ewaabProjects/WarehouseMataf')
app.use('/', warehouseMataf2)
const warehouseShameya2 = require('./routes/ewaabProjects/WarehouseShameya')
app.use('/', warehouseShameya2)
const zakzoki2 = require('./routes/ewaabProjects/ZakzokiFireFighting')
app.use('/', zakzoki2)
const metalsaudidecoration2 = require('./routes/ewaabProjects/MetalSaudiDecoration')
app.use('/', metalsaudidecoration2)
const invoiceReport2 = require('./routes/ewaabProjects/InvoiceReport')
app.use('/', invoiceReport2)
//////////////////////////////////////////// Ewaab
//////////////////////////////////////////// Haramain
const abrajkudai3 = require('./routes/haramainProjects/AbrajKudai')
app.use('/', abrajkudai3)
const alameiaAhla3 = require('./routes/haramainProjects/AlameiaAhla')
app.use('/', alameiaAhla3)
const alameiaConsums3 = require('./routes/haramainProjects/alameiaconsums')
app.use('/', alameiaConsums3)
const alameiaMaintainence3 = require('./routes/haramainProjects/alameiamaintainence')
app.use('/', alameiaMaintainence3)
const campsEmployee3 = require('./routes/haramainProjects/CampsEmployee')
app.use('/', campsEmployee3)
const centralStation3 = require('./routes/haramainProjects/centralStation')
app.use('/', centralStation3)
const enma3 = require('./routes/haramainProjects/Enma')
app.use('/', enma3)
const eamarMaterial3 = require('./routes/haramainProjects/EamarMaterial')
app.use('/', eamarMaterial3)
const firstRingRoad3 = require('./routes/haramainProjects/FirstRingRoad')
app.use('/', firstRingRoad3)
const hrServices3 = require('./routes/haramainProjects/Hrservices')
app.use('/', hrServices3)
const iblik3 = require('./routes/haramainProjects/Iblik')
app.use('/', iblik3)
const infraStracture3 = require('./routes/haramainProjects/InfraStractureHaram')
app.use('/', infraStracture3)
const marwa3 = require('./routes/haramainProjects/Marwa')
app.use('/', marwa3)
const masar3 = require('./routes/haramainProjects/Masar')
app.use('/', masar3)
const mataf3 = require('./routes/haramainProjects/Mataf')
app.use('/', mataf3)
const najm3 = require('./routes/haramainProjects/Najm')
app.use('/', najm3)
const sahat3 = require('./routes/haramainProjects/Sahat')
app.use('/', sahat3)
const salama3 = require('./routes/haramainProjects/Salama')
app.use('/', salama3)
const securityBuildings3 = require('./routes/haramainProjects/SecurityBuildings')
app.use('/', securityBuildings3)
const serviceBuildings3 = require('./routes/haramainProjects/ServiceBuildings')
app.use('/', serviceBuildings3)
const serviceBuildingsSec163 = require('./routes/haramainProjects/ServiceBuildingsSec16')
app.use('/', serviceBuildingsSec163)
const shameya3 = require('./routes/haramainProjects/Shameya')
app.use('/', shameya3)
const trainConcrete3 = require('./routes/haramainProjects/TrainConcrete')
app.use('/', trainConcrete3)
const warehouseFrr3 = require('./routes/haramainProjects/WarehouseFirstRingRoad')
app.use('/', warehouseFrr3)
const warehouseMataf3 = require('./routes/haramainProjects/WarehouseMataf')
app.use('/', warehouseMataf3)
const warehouseShameya3 = require('./routes/haramainProjects/WarehouseShameya')
app.use('/', warehouseShameya3)
const zakzoki3 = require('./routes/haramainProjects/ZakzokiFireFighting')
app.use('/', zakzoki3)
const metalsaudidecoration3 = require('./routes/haramainProjects/MetalSaudiDecoration')
app.use('/', metalsaudidecoration3)
const invoiceReport3 = require('./routes/haramainProjects/InvoiceReport')
app.use('/', invoiceReport3)
//////////////////////////////////////////// Haramain  

///////////////////////////////////////////////////////////// Projects

////////////// Food    
const alameiaFoodExtraRouter = require('./routes/alameiafood')
app.use('/', alameiaFoodExtraRouter)
const haramainFoodExtraRouter = require('./routes/haramainfood')
app.use('/', haramainFoodExtraRouter)
const ewaaaFoodExtraRouter = require('./routes/ewaaafood')
app.use('/', ewaaaFoodExtraRouter)
const ewaabFoodExtraRouter = require('./routes/ewaabfood')
app.use('/', ewaabFoodExtraRouter)
////////////// Food        
/////////////////////Maintainence   
const maintainenceAlameia = require('./routes/Maintainence/Alameia')
app.use('/', maintainenceAlameia)
/////////////////////Maintainence    
///////////// Transport      
const alameiaTransExtraRouter = require('./routes/alameiatrans')
app.use('/', alameiaTransExtraRouter)
const haramainTransExtraRouter = require('./routes/haramaintrans')
app.use('/', haramainTransExtraRouter)
const ewaaaTransExtraRouter = require('./routes/ewaaatrans')
app.use('/', ewaaaTransExtraRouter)
const ewaabTransExtraRouter = require('./routes/ewaabtrans')
app.use('/', ewaabTransExtraRouter)
///////////// Transport
///////////////////////// Vacancies - Excel
const alameiaVacancies = require('./routes/Vacants/alameia')
app.use('/', alameiaVacancies)
const haramainVacancies = require('./routes/Vacants/haramain')
app.use('/', haramainVacancies)
const ewaaaVacancies = require('./routes/Vacants/ewaaa')
app.use('/', ewaaaVacancies)
const ewaabVacancies = require('./routes/Vacants/ewaab')
app.use('/', ewaabVacancies)
const sawady1Vacancies = require('./routes/Vacants/sawady1')
app.use('/', sawady1Vacancies)
const sawady2Vacancies = require('./routes/Vacants/sawady2')
app.use('/', sawady2Vacancies)
const batawy1Vacancies = require('./routes/Vacants/batawy1')
app.use('/', batawy1Vacancies)
const batawy2Vacancies = require('./routes/Vacants/batawy2')
app.use('/', batawy2Vacancies)
const safaMashaerVacancies = require('./routes/Vacants/safaMashaer')
app.use('/', safaMashaerVacancies)
const matrafyVacancies = require('./routes/Vacants/matrafy')
app.use('/', matrafyVacancies)
const morgan1NaseemVacancies = require('./routes/Vacants/morgan1Naseem')
app.use('/', morgan1NaseemVacancies)
const morgan2BathaaVacancies = require('./routes/Vacants/morgan2Bathaa')
app.use('/', morgan2BathaaVacancies)
const fedaVacancies = require('./routes/Vacants/feda')
app.use('/', fedaVacancies)
const saqafVacancies = require('./routes/Vacants/saqaf')
app.use('/', saqafVacancies)
const waqfVacancies = require('./routes/Vacants/waqf')
app.use('/', waqfVacancies)
const hemyaniVacancies = require('./routes/Vacants/hemyani')
app.use('/', hemyaniVacancies)
const rahmaneyaVacancies = require('./routes/Vacants/rahmaneya')
app.use('/', rahmaneyaVacancies)
const elsalamVacancies = require('./routes/Vacants/elsalam')
app.use('/', elsalamVacancies)
const elfatehVacancies = require('./routes/Vacants/elfateh')
app.use('/', elfatehVacancies)
const paradiseVacancies = require('./routes/Vacants/paradise')
app.use('/', paradiseVacancies)
const nefeayVacancies = require('./routes/Vacants/nefeay')
app.use('/', nefeayVacancies)

///////////////////////// Vacancies - Excel


db.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`server running on port : ${port}`);
	});
});

function initial() {
	Role.create({
		id: 1,
		name: "USER"
	});

	Role.create({
		id: 2,
		name: "ADMIN"
	});

	Role.create({
		id: 3,
		name: "PM"
	});
}