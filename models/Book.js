class Book {
    constructor(title, author, id) {
      this.title = title;
      this.author = author;
      this.id = id;
    }

    get MyTitle(){
        return this.title;
    }

    set MyTitle(new_title){
        this.title = new_title;
    } 

    get MyAuthor(){
        return this.author;
    }

    set MyAuthor(new_author){
        this.author = new_author;
    } 

    get MyId(){
        return this.id;
    }
    
    set MyId(new_id){
        this.id = new_id;
    } 
}

module.exports = Book;