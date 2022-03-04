const express = require("express");
const router = express.Router();
const Rooms = require("../../model/rooms");

router.post("/create", (req, res) => {
  const name = req.body.groupName;

  Rooms.create(
    {
      name,
    },
    (err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(201).send(data);
      }
    }
  );
});
router.get("/all", (req, res) => {
  Rooms.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(data);
    }
  });
});
router.get("/:id", (req, res) => {
  Rooms.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data[0]);
    }
  });
});

router.post("/delete", (req, res) => {
  Rooms.findOneAndDelete({ name: req.body.roomName },  (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
});

module.exports = router;
