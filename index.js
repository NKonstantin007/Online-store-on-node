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

app.get('/', (req, res) => {
   res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});