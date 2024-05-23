import express from "express";
import db from "../db/conn.js";
import dotenv from 'dotenv';
import { ObjectId } from "mongodb";

dotenv.config();
const router = express.Router();

router.post('/', async (req,res)=>{
    let collection = await db.collection("comments");
        const comment = {
        comments : req.body.comments
    }
    let result = await collection.insertOne(comment);
    res.send(result).status(201);
    console.log("record inserted in database");
  });
    /**
 * GET comments/
 */
    router.get("/", (req, res) => {
      res.send("Hello from users router");
    });
    
    // === Get Comment based on id ======
    
    router.get("/:id", async (req, res) => {
      try {
      let collection = await db.collection("comments");
      let query = { _id: new ObjectId(req.params.id) };
      let result = await collection.find(query).toArray();
     
        // const users = await users.find();
        res.send(result).status(200);
      } catch (error) {
        res.send("Not found").status(404);
      }
    });
    
    router.delete("/:id", async (req, res) => {
      try {
      let collection = await db.collection("comments");
      let query = { _id: new ObjectId(req.params.id) };
      console.log(query);
      let result = await collection.deleteOne(query);
     
        res.send(result).status(200);
      } catch (error) {
        res.send("Not found").status(404);
      }
    });
    
    router.patch("/:id", async (req, res) => {
      let collection = await db.collection("comments");
      let query = { _id: new ObjectId(req.params.id) };
    
      let result = await collection.updateMany(query, {
        $set: { comments: req.body.comments },
      });
    
      if (!result) res.send("Not found").status(404);
      else res.send(result).status(200);
    });

export default router;