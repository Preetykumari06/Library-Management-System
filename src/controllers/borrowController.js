const BorrowedBook = require('../models/BorrowedBook');
const Book = require('../models/Book');

// Borrow a book
exports.borrowBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        let { userId } = req.body;

        // If the requester is a member, userId to the logged-in user
        if (req.user.role === 'Member') {
            userId = req.user.id;
        }

        const book = await Book.findByPk(bookId);
        if (!book || book.available_copies <= 0) {
            return res.status(400).json({ error: 'Book not available' });
        }

        await BorrowedBook.create({ userId, bookId });

        // Reduce available copies
        await book.update({ available_copies: book.available_copies - 1 });

        res.json({ success: true, message: 'Book borrowed successfully', book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        let { userId } = req.body;

        // If the requester is a member, userId to the logged-in user
        if (req.user.role === 'Member') {
            userId = req.user.id;
        }

        const borrowedBook = await BorrowedBook.findOne({ 
            where: { bookId, userId, returned: false } 
        });

        if (!borrowedBook) {
            return res.status(400).json({ error: 'Book was not borrowed by this user' });
        }

        await borrowedBook.update({ returned: true });

        // Increase available copies
        const book = await Book.findByPk(bookId);
        await book.update({ available_copies: book.available_copies + 1 });

        res.json({ success: true, message: 'Book returned successfully', borrowedBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all borrowed books by a user
exports.getBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await BorrowedBook.findAll({ 
            where: { userId: req.user.id, returned: false } 
        });
        res.json({ success: true, borrowedBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
