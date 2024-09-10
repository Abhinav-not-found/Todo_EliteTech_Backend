const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();




app.get('/', (req, res)=>{
    res.send('Hello todo EliteTech')
})

const taskRoute = require('./routes/taskRoutes.js');
app.use('/api', taskRoute);



mongoose.connect(process.env.DB).then(() => {
    console.log('Connected to MongoDB');
});
app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
});