const sendEmail = require("./sendEmail");
 // Email sending service
const sendSMS = require("./notifyRecipient"); // SMS sending service

const notifyRecipient = async (recipient) => {
  const message = `🩸 Good news! A matching organ donor is available in ${recipient.city}. Contact: ${recipient.contact}`;

  try {
    // Send Email Notification
    await sendEmail(recipient.email, "Organ Donor Matched!", message);
    console.log("📧 Email sent successfully!");

    // Send SMS Notification
    await sendSMS(recipient.phone, message);
    console.log("📲 SMS sent successfully!");
  } catch (error) {
    console.error("❌ Error sending notifications:", error);
  }
};

module.exports = notifyRecipient;
