/*------------------------------------------
// USERS ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const userModel = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ users: users });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/users/favorites/:type/:id", async (req, res) => {
  try {
    let dbRes = null;
    const target = `favorites.${req.params.type}`;
    const currentUserID = req.user._id;
    // console.log(currentUserID, req.params.type, req.params.id, target);

    // look if the user already liked this resource
    const alreadyInFav = await userModel.findOne({
      _id: currentUserID,
      [target]: req.params.id
    });

    // if not found
    if (!alreadyInFav) {
      // push id in favorites
      dbRes = await userModel.findByIdAndUpdate(
        currentUserID,
        { $push: { [target]: req.params.id } },
        { new: true }
      );
    } else {
      // pull id from favorites
      dbRes = await userModel.findByIdAndUpdate(
        currentUserID,
        { $pull: { [target]: req.params.id } },
        { new: true }
      );
    }
    // console.log(dbRes);
    res.status(200).json({
      dbRes,
      // line below works as a toggle boolean usefull for the client
      isFavorite: dbRes.favorites[req.params.type].includes(req.params.id)
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
