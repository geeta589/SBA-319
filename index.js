import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import commentRouter from './routes/comments.js';
import postRouter from './routes/posts.js';
dotenv.config();
const PORT = process.env.PORT || 4000;
//Express app
const app = express()
// ================ Middlewares =====================

// JSON Parser
app.use(express.json());
// custom logger middleware
app.use((req, res, next) => {
    console.log("Request from url: " + req.url);
    next();
});

app.use('/users', usersRouter);
app.use('/comments', commentRouter);
app.use('/posts',postRouter);


app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Welcome to the API!');
});

 



// Global error handler middleware
app.use((err, _req, res, next) => {
    res.status(500).send('Server Error!');
});



app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}` );
})