import "dotenv/config";
const API_KEY = process.env.MAIL_API_KEY || "";
const DOMAIN = process.env.MAIL_DOMAIN || "";

import mailgun from "mailgun-js";
const mailgunInstance: mailgun.Mailgun = mailgun({ apiKey: API_KEY, domain: DOMAIN });

export async function sendEmail(sender: string, receiver: string, subject: string, message: string) {
  try {
    const data: mailgun.messages.SendData = {
      from: sender,
      to: receiver,
      subject: subject,
      text: message,
      //   html: `<strong>${body}</strong>`,
    };
    await mailgunInstance.messages().send(data, (error: mailgun.Error, body: mailgun.messages.SendResponse) => {
      if (error) console.log(error);
      else console.log(body);
    });
  } catch (error) {
    console.error("Error sending email");
    console.error(error);
    if (error instanceof Error) {
      console.error(error);
    }
  }
}
