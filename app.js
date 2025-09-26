const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();

//connect to db
const dbURI = `mongodb+srv://admin_for_blog_app:${process.env.DB_PASS}@blog-app.jofabso.mongodb.net/Blog-App?retryWrites=true&w=majority&appName=Blog-App`;
mongoose.connect(dbURI)
    .then(() => { 
        app.listen(3000); //listen for requests only after connection is stabilished
        console.log('connected to db') 
    })
    .catch((err) => { console.log(err) });

//register view engine
app.set('view engine', 'ejs');

//serve static files
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

//blog routes
app.get('/blogs', (req, res) => {

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog'});
})

//use is used to create middlewares
//it fires for every single request regardless of url if the code reaches this point
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})