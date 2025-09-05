import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch";
import pdfParse from "pdf-parse";
import fs from "fs";
import path from "path";
import multer from 'multer';
dotenv.config();
const upload = multer({ dest: 'uploads/' });
const app = express();
const openai = new OpenAI({ apiKey: "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" });

//transcribe
async function extractPdfFromUrl(pdfUrl) {
    const res = await fetch(pdfUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);
    return data.text; // full PDF text
}



//transcription with Whisper
async function transcribeVideoFromUrl(videoUrl) {
    const res = await fetch(videoUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync("temp_video.mp4", buffer);
    // const tempFilePath = path.join(process.cwd(), "temp_video.mp4");
    const tempFilePath = path.join("temp_video.mp4");
    try {
        fs.writeFileSync(tempFilePath, buffer);
    } catch (err) {
        console.error("Failed to save video file:", err);
        throw err;
    }


    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: "whisper-1",
    });

    fs.unlinkSync(tempFilePath); // delete temp file
    return transcription.text;
}
const client = new OpenAI({
    apiKey: process.env.OPENROUTER_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

async function ai(message) {
    const response = await client.chat.completions.create({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: message }],
    });

    return response.choices[0].message.content;

}
app.get("/ask", async (req, res) => {
    const response = await ai("Hello free DeepSeek!");
    res.send(response);

});
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    console.log(req.file); // Uploaded file info
    const pdfText = await extractPdfFromUrl(req.file.path);
    result = pdfText;
    console.log(result);
});
app.post("/scan", async (req, res) => {
    let { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }


    const pdfRegex = /(https?:\/\/[^\s]+\.pdf)/i;
    const videoRegex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|facebook\.com\/.*\/videos\/|instagram\.com\/(p|reel|tv)\/)[^\s]+/i;

    let type = "text";
    if (videoRegex.test(message)) {
        type = "video";
    }
    if (pdfRegex.test(message)) {
        type = "pdf";
    }
    let result = "";

    if (type === "video") {
        const videoUrl = message;
        const transcript = await transcribeVideoFromUrl(videoUrl);
        console.log(transcript);
    } else if (type === "pdf") {
        const pdfUrl = message.match(pdfRegex)[0];
        const pdfText = await extractPdfFromUrl(pdfUrl);
        result = pdfText;
    } else {
        result = message;
    }
    let response = await ai(result);
    res.json({ reply: response });
});

export default app;
