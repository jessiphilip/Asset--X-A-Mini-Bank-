import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import bankRouter from "./routes/bankRoute.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("DB Connection Error:", err));

app.use("/api/users", userRouter);
app.use("/api/bank", bankRouter);

const PORT = process.env.PORT || 5001;
app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});



