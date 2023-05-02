const express = require("express");
const { PostModel } = require("../models/post.model");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  let userdata = await PostModel.find();
  res.send(userdata);
});

postRouter.post("/add", async (req, res) => {
  const newpost = new PostModel(req.body);
  try {
    await newpost.save();
    res.status(200).send({ msg: "Post has been created sucesfuly" });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { authId } = req.body;
  const post = await PostModel.find({ authId });

  if (!post) {
    return res.status(500).send({ msg: "Post not found for this user" });
  }
  await PostModel.findByIdAndUpdate(id, req.body);
  res.send({ msg: "Post has been updated sucessfully" });
});

postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { authId } = req.body;
  const post = await PostModel.find({ authId });

  if (!post) {
    return res.status(400).send({ msg: "Post not found for this user please check" });
  }
  await PostModel.findByIdAndDelete(id);
  res.status(200).send({ msg: "Post has been deleted sucesfully" });
});

postRouter.get("/filter", async (req, res) => {
  let { device1, device2 } = req.query;

  if (device1 && device2) {
    let userdata = await PostModel.find({
      $or: [{ device: device1 }, { device: device2 }],
    });
    res.status(200).send(userdata);
} else if (device2) {
    let userdata = await PostModel.find({ device: device2 });
    res.status(200).send(userdata);
} else if (device1) {
  let userdata = await PostModel.find({ device: device1 });
  res.status(200).send(userdata);
  } else {
    let userdata = await PostModel.find();
    res.status(200).send(userdata);
  }
});

module.exports = {postRouter};
