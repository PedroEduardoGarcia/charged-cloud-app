import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message});
})

export default app;