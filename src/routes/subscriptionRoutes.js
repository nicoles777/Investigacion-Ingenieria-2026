//creado con IA

const express = require("express");

const {
  subscribeUser,
  unsubscribeUser,
  getUserSubscriptions,
  getAllSubscriptions
} = require("../services/subscriptionService");

const router = express.Router();

router.post("/subscribe", (req, res) => {
  try {
    const { userId, category } = req.body;

    const result = subscribeUser(userId, category);

    res.status(200).json({
      message: "User subscribed successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.post("/unsubscribe", (req, res) => {
  try {
    const { userId, category } = req.body;

    const result = unsubscribeUser(userId, category);

    res.status(200).json({
      message: "User unsubscribed successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  res.status(200).json({
    userId,
    subscriptions: getUserSubscriptions(userId)
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    subscriptions: getAllSubscriptions()
  });
});

module.exports = router;