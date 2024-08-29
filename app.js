require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./db/prismaClient.js");
const passport = require("passport");
const configurePassport = require("./utilities/passport.config.js");

const indexRouter = require("./routes/indexRouter");
const fileRouter = require("./routes/fileRouter.js");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 1000 * 60 * 2, // 2 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
configurePassport(passport);
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/file", fileRouter);
app.get("*", (req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
