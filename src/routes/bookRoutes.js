const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const { addBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const { bookSchema } = require('../utils/validation');
const validate = require('../middlewares/validateMiddleware');

const bookRouter = express.Router();

bookRouter.post('/', authMiddleware, roleMiddleware(['Admin']), validate(bookSchema), addBook);
bookRouter.get('/', authMiddleware, roleMiddleware(['Admin', 'Librarian', 'Member']), getBooks);
bookRouter.put('/:id', authMiddleware, roleMiddleware(['Admin']), validate(bookSchema), updateBook);
bookRouter.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteBook);


module.exports = bookRouter;
