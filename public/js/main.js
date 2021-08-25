var template = {};
template.bookInfo = Handlebars.compile(`
<h2>Title: {{title}}</h2>
<ul>
    <li>Author: {{author}}</li>
    <li>Book ID: {{id}}</li> 
</ul>
<button id="{{saveid}}" onclick="SaveBook('{{title}}','{{author}}',{{id}})">Save</button>
<button id="{{deleteid}}" onclick="DeleteBook({{id}})">Remove</button>
`)//template anazitisis

template.FavBookInfo = Handlebars.compile(`
<h2>Title: {{title}}</h2>
<ul>
    <li>Author: {{author}}</li>
    <li>Book ID: {{id}}</li> 
</ul>
`)//template agapimenon

function MySearch() {
    let user_input = document.getElementById('book_input').value;
    let output = "";
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    let init = {
        method: "GET",
        headers: myHeaders
    }
    let urlulu = 'https://reststop.randomhouse.com/resources/works?search=';
    let new_urlulu = urlulu.concat(user_input);
    fetch(new_urlulu, init)
    .then((res) => res.json())
    .then(data => {
        for(var i=0;i<data.work.length;i++){
            if(data.work[i].titleweb.toUpperCase().includes(user_input.toUpperCase())){
                var save_button_id = "sav_button" + data.work[i].workid;
                var delete_button_id = "rem_button" + data.work[i].workid;
                var title = data.work[i].titleweb.replace(/['']/g,"");
                var author = data.work[i].authorweb.replace(/['']/g,"");
                output += template.bookInfo({title:title, author:author, id:data.work[i].workid, saveid:save_button_id, deleteid:delete_button_id});
            }
        }
        document.getElementById("GenData").innerHTML=output;
    })
    .catch(error => {
        console.log(error)
    })
}

function SaveBook(title,author,id){
    document.getElementById("sav_button"+id).style.visibility="hidden";
    document.getElementById("rem_button"+id).style.visibility="visible";
    let saveHeader = new Headers();
    saveHeader.append('Content-Type', 'application/json');
    let info = {title:title, author:author, id:id}
    let sc = {
        method: "POST",
        headers:  saveHeader,
        body: JSON.stringify(info)
    }
    fetch('BooksAdd',sc)
    .then(response =>{
        if(response.status==201){
            console.log('Book added to Favorites.', response.status)
            alert(title+" has been saved to Favorites.");
        }
        else if(response.status==401){
            console.log('There was an error when adding the book to Favorites.', response.status)
            alert(title+" is already in your Favorites list.");
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function DeleteBook(id){
    document.getElementById("sav_button"+id).style.visibility="visible";
    document.getElementById("rem_button"+id).style.visibility="hidden";
    let deleteHeader = new Headers();
    deleteHeader.append('Content-Type', 'application/json');
    let info = {id:id}
    let dc = {
        method: "DELETE",
        headers: deleteHeader,
        body: JSON.stringify(info)
    }
    fetch('BooksDelete',dc)
    .then(response =>{
        if(response.status==201){
            console.log('Book has been deleted from Favorites.', response.status)
            alert("Τhis book has been removed from Favorites.");
        }
        else{
            console.log('Book could not be deleted from Favorites.',response.status)
            alert("This book could not be deleted from Favorites.");
        }
            
    })
    .catch(error => {
        console.log(error)
    })
}

function DisplayFavs(){
    let favoutput = "";
    let favHeaders = new Headers();
    favHeaders.append('Content-Type', 'application/json');
    let fc = {
        method: "GET",
        headers: favHeaders
    }
    fetch('Favs',fc)
    .then((res) => res.json())
    .then(data =>{
        for(var i=0;i<data.length;i++){
            var delete_button_id = "rem_button" + data[i].workid;
            var title = data[i].title;
            var author = data[i].author;
            favoutput += template.FavBookInfo({title:title, author:author, id:data[i].id, deleteid:delete_button_id});
        }
        document.getElementById("display_favs").innerHTML=favoutput;
    })
    .catch(error => {
        console.log(error)
    })
}