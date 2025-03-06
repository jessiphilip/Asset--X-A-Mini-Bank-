import Account from "../models/account.js";
import Transaction from "../models/transaction.js";

export const deposit = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    let account = await Account.findOne({ userId });
    
    if (!account) {
      account = new Account({ userId, balance: 0 });
    }

    account.balance += amount;
    await account.save();

    await new Transaction({ senderId: userId, amount, type: "deposit" }).save();
    res.json({ message: "Deposit successful", balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: "Deposit failed" });
  }
};

export const withdraw = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const account = await Account.findOne({ userId });

    if (!account || account.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    account.balance -= amount;
    await account.save();

    await new Transaction({ senderId: userId, amount, type: "withdraw" }).save();
    res.json({ message: "Withdrawal successful", balance: account.balance });
  } catch (error) {
    res.status(500).json({ error: "Withdrawal failed" });
  }
};

export const transfer = async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;
    const senderAccount = await Account.findOne({ userId: senderId });
    const receiverAccount = await Account.findOne({ userId: receiverId });

    if (!senderAccount || senderAccount.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save();
    await receiverAccount.save();

    await new Transaction({ senderId, receiverId, amount, type: "transfer" }).save();
    res.json({ message: "Transfer successful" });
  } catch (error) {
    res.status(500).json({ error: "Transfer failed" });
  }
};

export const getBalance = async (req, res) => {
  const { userId } = req.params;
  const account = await Account.findOne({ userId });
  res.json({ balance: account ? account.balance : 0 });
};