import express from 'express';
import userControl from './src/UserControl/userControl.js';

const app = express();
const farside_port = 3050;
const nearside_port = 5173;

app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${nearside_port}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
    console.log("Awaiting Request");
});

app.post('/login', (req,res) => {
    userControl.logIn(req.body)
    .then(response => {
       res.status(200).json(response);
    })
    .catch(error => {
       res.status(500).send(error);
    });
});

app.listen(farside_port, () => {
    console.log(`App Running on port ${farside_port}.`);
});