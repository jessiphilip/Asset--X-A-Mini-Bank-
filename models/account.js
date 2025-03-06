import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  balance: { type: Number, default: 0 }
});

const Account = mongoose.model("accounts", accountSchema);
export default Account;