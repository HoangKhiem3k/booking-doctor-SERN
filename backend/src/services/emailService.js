require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hoang Khiem 👻" <ledohoangkhiem3k@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh ở website</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu thông tin trên là đúng, hãy click vào link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

        <div>Chân thành cảm ơn</div>
    `,
  });
};
module.exports = { sendSimpleEmail };
