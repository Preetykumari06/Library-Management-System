const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const { borrowBook, returnBook, getBorrowedBooks } = require('../controllers/borrowController');

const router = express.Router();

// Members can borrow and return books
router.post('/borrow/:bookId', authMiddleware, roleMiddleware(['Member']), borrowBook);
router.post('/return/:bookId', authMiddleware, roleMiddleware(['Member']), returnBook);
router.get('/', authMiddleware, getBorrowedBooks);

// Librarians can borrow/return books on behalf of members
router.post('/librarian/borrow/:bookId', authMiddleware, roleMiddleware(['Librarian']), borrowBook);
router.post('/librarian/return/:bookId', authMiddleware, roleMiddleware(['Librarian']), returnBook);

module.exports = router;
