const express = require("express");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "tasksTestDB";

const STATUS = {
  INCOMPLETE: "incomplete",
  COMPLETE: "complete",
};

/* GET home page. */
router.get("/tasks", function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);
    const tasks = db.collection("tasks").find({});

    tasks.toArray(function (err, result) {
      if (err) throw err;

      res.send(sortAndDivideTasks(result));
      client.close();
    });
  });
});

router.put("/task", function (req, res, next) {
  const task = req.body;
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    db.collection("tasks").insertOne({
      createdAt: timestamp,
      name: task.name,
      status: STATUS.INCOMPLETE,
    });

    res.status(200).send({
      response: "Task added correctly!",
      status: 200,
    });
  });
});

router.post("/complete-task", function (req, res, next) {
  const taskId = req.body.id;
  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    db.collection("tasks").updateOne(
      { _id: ObjectId(taskId) },
      { $set: { status: STATUS.COMPLETE, completedAt: timestamp } }
    );

    res.status(200).send({
      response: "Task completed correctly!",
      status: 200,
    });
  });
});

router.delete("/remove-task/:id", function (req, res, next) {
  const taskId = req.params.id;

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    db.collection("tasks").remove({ _id: ObjectId(taskId) });

    res.status(200).send({
      response: "Task completed correctly!",
      status: 200,
    });
  });
});

router.post("/change-name", function (req, res, next) {
  const taskId = req.body.id;
  const taskName = req.body.name;

  MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    const db = client.db(dbName);

    db.collection("tasks").updateOne(
      { _id: ObjectId(taskId) },
      { $set: { name: taskName } }
    );

    res.status(200).send({
      response: "Task completed correctly!",
      status: 200,
    });
  });
});

const sortAndDivideTasks = (tasks) => {
  const incomplete = tasks
    .filter((task) => task.status === STATUS.INCOMPLETE)
    .sort((a, b) => b.createdAt - a.createdAt);
  const complete = tasks
    .filter((task) => task.status === STATUS.COMPLETE)
    .sort((a, b) => b.completedAt - a.completedAt);

  return {
    incomplete,
    complete,
  };
};

module.exports = router;
