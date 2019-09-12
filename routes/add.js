const { Router } = require('express');
const {validationResult} = require('express-validator');
const Course = require('../models/course');
const auth = require('../middleware/auth');
const {courseValidators} = require('../utils/validators');

const router = Router();

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

router.post('/', auth, courseValidators, async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const {title, price, image} = req.body;
            return res.status(422).render('add', {
                title: 'Добавить курс',
                isAdd: true,
                error: errors.array()[0].msg,
                data: {
                    title,
                    price, 
                    image
                }
            });
        }

        const { title, price, image } = req.body;
        const course = new Course({
            title,
            price, 
            image,
            userId: req.user
        });

        await course.save();
        res.redirect('/courses');
    }
    catch(e) {
        console.log(e);
    }
});

module.exports = router;