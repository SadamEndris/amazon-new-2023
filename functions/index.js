require("dotenv").config();

const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_KEY);

// config app
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
// app.get("/evangadi", (request, response) =>
//   response.status(200).send("Hello Evangadi Amazon class")
// );

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total), // subunits of the currency
      currency: "usd",
    });

    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("something went wrong!");
  }
  // console.log('Payment Request Recieved for this amount >>> ', total
});
// Listen command
// exports.api = functions.https.onRequest(app);
app.listen(10000, (error) => {
  if (!error) console.log("server is listening on port 10000");
});
// http://127.0.0.1:5001/new-a8a56/us-central1/api
