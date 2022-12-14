import express, { NextFunction, Request, Response } from "express";

import createError from "http-errors";

import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import avaliableStockRouter from "./src/routes/avaliableStock";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/read-file", avaliableStockRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});
app.get("/", async (req, res) => {
  res.send("Hello");
});
// error handler
app.use(function (err: Error, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(500);
  res.render("error");
});

export default app;
