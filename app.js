const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = 3000;
const posts = [];
const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

mongoose.connect('mongodb://127.0.0.1:27017/blogContent');

const blogSchema = mongoose.Schema({
    title : String,
    content : String
});

const Blog = mongoose.model("Blog", blogSchema);

app.get('/', (req, res)=>{
    Blog.find({}).then((value)=>{
        res.render('home', {'startingContent': content, 'posts' : value});
    })
})

app.get('/:mainPath' , (req, res)=>{
	var mainPath = req.params.mainPath;
	if(mainPath === 'home'){
        Blog.find({}).then((value)=>{
            res.render('home', {'startingContent': content, 'posts' : value});
        })
	}
    else if(mainPath === 'about'){
        res.render('about', {'startingContent' : content});
    }
    else if(mainPath === 'contact'){
        res.render('contact', {'startingContent' : content});
    }
    else if(mainPath === 'compose'){
        res.render('compose');
    }
    else{
        res.render('error');
    }
})

app.get('/posts/:titleName', (req, res)=>{
    var titleid = req.params.titleName;
    Blog.find({_id : titleid}).then((value)=>{
        res.render('post', {'title' : value[0].title, 'content' : value[0].content});
    })
})

app.post('/compose', (req, res)=>{
    const blog = new Blog({
        title : req.body.title,
        content : req.body.postContent
    });
    blog.save().then(()=> console.log("Save"));
    res.redirect('home');
})

app.listen(port, function(){
    console.log(`server started on port ${port}`);
})