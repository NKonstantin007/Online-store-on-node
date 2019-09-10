const express = require('express');
const exhbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
// import routes
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
//import middlewares
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const MONGODB_URI = 'mongodb+srv://kostya007:8QGK6xeChF6e0SJI@cluster0-f6fx9.mongodb.net/shop'
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

// Create store session
const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

/* Middlewares */
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use(varMiddleware);
app.use(userMiddleware);

// Routing
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        
        app.listen(PORT, () => {
            console.log('Server is running on port ', PORT);
        });
    }
    catch(e) {
        console.log(e);
    }
}

start();