import express from "express";
import dotenv from "dotenv";
import apiRouter from "./api.js"; 
dotenv.config();
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
});
router.get('/home', (req, res) => {
    res.render('home')
});
router.get('/feature', (req, res) => {
    res.render('features')
});
router.get('/mainf', (req, res) => {
    res.render('mainf')
});

// // Gemini API
// router.post("/genai", async (req, res) => {
//     let { message } = req.body;
//     console.log(message)
//     const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

//     async function main(mes = "hi") {
//         const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" }); 
//         const result = await model.generateContent(mes);
//         const response = await result.response;
//         const text = await response.text();
//         res.status(200).json({ reply: text });

//     }

//     main(message).catch((err) => console.log(err));
//     // res.send(0);
// });
router.use('/api', apiRouter)
export default router;