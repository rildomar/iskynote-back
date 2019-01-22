const schedule = require('node-schedule');
const db = require('../../config/mysql');
const configMailer = require('../../config/nodemailer');

let rule = new schedule.RecurrenceRule();
rule.hour = 00;
rule.minute = 03;

let startTime = new Date(Date.now() + 1000);
let endTime = new Date(startTime.getTime() + 100000);

let actualDate = new Date();
let actualMin = parseInt(actualDate.getMinutes() / 15) * 15;
actualDate.setMinutes(actualMin);
actualDate.setHours(actualDate.getHours() - 4);
process.lastMeasurement = actualDate;

let proceduress = [
  `CALL calcConsumptionOffPeak(?)`,
  `CALL calcConsumptionPeak(?)`,
  `CALL calcDemandOffPeak(?)`,
  `CALL calcDemandPeak(?)`
];

// const jobConsumptionDemandPeakAndOffPeakMeasurments = schedule.scheduleJob({
//     rule: '*/2 * * * *'
//   },
//   async () => {

//     try {

//       let update1 = 'update measurements_group set consumption_peak_auto=0 where measurement_group_id > 0';
//       let update2 = 'update measurements_group set consumption_off_peak_auto=0 where measurement_group_id > 0;'
//       // let update3 = 'update measurements_group set demand_off_peak_auto=0 where measurement_group_id > 0;'
//       // let update4 = 'update measurements_group set demand_peak_auto=0 where measurement_group_id > 0;'

//       await db.execute(update1, []);
//       await db.execute(update2, []);
//       // await db.execute(update3, []);
//       // await db.execute(update4, []);

//       let sql = `select cycle_id, start_date, end_date from apportionment_cycle`;
//       const [rows, fields] = await db.execute(sql);
//       console.log("[SYSTEM " + new Date() + "] Update consumption, demand automatically.");

//       await procedures.calcConsumptionAuto(rows, db);

//     } catch (error) {
//       console.log(error);
//     }
//   });

// const jobAlertMailer = schedule.scheduleJob('*/5 * * * * *', async () => {
//   try {
//     let sql = `SELECT date FROM measurements ORDER BY date DESC LIMIT 1;`
//     const [rows, fields] = await db.execute(sql);

//     let lastMeasurement = new Date(rows[0].date);

//     if (lastMeasurement > process.lastMeasurement) {
//       process.lastMeasurement = lastMeasurement;
//       alertMailerService.checkAlerts();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// const updateMeansurementsWithMaster = schedule.scheduleJob('*/16 * * * *', async () => {
//   let query = `INSERT IGNORE INTO 5iemen5_dev.measurements SELECT * FROM 5iemen5_db.measurements WHERE 5iemen5_db.measurements.date >= subdate(current_date(),3)`;
//   const [rows, fields] = await db.execute(query);
//   console.log('[SYSTEM] Updated dev Measurements table. Line Affedted: %s', rows.affectedRows);
// });
