import { config } from "dotenv";
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, content) => {
  try {
    //Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      port: 587, //puerto por defecto de Gmail - google
      auth: {
        user: process.env.CORREO || "redsocialx24@gmail.com",
        pass: process.env.PASSWORD || "Contacte al administrador xd",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const message = {
      from: config.CORREO || "redsocialx24@gmail.com",
      to: to,
      subject: subject,
      html: content,
    };

    //Send Email
    const send = await transporter.sendMail(message);
    console.log(send.response);
    return send.response;
  } catch (err) {
    console.log(err);
    throw new Error("Error al enviar el correo");
  }
};
