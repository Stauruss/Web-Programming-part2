var Book = require('./Book.js');
var array = new Array();
class MyDao{
    addBook(title, author, id){
        for(let i=0;i<array.length;i++){
            if(array[i].MyId==id){
                return false;
            }
        }
        var new_book = new Book(title,author,id);
        array.push(new_book);
        return true;
    }
    
    deleteBook(id){
        for(let j=0;j<array.length;j++){
            if(array[j].id==id){
                array.splice(j,1);
                return true;
            }
        }
        return false;
    }

    sendFavs(){
        return array;
    }
}
module.exports = MyDao;
