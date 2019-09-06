const express = require('express');
const exhbs = require('express-handlebars');

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
app.get('/', (req, res) => {
   res.render('index', {
       title: 'Главная страница',
       isHome: true
   });
});

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Курсы',
        isCourses: true
    });
});

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});