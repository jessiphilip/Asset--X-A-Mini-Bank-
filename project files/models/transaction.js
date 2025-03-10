import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
  amount: Number,
  type: { type: String, enum: ["deposit", "withdraw", "transfer"], required: true },
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("transactions", transactionSchema);
export default Transaction;