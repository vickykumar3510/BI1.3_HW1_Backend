const express = require("express")
const cors = require("cors")
const app = express()
const { initalizedData } = require("./db/db.connect")
const Book = require("./models/books.models")
app.use(cors())
app.use(express.json())

initalizedData()

//question 1, 2
async function addBook(newBook){
    try{
        const book = new Book (newBook)
        const saveBook = await book.save()
        return saveBook
    }catch(error){
        throw error
    }
}

app.post("/books", async(req, res) => {
    try{
        const savedBook = await addBook(req.body)
        res.status(201).json({message: "book added successfully", book: savedBook})

    }catch(error){
        res.status(500).json({error: "failed to add book."})
    }
})

//question 3
async function getAllBook(book){
    try{
        const allBooks = await Book.find()
        return allBooks
    }catch(error){
        throw error
    }
}

app.get("/books", async (req, res) => {
    try{
        const books = await getAllBook()
        if(books.length !== 0){
            res.json(books)
        } else{
            res.status(404).json({error: "no book found."})
        }

    }catch(error){
        res.status(500).json({error: "failed to find book."})
    }
})

// question 4
async function getBookByTitle(byTitle){
    try{
        const bookByTitle = await Book.find({title: byTitle})
        return bookByTitle
    }catch(error){
        throw error
    }
}

app.get("/books/title/:title", async(req, res) => {
    try{
        const books = await getBookByTitle(req.params.title)
         if(books.length !== 0){
            res.json(books)
        } else{
            res.status(404).json({error: "no book found."})
        } 
    }catch(error){
     res.status(500).json({error: "failed to find book."})   
    }
})

// question 5
async function getBookByAuthor(byAuthor){
    try{
        const bookByAuthor = await Book.find({author: byAuthor})
        return bookByAuthor
    }catch(error){
        throw error
    }
}

app.get("/books/author/:author", async(req, res) => {
    try{
        const books = await getBookByAuthor(req.params.author)
         if(books.length !== 0){
            res.json(books)
        } else{
            res.status(404).json({error: "no book found."})
        } 
    }catch(error){
        res.status(500).json({error: "failed to find book."}) 
    }
})

// question 6
async function getBusinessBook(genreBusiness){
    try{
        const businessGenre = await Book.find({genre: "Business"})
        return businessGenre
    }catch(error){
        throw error
    }
}

app.get("/books/genre/:genre", async(req, res) => {
    try{
        const books = await getBusinessBook(req.params.genre)
         if(books.length !== 0){
            res.json(books)
        } else{
            res.status(404).json({error: "no book found."})
        } 
    }catch(error){
        res.status(500).json({error: "failed to find book."}) 
    }
})

// question 7
async function release2012(by2012){
    try{
        const book2012 = await Book.find({publishedYear: 2012})
        return book2012
    }catch(error){
        throw error
    }
}

app.get("/books/publishedYear/:publishedYear", async(req, res) => {
    try{
        const books = await release2012(req.params.publishedYear)
         if(books.length !== 0){
            res.json(books)
        } else{
            res.status(404).json({error: "no book found."})
        } 

    }catch(error){
        res.status(500).json({error: "failed to find book."}) 

    }
})

// question 8
async function updateBookRating(bookId, dataToUpdate){
    try{
        const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return updatedBook
    }catch(error){
        console.log("Error while udpating the rating", error)
    }
}

app.post("/books/:bookId", async(req, res) => {
    try{
        const udpatedBook = await updateBookRating(req.params.bookId, req.body)
        if(udpatedBook){
            res.status(200).json({message: "book updated successfully", udpatedBook: udpatedBook})
        } else{
            res.status(404).json({error: "Book does not exist"})
        }
        
    }catch(error){
        res.status(500).json({error: "failed to update book."})
    }
})

//question 9
async function updateByTitle(bookTitle, dataToUpdate){
    try{
        const updatedBook = await Book.findOneAndUpdate({ title: bookTitle }, dataToUpdate, {new: true})
        return updatedBook
    }catch(error){
        console.log("Error while udpating the rating", error)
    }
}

app.post("/books/title/:title", async(req, res) => {
    try{
        const udpatedBook = await updateByTitle(req.params.title, req.body)
        if(udpatedBook){
            res.status(200).json({message: "book updated successfully", udpatedBook: udpatedBook})
        } else{
            res.status(404).json({error: "Book does not exist"})
        }
        
    }catch(error){
        res.status(500).json({error: "failed to update book."})
    }
})

//question 10

async function deleteBookById(bookId){
    try{
        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook
    }catch(error){
        console.log(error)
    }
}

app.delete("/books/id/:id", async(req, res) => {
    try{
        const deletedBook = await deleteBookById(req.params.id)
        if(deletedBook){
            res.status(200).json({message: "book delete successfully."})
        } else{
            res.status(404).json({error: "Book does not exist"})
        }

    }catch(error){
        res.status(500).json({error: "failed to delete the book."})
    }
})


module.exports = app;