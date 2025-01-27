import express from 'express';
import {Book} from "../models/bookModel.js"

const router = express.Router();

// Route for Save new Book

router.post('/', async (req, res) => {
    try {
        // Validate request body
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ error: 'All 3 fields are required' });
        }

        // Create a new book
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        await Book.create(newBook);

        // Send success response
        return res.status(201).json({ message: 'Book created successfully' });
    } catch (err) {
        console.log(err);

        // Send error response
        return res.status(500).json({ error: 'An internal server error occurred' });
    }
});


// Route for getting all books

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route for getting specific one books

router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book)
    }catch(err){
        console.log(err);
    }
})

// Route for Updating Book

router.put('/:id',async (req,res)=>{
    try{
        if(
            !req.body.title ||
            !req.body.authoe ||
            !req.body.publishYear
        ){
            res.json({message:"all three fields are required"});
        }
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id,req.body);
        if(!updatedBook){
            return res.json({message:"Book not found for updation"});
        }
    }catch(err){
        console.log(err);
    }
})

// Route for Delete Book

router.delete('/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.json({message:"Book not found for deletion"});
        }
    }catch(err){
        console.log(err);
    }
})

export default router;