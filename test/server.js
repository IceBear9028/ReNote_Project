const express = require('express');
const app = express();
const port = 1000;

app.get('/', (req, res) => {
    res.send('hello 는 시발')
})

app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
})