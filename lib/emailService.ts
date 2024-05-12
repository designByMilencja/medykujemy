import bcrypt from "bcrypt";
import { User } from "@/models/user.model";
import nodemailer, { TransportOptions } from "nodemailer";

interface Props {
  emailAddress: string;
  emailType: "resetPassword" | "emailValidation";
  userId: string;
};

const sendEmail = async ({ emailAddress, emailType, userId }: Props) => {
  try {
    const convertId = userId.toString();
    const hashedToken = await bcrypt.hash(convertId, 10);
    const tokenExpire = new Date();
    tokenExpire.setHours(tokenExpire.getHours() + 5);

    const updateUserInformation =
      emailType === "emailValidation" ?
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: tokenExpire
        }
        :
        {
          resetPasswordToken: hashedToken,
          resetPasswordTokenExpiry: tokenExpire
        };

    await User.updateOne({ _id: userId }, { $set: updateUserInformation });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      },
      tls: {
        // Wyłącz weryfikację certyfikatu tylko dla tego e-maila
        rejectUnauthorized: false
      }
    } as TransportOptions);
    const tokenLink = `${process.env.NEXTAUTH_URL}/api/users/verify?type=${emailType}&token=${hashedToken}`;
    const mailOptions = {
      from: process.env.EMAIL_SERVER_FROM,
      to: emailAddress,
      subject: emailType === "emailValidation" ? "Potwierdzenie rejestracji" : "Reset hasła",
      html: emailType === "emailValidation"
    ? `
      <h3>Witaj</h3>
      <p>Aby potwierdzić rejestrację, kliknij ten link: <a href="${tokenLink}">rejestracja konta</a>.</p>
      <p>Jeśli to nie Ty chcesz się zarejestrować na naszej stronie, zignoruj tę wiadomość..</p>
      <p>Pozdrawiamy, zespół Medykuj</p>

    `
    : `
      <h3>Witaj</h3>
      <p>Aby zresetować hasło, kliknij ten link: <a href="${tokenLink}">zmiana hasła</a>.</p>
      <p>Jeśli to nie Ty chcesz zmienić hasło na naszej stronie, zignoruj tę wiadomość.</p>
      <p>Pozdrawiamy, zespół Medykuj</p>

    `};

    const emailSendInfo = await transporter.sendMail(mailOptions);
    return emailSendInfo;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Wystąpił błąd';
    throw new Error(errorMessage);
  }

};

export default sendEmail;
