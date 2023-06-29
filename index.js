const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = process.env.PORT || 3800;
const apiKey = process.env.API_KEY;
app.use(express.json())
// app.get('/convert', async (req, res) => {
//   try {
//     const { code, language } = req.query;
//     // Make a request to ChatGPT API for code conversion
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       prompt: `Convert the following ${language} code:\n\n${code}`,
//       max_tokens: 100,
//       temperature: 0.8,
//       n: 1,
//       model: 'text-davinci-003',
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.API_KEY}`
//       }
//     });

//     const convertedCode = response.data.choices[0].text.trim();
//     res.json({ convertedCode });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });
app.post('/convert', async (req, res) => {
  try {
    const {code,language} = req.query;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${code} Convert this code in ${language} language`,
      temperature: 0, 
      max_tokens: 1000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});