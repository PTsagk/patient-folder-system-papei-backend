import express, { Request, Response, Application } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import userRoute from "./routes/user.route";
import examRoute from "./routes/exams.route";
import { authenticateDoctor } from "./controllers/authenticate.controller";

const upload = multer();
//For env File
dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true, limit: 4000000 }));
app.use(express.json({ limit: 4000000 }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:4200", "http://83.212.75.182:4242"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// app.use(upload.array())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//     limit: 4000000,
//     parameterLimit: 50000,
//   })
// );
// app.use(cookieParser());
const port = process.env.PORT || 8000;

app.use("/user", userRoute);
app.use("/exam", examRoute);
// app.use("/program", programRoute);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Page Not Found");
});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
