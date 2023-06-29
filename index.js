const express = require('express');
const axios = require('axios');
const cors=require('cors');
const app = express();
app.use(cors())
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);


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
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Avishek Ai!'
  })
})
app.post('/convert', async (req, res) => {
  try {
    const {code,language} = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${code} Convert this code in ${language} language and also debugg the code find out the error and 
      if any error encounter's show the error and in the next line provide the correct code with explanation for the same
      along with all this check the quality of the code in depth and provide the details for the same after  2 line
      separately `,
      temperature: 0, 
      max_tokens: 3000, 
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    res.status(200).send(
     response.data.choices[0].text.split("\n\n")
    );

  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});