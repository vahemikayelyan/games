import cors from "cors";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import config from "./config/config";
import db from "./db/connection";
import UserRoutes from "./routes/user.route";

const PORT = process.env.PORT || config.port;
const app = express();

app.use(cors({ origin: config.origin }));

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/user", UserRoutes);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

db.sync()
  .then(() => {
    console.log("Connected to DB.");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
