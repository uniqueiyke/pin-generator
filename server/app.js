if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();  
}
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// import and create the mongoDB connection
const mongoURI = process.env.mongoURI;
mongoose.connect(process.env.DB_URL, {  
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
})
.then(()=> console.log('mongo conneted'))
.catch(error => console.log('mongo connection error', error));

// mongoose.connect('mongodb://localhost:27017/scratch_card', {  
//     useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     useCreateIndex: true 
// })

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));

//serve static file if in production 
if(process.env.NODE_ENV === 'production'){
    const dirname = __dirname;
    const rootPath = dirname.replace('server', '')
    //Set static folder
    app.use(express.static(path.resolve(rootPath, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(rootPath, 'client', 'build', 'index.html'))
    });
}


module.exports = app;
