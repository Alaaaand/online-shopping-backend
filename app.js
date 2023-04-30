import express from "express";

const app = express();
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";

import productRouter from "./routers/products.js";
import categoriesRouter from "./routers/categories.js";
import usersRouter from "./routers/users.js";
import ordersRouter from "./routers/orders.js";

dotenv.config();
 
const api = process.env.API_URL;
app.use(cors())
app.options("*", cors())
//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
//routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("dgatabase connection is ready..");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log(api);
  console.log("server is running now");
});
