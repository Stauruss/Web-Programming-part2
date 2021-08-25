const { json } = require('express')
const express = require('express')
const path = require('path')
const app = express()
const port = 8080
var dao = require('./models/MyDao.js')
var MyDao = new dao();
app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /static, 
    e.g. http://localhost:8080/static/index.html
*/
app.use('/static', express.static(__dirname + '/public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/favorites', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('favorites.html', options, function(err){
        console.log(err)
    })
})

app.post('/BooksAdd', function(req,res){
    var result = MyDao.addBook(req.body['title'],req.body['author'],req.body['id']);
    if(result)
        res.sendStatus(201)
    else
        res.sendStatus(401)
})

app.delete('/BooksDelete', function(req, res){
    var result = MyDao.deleteBook(req.body['id']);
    if(result)
        res.sendStatus(201)
    else
        res.sendStatus(401)
})

app.get('/Favs', function(req,res){
    var result = JSON.stringify(MyDao.sendFavs());
    res.send(result);
})