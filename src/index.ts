import "module-alias/register";
import "dotenv/config";

// import cookieParser from "cookie-parser";
// const cors = require("cors");
// import swaggerRouter from "./_helpers/swagger";
import createServer from "@config/server";
const app = createServer();

// app.use(cookieParser());

// app.use("/api-docs", swaggerRouter);

import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req: Request, res: Response) => {
  res.json({ message: "File uploaded successfully" });
});
app.get("/api/download/:filename", (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

const port: number = process.env.NODE_ENV === "production" ? (process.env.PORT ? parseInt(process.env.PORT) : 80) : 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
