const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');

const app = express();

// Register `hbs.engine` with the Express app.
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set a folder with templates
app.set('views', 'views');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://kostya007:8QGK6xeChF6e0SJI@cluster0-f6fx9.mongodb.net/shop';
        await mongoose.connect(url, {useNewUrlParser: true});
        app.listen(PORT, () => {
            console.log('Server is running on port ', PORT);
        });
    }
    catch(e) {
        console.log(e);
    }
}

start();