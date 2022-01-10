import express from 'express';

const port = 8000;
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello Express!!!');
});

app.listen(port, () => {
    console.log(`Server started https://localhost:${port}`);
});

