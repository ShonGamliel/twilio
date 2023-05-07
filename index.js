const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your own API key
const OPENAI_API_KEY = "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";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const inputText = req.body.text;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                prompt: `${inputText}`,
                max_tokens: 100,
                n: 1,
                stop: null,
                temperature: 1,
                model: "text-davinci-003",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        const chatGPTResponse = response.data.choices[0].text.trim();
        res.status(200).json({ message: chatGPTResponse });
    } catch (error) {
        // console.error("Error:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/test", (req, res) => {
    console.log(req.body);
    res.send(200);
});
