import nodemailer from "nodemailer";

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5f22a3e7464cbf",
    pass: "d159c328b30d27",
  },
});

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: "hello@musicapp.com",
    to,
    subject,
    html,
  });
};

export default sendMail;
