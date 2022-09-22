import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing required information",
        });
      } else {
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientname: "Khiem1",
          time: "Chu nhat",
          doctorName: "Khiem0",
          redirectLink: "https://nodemailer.com/about/",
        });

        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              date: data.date,
              timeType: data.timeType,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({ errCode: 0, errMessage: "Save infor patient successfully" });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment,
};