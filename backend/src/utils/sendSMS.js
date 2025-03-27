const twilio = require("twilio");

// 🔹 Replace these with your Twilio credentials from https://www.twilio.com/console
const accountSid = process.env.TWILIO_ACCOUNT_SID || "your_twilio_account_sid";
const authToken = process.env.TWILIO_AUTH_TOKEN || "your_twilio_auth_token";
const twilioPhone = process.env.TWILIO_PHONE_NUMBER || "your_twilio_phone_number";

const client = twilio(accountSid, authToken);

const sendSMS = async (phone, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: phone,
    });

    console.log("✅ SMS sent successfully:", response.sid);
    return response;
  } catch (error) {
    console.error("❌ Error sending SMS:", error);
    throw error;
  }
};

module.exports = sendSMS;
