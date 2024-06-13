const express = require('express');
const users = require('./routes/users-routes');
const cors = require('./middlewares/cors');

const mongoose = require('mongoose');


const app = express();

app.use(express.json());
app.use(cors);
app.use('/api/users', users);
mongoose.connect('mongodb://localhost:27017/community')
.then(() => {
    app.listen(5000);
})
.catch(err => {
    console.log(err);
});
