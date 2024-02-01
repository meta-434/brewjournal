require('dotenv').config();
import createError from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import path from "path";
import cors from "cors";
import { auth } from 'express-oauth2-jwt-bearer';
import recipesRouter from "./Recipes/Recipes";
import privateRouter from "./Private/Private";
const port = 3000;

interface HttpError extends Error {
  status?: number;
}

const app = express();

// jwt token validation
const checkJwt = auth({
  audience: process.env.JWT_AUDIENCE,
  issuerBaseURL: process.env.JWT_ISSUER_BASE_URL,
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(cors({
  origin: '*' // Allowing front-end running port 5173
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// catch requests to root url
app.get("/", (res: Response) => {res.send('OK').sendStatus(200);});
app.use("/recipes", recipesRouter);
app.use("/private", checkJwt, privateRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
