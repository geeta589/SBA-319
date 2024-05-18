import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();


/**
 * GET grades/
 */
router.get("/", (req, res) => {
  res.send("Hello from users router");
});
 
/**
 * post /grades/
 */

/**
 * Sign in a user
 * POST /users/signin
 */
router.post('/add', async(req, res) => {
    // check if user exist
    // check if passwords are a match
    // req.body.password === user.password


    // const user = await collection.findOne(req.body.email)
    // if (!user) {
    //     res.send('User not found')
    // }

    const newUser = new UserModel({
        
        email: req.body.email,
        password:req.body.password,
        username: req.body.username

    });

    newUser.save(function(err,newUser){
        if(err)
            res.send(err);
        else
        res.send("successful").status(200);
    });

    // if (req.body.password !== user.password) {
    //     res.send('Password not match')
    // }

    res.send(newUser);
});

/**
 * GET grades/:id
 */
router.get("/:email", async (req, res) => {
  const collection = await db.collection("users");
  const query = { email: new ObjectId(req.params.email) };
  const result = await collection.findOne(query);

  if (!result) res.send('Not Found').status(404);
  else res.send(result).status(200);
});


/**
* Get a user by email
*/
router.get("/users/:email", async (req, res) => {
let collection = await db.collection("users");
let query = { email: req.params.email };
let result = await collection.find(query).toArray();

if (!result) res.send("Not found").status(404);
else res.send(result).status(200);
});

//===================
router.patch("/users/:email", async (req, res) => {
  let collection = await db.collection("users");
  let query = { email: req.params.email };

  let result = await collection.updateOne(query, {
    $set: { class_id: req.body.class_id },
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.delete("/users/:email", async (req, res) => {
  let collection = await db.collection("users");
  let query = { email: req.params.email };

  let result = await collection.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});
export default router;