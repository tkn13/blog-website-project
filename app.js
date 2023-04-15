const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const port = 3000;
const posts = [];
const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

app.get('/', (req, res)=>{
    res.render('home', {'startingContent': content, 'posts' : posts});
})

app.get('/:mainPath' , (req, res)=>{
	var mainPath = req.params.mainPath;
    console.log(mainPath);
	if(mainPath === 'home'){
        res.render('home', {'startingContent': content, 'posts' : posts});
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
    var titleid = _.lowerCase((req.params.titleName));
    posts.forEach((element)=>{
		console.log(titleid);
		console.log(_.lowerCase(element.title));
        if(_.lowerCase(element.title) === titleid){
			res.render('post', {'title' : element.title, 'titleId' : titleid, 'content' : element.content});
		}
        else{
			res.render('error');
        }
    })
    
})

app.post('/compose', (req, res)=>{
    var post = {
        title : req.body.title,
        content : req.body.postContent,
		titleid : _.lowerCase(req.body.title)
    };
    posts.push(post);
    res.redirect('home');
})

app.listen(port, function(){
    console.log(`server started on port ${port}`);
})