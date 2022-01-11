import express from "express";

const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
    res.send('login done');
});

userRouter.post('/register', (req, res) => {
    res.send('register done');
});
export { userRouter };
