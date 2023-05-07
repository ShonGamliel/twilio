const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Replace these with your Twilio Account SID and Auth Token
const TWILIO_ACCOUNT_SID = "AC658864b79181cc8dad0a43950e9f23a2";
const TWILIO_AUTH_TOKEN = "bbe9554ffaa95204467f3f849e9cd990";

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.post("/whatsapp-webhook", async (req, res) => {
    const messageBody = req.body.Body;
    const fromNumber = "req.body.From";
    const toNumber = "req.body.To";

    console.log(`Received message from ${fromNumber}: ${messageBody}`);

    const customResponse = "This is your custom response message.";

    try {
        await twilioClient.messages.create({
            body: customResponse,
            from: `whatsapp:${toNumber}`,
            to: `whatsapp:${fromNumber}`,
        });
        console.log("Reply sent successfully.");
    } catch (error) {
        console.error("Failed to send reply:", error);
    }

    res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
