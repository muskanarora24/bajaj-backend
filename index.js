const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(
  cors({
    origin: "*",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors 'none'; default-src 'self'; script-src 'self'"
  ); // Modify directives as needed
  next();
});
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/bfhl", (req, res) => {
  const data = req.body;
  const userArr = data.data;
  let numArr = [];
  let alphaArr = [];
  let highestLowercaseAlphabet = "";

  userArr.forEach((item) => {
    if (!isNaN(item)) {
      // If item is a number (includes string representation of numbers)
      numArr.push(item);
    } else if (item.length === 1 && item.match(/[a-zA-Z]/)) {
      // If item is a single alphabetic character
      alphaArr.push(item);
    }
  });

  // Find the highest lowercase alphabet
  const lowercaseAlphas = alphaArr.filter((c) => c === c.toLowerCase());
  if (lowercaseAlphas.length > 0) {
    highestLowercaseAlphabet = lowercaseAlphas.reduce((max, char) =>
      char > max ? char : max
    );
  }

  res.status(200).send({
    is_success: true,
    user_id: "Muskan_Arora_24092003",
    email: "muskan.arora2021@vitstudent.ac.in",
    roll_number: "21BIT0145",
    numbers: numArr,
    alphabets: alphaArr,
    highest_lowercase_alphabet: [highestLowercaseAlphabet],
  });
});

app.get("/bfhl", (req, res) => {
  // Code: 200,  “operation_code”:1
  res.status(200).send({ operation_code: 1 });
});

app.listen(3000, () => {
  console.log("listening on port", 3000);
});
