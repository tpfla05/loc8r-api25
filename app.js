require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");

// DB & Passport
require("./app_api/models/db");
require("./app_api/config/passport");

const apiRouter = require("./app_api/routes/index");
const naverRouter = require("./app_api/routes/naver");

const app = express();

/* ------------------------------
   CORS 설정 (⚠ 꼭 이렇게 해야함)
-------------------------------- */
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

// OPTIONS(Preflight) 요청 처리
app.options("*", cors());

/* ------------------------------
   기본 미들웨어
-------------------------------- */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

/* ------------------------------
   정적 파일 (Angular build)
-------------------------------- */
app.use(express.static(path.join(__dirname, "app_public", "build")));

/* ------------------------------
   API 라우터
-------------------------------- */
app.use("/api/naver", naverRouter);
app.use("/api", apiRouter);

/* ------------------------------
   Angular SPA 라우팅 처리
-------------------------------- */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "app_public", "build", "index.html"));
});

/* ------------------------------
   에러 핸들러
-------------------------------- */
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;
