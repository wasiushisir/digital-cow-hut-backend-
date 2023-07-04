import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
import routes from "./app/routes/index";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

app.use("/api/v1/", routes);

app.use(globalErrorHandler);

// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('unhandled promise rejection'))
// res.status(200).json('hello')
// });

export default app;
