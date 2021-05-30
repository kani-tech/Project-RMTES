const express = require('express');
const morgan = require('morgan');
const path = require('path');
const pool = require("./db.js")
const cors = require('cors');
const schoolRouter = require('./routes/api.js');





const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('tiny'));

app.get('', (req, res) => {
    res.send('hello world')
})

// 
app.use(cors());
app.use('/api', schoolRouter)

app.listen(PORT, function (req, res) {
    console.log('Server running on', PORT)
})