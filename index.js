const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
// import routes
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
// import models
const User = require('./models/user');

const app = express();

// Register `hbs.engine` with the Express app.
const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Set static folder
app.use('/', express.static(path.join(__dirname, 'public'), {
    ndex: false, 
    immutable: true, 
    cacheControl: true
}));

// Set a folder with templates
app.set('views', 'views');

app.use(async (req, res, next) => {
    try{
        const user = await User.findById('5d75c85c5861852b11a90d1d');
        req.user = user;
        next();
    }
    catch(e) {
        console.log(e);
    }
});

// Routing
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://kostya007:8QGK6xeChF6e0SJI@cluster0-f6fx9.mongodb.net/shop';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false
        });

        const candidate = await User.findOne();
        if(!candidate) {
            const user = new User({
                email: 'kostya.1998.nosarev@mail.ru', 
                name: 'Kostya',
                cart: {
                    items: []
                }
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log('Server is running on port ', PORT);
        });
    }
    catch(e) {
        console.log(e);
    }
}

start();