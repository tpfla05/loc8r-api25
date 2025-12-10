require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");

require("./app_api/models/db");
require("./app_api/config/passport");

const apiRouter = require("./app_api/routes/index");
const usersRouter = require("./app_api/routes/users");
const naverRouter = require("./app_api/routes/naver");

const app = express();

/* ---------- CORS ---------- */
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

/* ---------- Express 기본 세팅 ---------- */
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "app_public", "build")));

app.use(passport.initialize());

/* ---------- API 라우터 ---------- */
app.use("/api/naver", naverRouter); // ⭐ 네이버 검색 API
app.use("/api", apiRouter); // ⭐ 기존 REST API

/* ---------- 404 처리 ---------- */
app.use(function (req, res, next) {
  next(createError(404));
});

/* ---------- Unauthorized 처리 ---------- */
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

/* ---------- Angular SPA 처리 ---------- */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app_public", "build", "index.html"));
});

module.exports = app;
