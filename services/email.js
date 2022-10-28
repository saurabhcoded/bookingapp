const sib = require("sib-api-v3-sdk");
const client = sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

// module.exports.sendSibEmail = function sendSibEmail(email, url) {
//   const tranEmailApi = new sib.TransactionalEmailsApi();
//   const sender = {
//     email: process.env.DEFAULT_EMAIL_SENDER || "saurabhcoded@gmail.com",
//     name: process.env.DEFAULT_EMAIL_NAME || "saurabh sharma",
//   };
//   const reciever = {
//     email: email,
//   };
//   tranEmailApi
//     .sendTransacEmail({
//       sender,
//       to: [reciever],
//       subject: "Reset Password",
//       textContent: `Click on the link povided and enter new password ${
//         process.env.FRONTEND_URL + url
//       }`,
//       params: {
//         role: "frontend",
//       },
//     })
//     .then((res) => {
//       console.log("Email sent successfully", res);
//     })
//     .catch((err) => {
//       console.log("Some Error Occured", err);
//     });
// };
module.exports.sendSibEmail = function sendSibEmail(
  receiverEmail,
  subject,
  text
) {
  const tranEmailApi = new sib.TransactionalEmailsApi();
  const sender = {
    email: process.env.DEFAULT_EMAIL_SENDER || "saurabhcoded@gmail.com",
    name: process.env.DEFAULT_EMAIL_NAME || "saurabh sharma",
  };
  const reciever = {
    email: receiverEmail,
  };
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: [reciever],
      subject: subject,
      textContent: text,
      params: {
        role: "frontend",
      },
    })
    .then((res) => {
      console.log({
        message: `Email sent successfully with message ID ${res.messageId}`,
        Email: reciever,
        subject: subject,
        textContent: text,
      });
    })
    .catch((err) => {
      console.log({ message: "Email Sending Error", error: err });
    });
};
