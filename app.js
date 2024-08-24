require("dotenv").config();
const path = require("path");
const express = require("express");
const indexRouter = require("./routes/indexRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
