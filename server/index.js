const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

/** Connect to DB */
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development" && true,
  })
);

app.listen(port, console.log(`server running on port ${port}`));
