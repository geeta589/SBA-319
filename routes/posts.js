import express from "express";
import db from "../db/conn.js";
import dotenv from 'dotenv';
import { ObjectId } from "mongodb";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  let collection = await db.collection("posts");
  const user = {
    
  postid :req.body.postid,
  postcomment : req. body.postcomment
  };
  let result = await collection.insertOne(user);
  res.send(result).status(201);
  console.log("record inserted in database");
});
/**
 * GET users/
 */
router.get("/", (req, res) => {
  res.send("Hello from users router");
});

// === Get data ======

router.get("/:id", async (req, res) => {
  try {
  let collection = await db.collection("posts");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.find(query).toArray();
 
    console.log(result);
    res.send(result).status(200);
  } catch (error) {
    res.send("Not found").status(404);
  }
});

router.delete("/:id", async (req, res) => {
  try {
  let collection = await db.collection("posts");
  let query = { _id: new ObjectId(req.params.id) };
  console.log(query);
  let result = await collection.deleteOne(query);
 
    res.send(result).status(200);
  } catch (error) {
    res.send("Not found").status(404);
  }
});

router.patch("/:id", async (req, res) => {
  let collection = await db.collection("posts");
  let query = { _id: new ObjectId(req.params.id) };

  let result = await collection.updateMany(query, {
    $set: { postcomment: req.body.postcomment },
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
export default router;