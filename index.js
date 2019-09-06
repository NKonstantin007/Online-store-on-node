const express = require('express');
const exhbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');

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
app.use(express.static('public'));

// Routing
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});