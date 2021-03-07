const { User } = require("../models");

const userControllers = {
  //create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      //shows us the update on the side of insomnia (like console.log)
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  removeFriend({ params }, res) {
      User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  updateUser({ params, body }, res) {
      User.findOneAndUpdate(
          { _id: params.id },
          body,
          { new: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that id.", dbUserData });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  deleteUser({ params }, res) {
      User.findOneAndDelete(
          { _id: params.id },
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with that id.", dbUserData });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = userControllers;
