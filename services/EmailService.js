import { config } from "dotenv";
import nodemailer from "nodemailer";

export const sendEmail = async (to, from, UserNickName, Id) => {
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
      from: from,
      to: to,
      subject: "Welcome to Devjobs Community :D",
      html: `<h3> Welcome ${UserNickName}<h3>
      <p>Para activar tu cuenta sigue el siguiente enlace: <a href="http://localhost:3000/users/activeUser/${Id}" target="_blank"> ACTIVAR CUENTA </a> <p>`,
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
