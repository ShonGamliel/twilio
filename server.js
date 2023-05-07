// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

// Set up Twilio account information (replace with your own)
const accountSid = "AC658864b79181cc8dad0a43950e9f23a2";
const authToken = "q0Rg9j9WyYDB40auN9IE7nwWnzj66sm6";
const client = new twilio(accountSid, authToken);

// Initialize the Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Create the webhook endpoint for the Twilio Pre-Event URL
app.post("/twilio_pre_event", (req, res) => {
    // Extract required data from the request body
    const fromPhoneNumber = req.body.From;
    const toPhoneNumber = req.body.To;
    const messageBody = req.body.Body;

    // Process the incoming message (e.g., log it, store it, or respond)
    console.log(`Received message from ${fromPhoneNumber} to ${toPhoneNumber}: ${messageBody}`);

    // Create a TwiML response
    const twiml = new twilio.twiml.MessagingResponse();

    // Add a message to the response
    twiml.message("Thanks for your message! We'll get back to you shortly.");

    // Send the response
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
});

// Start the Express app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
