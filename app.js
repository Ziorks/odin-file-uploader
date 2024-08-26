require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const indexRouter = require("./routes/indexRouter");
const db = require("./db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserFromUsername(username);

      if (!user) {
        done(null, false, { message: "Username doesn't exist" });
      }

      const match = bcrypt.compare(password, user.password);
      if (!match) {
        done(null, false, { message: "Incorrect password." });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.getUserFromId(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 1000 * 60 * 2, // 2 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.get("*", (req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
