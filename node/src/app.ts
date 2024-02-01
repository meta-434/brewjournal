import dotenv from 'dotenv';
import createError from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import path from "path";
import cors from "cors";
import { auth } from 'express-oauth2-jwt-bearer';
import recipesRouter from "./Recipes/Recipes";
import privateRouter from "./Private/Private";

dotenv.config();

interface HttpError extends Error {
  status?: number;
}
// throw error is environment variables are not set
if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const port = parseInt(process.env.port || '3000', 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const app = express();

// jwt token validation
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
});

app.use(cors({
  origin: CLIENT_ORIGIN_URL,
  methods: ["GET", "PUT", "POST", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
  maxAge: 86400,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// catch requests to root url
app.get("/", (req: Request, res: Response) => {res.send({message: 'OK'}).status(200);});
app.use("/recipes", recipesRouter);
app.use("/private", checkJwt, privateRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});



export default app;
