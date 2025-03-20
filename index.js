const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

async function sendSMS(mobile, date_from, date_to, payment_date, amount, vehicle_no) {
  try {
    const api = "http://123.108.46.13/sms-panel/api/http/index.php";
    const data_obj = {
      apikey: "443C3-B8A76",
      username: "Jitender",
      apirequest: "Text",
      format: "JSON",
      sender: "TVAHAN",
      route: "TRANS",
      mobile: mobile,
      TemplateID: "1207166903332799443",
      message: `Your Tax of Rs. ${amount} has been paid for Vehicle No. ${vehicle_no}, valid from ${date_from} to ${date_to} paid on ${payment_date} -TVAHAN`,
    };

    // Send the GET request to the API with query parameters
    const response = await axios.get(api, { params: data_obj })
    console.log(response.data)
    return response.data;
  } catch (error) {
    logToFile(error.message); // Log the error to a file
    console.error(error);
    return { error: "Failed to send SMS" };
  }
}

app.post("/send-sms", async (req, res) => {
  console.log("aayi")
  const { mobile, date_from, date_to, payment_date, amount, vehicle_no } = req.body;
  console.log( mobile, date_from, date_to, payment_date, amount, vehicle_no)
  const result = await sendSMS(mobile, date_from, date_to, payment_date, amount, vehicle_no);
  res.json(result);
});

// Start the Express.js server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
