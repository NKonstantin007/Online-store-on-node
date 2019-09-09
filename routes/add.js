const { Router } = require('express');

const Course = require('../models/course');

const router = Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const { title, price, image } = req.body;
    //const course = new Course(title, price, image);
    const course = new Course({
        title,
        price, 
        image
    });

    try {
        await course.save();
        res.redirect('/courses');
    }
    catch(e) {
        console.log(e);
    }
});

module.exports = router;